import { GetStaticPaths, GetStaticProps } from 'next'
import { Webinars } from '~/interfaces/post'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getCategories,
  getHomeSettings,
  getTags,
  getWebinars,
  getWebinarsCount,
} from '~/lib/sanity.queries'
import { SharedPageProps } from '../../_app'
import Layout from '~/components/Layout'
import LatestBlogs from '~/components/sections/LatestBlogSection'
import AllcontentSection from '~/components/sections/AllcontentSection'
import { useRouter } from 'next/router'
import siteConfig from '../../../../config/siteConfig'
import React, { useRef } from 'react'
import Pagination from '~/components/commonSections/Pagination'
import { customMetaTag, CustomHead } from '~/utils/customHead'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import TagSelect from '~/contentUtils/TagSelector'
import { mergeAndRemoveDuplicates } from '~/utils/common'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'



export const getStaticPaths: GetStaticPaths = async () => {

  const locales = siteConfig.locales

  const paths = locales.map((locale) => {
    if (locale === 'en') {
      return { params: { slug: '', locale } } 
    } else {
      return { params: { slug: locale, locale } }
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & { }
> = async (context) => {
  const draftMode = context.preview || false
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const region:any = context.params.locale || 'en'; 
  const itemsPerPage = siteConfig.pagination.childItemsPerPage

  const [webinars, latestWebinars, totalWebinars, tags, homeSettings,categories] = await Promise.all([
    getWebinars(client, 0, itemsPerPage,region),
    getWebinars(client, 0, 5,region),
    getWebinarsCount(client,region),
    getTags(client),
    getHomeSettings(client,region),
    getCategories(client)
  ])

  const totalPages = Math.ceil(totalWebinars / itemsPerPage)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      webinars,
      latestWebinars,
      totalPages,
      tags,
      homeSettings,
      categories
    },
  }
}


const WebinarsPage = ({
  webinars,
  latestWebinars,
  homeSettings,
  totalPages,
  tags,
  categories
}: {
  webinars: Webinars[]
  latestWebinars: Webinars[]
  totalPages: number
  tags: any
  homeSettings: any
  categories: any
}) => {
  const router = useRouter()
  const baseUrl = `/${siteConfig.pageURLs.webinar}`
  if (!webinars) return null

  const featuredWebinar = homeSettings?.featuredWebinar || []

  const latestWebinar = mergeAndRemoveDuplicates(
    featuredWebinar,
    latestWebinars,
  )
  const handlePageChange = (page: number) => {
    // if (page === 1) {
    //   router.push(baseUrl)
    // } else {
    //   router.push(`${baseUrl}/page/${page}`)
    // }
  }

  return (
    <GlobalDataProvider data={categories} featuredTags={homeSettings?.featuredTags}>
      <BaseUrlProvider baseUrl={baseUrl}>
        <Layout>
          <CustomHead props={webinars} type="webinar" />
          <TagSelect tags={tags} tagLimit={7} />
          {customMetaTag('webinar', true)}
          <LatestBlogs
            contentType="webinar"
            className={'pt-11 pr-9 pb-16 pl-9'}
            reverse={true}
            contents={latestWebinar}
          />
          <AllcontentSection
            className={'pb-9'}
            allContent={webinars}
            hideHeader={true}
            cardType="left-image-card"
            itemsPerPage={siteConfig.pagination.childItemsPerPage}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={1}
            onPageChange={handlePageChange}
            enablePageSlug={true}
            type="custom"
          />
          <BannerSubscribeSection />
        </Layout>
      </BaseUrlProvider>
    </GlobalDataProvider>
  )
}

export default WebinarsPage
