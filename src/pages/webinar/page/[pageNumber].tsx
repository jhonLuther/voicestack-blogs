import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/components/Layout'
import AllcontentSection from '~/components/sections/AllcontentSection'
import { getClient } from '~/lib/sanity.client'
import { readToken } from '~/lib/sanity.api'
import { SharedPageProps } from '../../_app'
import { Webinars } from '~/interfaces/post'
import siteConfig from '../../../../config/siteConfig'
import React, { useRef } from 'react'
import Pagination from '~/components/commonSections/Pagination'
import {
  getHomeSettings,
  getTags,
  getWebinars,
  getWebinarsCount,
} from '~/lib/sanity.queries'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import { CustomHead, customMetaTag } from '~/utils/customHead'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const allWebinars: any = await getWebinars(client)
  const totalPages = Math.ceil(
    allWebinars.length / siteConfig.pagination.childItemsPerPage,
  )

  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { pageNumber: (i + 2).toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    webinars: Webinars[]
    pageNumber: number
    totalPages: number
  }
> = async (context) => {
  const draftMode = context.preview || false
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const pageNumber = Number(context.params?.pageNumber) || 1
  const itemsPerPage = siteConfig.pagination.childItemsPerPage
  const skip = (pageNumber - 1) * itemsPerPage

  const webinars: any = await getWebinars(client, skip, itemsPerPage)
  const totalWebinars = await getWebinarsCount(client)
  const totalPages = Math.ceil(totalWebinars / itemsPerPage)
  const tags = await getTags(client)
  const homeSettings = await getHomeSettings(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      webinars,
      pageNumber,
      totalPages,
      tags,
      homeSettings,
    },
  }
}

const PaginatedWebinarsPage = ({
  webinars,
  tags,
  homeSettings,
  pageNumber,
  totalPages,
}: {
  webinars: Webinars[]
  tags: any
  homeSettings: any
  pageNumber: number
  totalPages: number
}) => {
  const router = useRouter()
  const baseUrl = `/${siteConfig.pageURLs.webinar}`

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl)
    } else {
      router.push(`${baseUrl}/page/${page}`)
    }
  }

  return (
    <GlobalDataProvider data={tags} featuredTags={homeSettings.featuredTags}>
      <BaseUrlProvider baseUrl={baseUrl}>
        <Layout>
          {webinars?.map((e, i) => {
            return <CustomHead props={e} key={i} type="webinar" />
          })}
          {customMetaTag('webinar')}
          <AllcontentSection
            className={'pb-9'}
            allContent={webinars}
            cardType="left-image-card"
            hideHeader={true}
            itemsPerPage={siteConfig.pagination.childItemsPerPage}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={pageNumber}
            onPageChange={handlePageChange}
            enablePageSlug={true}
            content={webinars}
            type="custom"
          />
          <BannerSubscribeSection />
        </Layout>
      </BaseUrlProvider>
    </GlobalDataProvider>
  )
}

export default PaginatedWebinarsPage
