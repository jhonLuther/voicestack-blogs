import { GetStaticPaths, GetStaticProps } from 'next'
import { Podcasts, PressRelease } from '~/interfaces/post'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getCategories,
  getHomeSettings,
  getPressReleases,
  getPressReleasesCount,
  getTags,
} from '~/lib/sanity.queries'
import { SharedPageProps } from '../../_app'
import Layout from '~/components/Layout'
import LatestBlogs from '~/components/sections/LatestBlogSection'
import AllcontentSection from '~/components/sections/AllcontentSection'
import { useRouter } from 'next/router'
import siteConfig from '../../../../config/siteConfig'
import React, { useRef } from 'react'
import Pagination from '~/components/commonSections/Pagination'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import { customMetaTag, CustomHead } from '~/utils/customHead'
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
  SharedPageProps & { pressReleases: PressRelease[]; totalPages: number }
> = async (context) => {
  const draftMode = context.preview || false
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const itemsPerPage = siteConfig.pagination.childItemsPerPage
  const region:any = context.params.locale || 'en'; 
  const pressReleases: any = await getPressReleases(client, 0, itemsPerPage,region)
  const latestPressReleases: any = await getPressReleases(client, 0, 5,region)
  const totalPressReleases = await getPressReleasesCount(client,region)
  const totalPages = Math.ceil(totalPressReleases / itemsPerPage)
  const tags = await getTags(client)
  const homeSettings = await getHomeSettings(client,region)
  const categories = await getCategories(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      pressReleases,
      latestPressReleases,
      totalPages,
      tags,
      homeSettings,
      categories
    },
  }
}

const PressReleasePage = ({
  pressReleases,
  latestPressReleases,
  totalPages,
  tags,
  homeSettings,
  categories
}: {
  pressReleases: Podcasts[]
  latestPressReleases: Podcasts[]
  totalPages: number
  tags: any
  homeSettings: any
  categories: any
}) => {
  const baseUrl = `/${siteConfig.pageURLs.pressRelease}`;
  if (!pressReleases) return null

  const featuredPressRelease = homeSettings?.featuredPressRelease || []

  const latestPressRelease = mergeAndRemoveDuplicates(
    featuredPressRelease,
    latestPressReleases,
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
        {pressReleases?.map((e, i) => {
          return <CustomHead props={e} type="pressRelease" key={i} />
        })}
        <Layout>
          <TagSelect tags={tags} tagLimit={7}  />
          {customMetaTag('pressRelease', true)}
          <LatestBlogs
            className={'pt-11 pr-9 pb-16 pl-9'}
            reverse={true}
            contents={latestPressRelease}
          />
          <AllcontentSection
            className={'pb-9'}
            allContent={pressReleases}
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

export default PressReleasePage
