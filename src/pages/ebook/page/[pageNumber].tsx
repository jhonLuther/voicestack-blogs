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
  getTags,
} from '~/lib/sanity.queries'
import { readToken } from '~/lib/sanity.api'
import { SharedPageProps } from '../../_app'
import { Articles, CaseStudies, Ebooks } from '~/interfaces/post'
import siteConfig from '../../../../config/siteConfig'
import React, { useRef } from 'react'
import Pagination from '~/components/commonSections/Pagination'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import { CustomHead } from '~/utils/customHead'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const allEbooks: any = await getEbooks(client)
  const totalPages = Math.ceil(
    allEbooks.length / siteConfig.pagination.childItemsPerPage,
  )

  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { pageNumber: (i + 2).toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & { ebooks: Ebooks[]; pageNumber: number; totalPages: number }
> = async (context) => {
  const draftMode = context.preview || false
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const pageNumber = Number(context.params?.pageNumber) || 1
  const itemsPerPage = siteConfig.pagination.childItemsPerPage
  const skip = (pageNumber - 1) * itemsPerPage

  const ebooks: any = await getEbooks(client, skip, itemsPerPage)
  const totalEbooks = await getEbooksCount(client)
  const totalPages = Math.ceil(totalEbooks / itemsPerPage)
  const tags = await getTags(client)
  const homeSettings = await getHomeSettings(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      ebooks,
      pageNumber,
      totalPages,
      homeSettings,
      tags,
    },
  }
}

const PaginatedEbookPage = ({
  ebooks,
  tags,
  homeSettings,
  pageNumber,
  totalPages,
}: {
  ebooks: Ebooks[]
  tags: any
  pageNumber: number
  homeSettings: any
  totalPages: number
}) => {
  const router = useRouter()
  const baseUrl = `/${siteConfig.pageURLs.ebook}`

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
          {ebooks?.map((e, i) => {
            return <CustomHead props={e} type="eBook" key={i} />
          })}
          <AllcontentSection
            className={'pb-9'}
            allContent={ebooks}
            cardType="left-image-card"
            hideHeader={true}
            itemsPerPage={siteConfig.pagination.childItemsPerPage}
            contentType="ebook"
            showCount={true}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={pageNumber}
            onPageChange={handlePageChange}
            enablePageSlug={true}
            content={ebooks}
            type="custom"
          />
          <BannerSubscribeSection />
        </Layout>
      </BaseUrlProvider>
    </GlobalDataProvider>
  )
}

export default PaginatedEbookPage
