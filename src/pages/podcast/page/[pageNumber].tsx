import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/components/Layout'
import Wrapper from '~/layout/Wrapper'
import AllcontentSection from '~/components/sections/AllcontentSection'
import { getClient } from '~/lib/sanity.client'
import {
  getArticles,
  getArticlesCount,
  getCaseStudies,
  getCaseStudiesCount,
  getEbooks,
  getEbooksCount,
  getHomeSettings,
  getPodcasts,
  getPodcastsCount,
  getTags,
} from '~/lib/sanity.queries'
import { readToken } from '~/lib/sanity.api'
import { SharedPageProps } from '../../_app'
import { Articles, CaseStudies, Ebooks, Podcasts } from '~/interfaces/post'
import siteConfig from '../../../../config/siteConfig'
import React, { useRef } from 'react'
import Pagination from '~/components/commonSections/Pagination'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import { CustomHead } from '~/utils/customHead'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const allPodcasts: any = await getPodcasts(client)
  const totalPages = Math.ceil(
    allPodcasts.length / siteConfig.pagination.childItemsPerPage,
  )

  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { pageNumber: (i + 2).toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    podcasts: Podcasts[]
    pageNumber: number
    totalPages: number
  }
> = async (context) => {
  const draftMode = context.preview || false
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const pageNumber = Number(context.params?.pageNumber) || 1
  const itemsPerPage = siteConfig.pagination.childItemsPerPage
  const skip = (pageNumber - 1) * itemsPerPage

  const podcasts: any = await getPodcasts(client, skip, itemsPerPage)
  const totalPodcasts = await getPodcastsCount(client)
  const totalPages = Math.ceil(totalPodcasts / itemsPerPage)
  const tags = await getTags(client)
  const homeSettings = await getHomeSettings(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      podcasts,
      pageNumber,
      totalPages,
      tags,
      homeSettings,
    },
  }
}

const PaginatedEbookPage = ({
  podcasts,
  tags,
  pageNumber,
  homeSettings,
  totalPages,
}: {
  podcasts: Podcasts[]
  tags: any
  homeSettings: any
  pageNumber: number
  totalPages: number
}) => {
  const router = useRouter()
  const baseUrl = useRef(`/${siteConfig.pageURLs.podcast}`).current

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl)
    } else {
      router.push(`${baseUrl}/page/${page}`)
    }
  }

  return (
    <GlobalDataProvider data={tags} featuredTags={homeSettings?.featuredTags}>
      <BaseUrlProvider baseUrl={baseUrl}>
        <Layout>
          {podcasts?.map((e, i) => {
            return <CustomHead props={e} key={i} type="podcast" />
          })}
          <AllcontentSection
            className={'pb-9'}
            allContent={podcasts}
            cardType="left-image-card"
            hideHeader={true}
            itemsPerPage={siteConfig.pagination.childItemsPerPage}
            contentType="podcast"
            showCount={true}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={pageNumber}
            onPageChange={handlePageChange}
            enablePageSlug={true}
            content={podcasts}
            type="custom"
          />
        </Layout>
      </BaseUrlProvider>
    </GlobalDataProvider>
  )
}

export default PaginatedEbookPage
