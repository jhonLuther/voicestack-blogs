import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/components/Layout'
import AllcontentSection from '~/components/sections/AllcontentSection'
import { getClient } from '~/lib/sanity.client'
import {
  getArticles,
  getArticlesCount,
  getHomeSettings,
  getSiteSettings,
  getTags,
} from '~/lib/sanity.queries'
import { readToken } from '~/lib/sanity.api'
import { SharedPageProps } from '../../_app'
import { Articles } from '~/interfaces/post'
import siteConfig from '../../../../config/siteConfig'
import React, { useContext, useRef } from 'react'
import Pagination from '~/components/commonSections/Pagination'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import { CustomHead, customMetaTag, defaultMetaTag } from '~/utils/customHead'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const allArticles: any = await getArticles(client)
  const totalPages = Math.ceil(
    allArticles.length / siteConfig.pagination.childItemsPerPage,
  )

  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { pageNumber: (i + 2).toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<SharedPageProps & {}> = async (
  context,
) => {
  const draftMode = context.preview || false
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const pageNumber = Number(context.params?.pageNumber) || 1
  const itemsPerPage = siteConfig.pagination.childItemsPerPage
  const skip = (pageNumber - 1) * itemsPerPage

  try {
    const [articles, totalArticles, tags, homeSettings,siteSettings] = await Promise.all([
      getArticles(client, skip, itemsPerPage),
      getArticlesCount(client),
      getTags(client),
      getHomeSettings(client),
      getSiteSettings(client),
    ])

    const totalPages = Math.ceil(totalArticles / itemsPerPage)

    return {
      props: {
        draftMode,
        token: draftMode ? readToken : '',
        articles,
        pageNumber,
        totalPages,
        tags,
        homeSettings,
        siteSettings
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        draftMode,
        token: draftMode ? readToken : '',
        articles: [],
        pageNumber: 1,
        totalPages: 1,
        tags: [],
        homeSettings: [],
        siteSettings:[]
      },
    }
  }
}

const PaginatedArticlesPage = ({
  articles,
  tags,
  homeSettings,
  pageNumber,
  totalPages,
  siteSettings
}: {
  articles: Articles[]
  tags: any
  homeSettings: any
  pageNumber: number
  totalPages: number
  siteSettings: any
}) => {
  const router = useRouter()
  const baseUrl = `/${siteConfig.pageURLs.article}`
  const siteSettingWithImage = siteSettings?.find((e: any) => e?.openGraphImage)
  console.log(siteSettingWithImage)

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
          {customMetaTag('article')}
          {articles?.map((e, i) => {
            return <CustomHead props={e} key={i} type="articleExpanded" />
          })}
          {/* {siteSettingWithImage ? defaultMetaTag(siteSettingWithImage):<></>} */}
          <AllcontentSection
            className={'pb-9'}
            allContent={articles}
            cardType="left-image-card"
            itemsPerPage={siteConfig.pagination.childItemsPerPage}
            contentType="article"
            showCount={true}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={pageNumber}
            onPageChange={handlePageChange}
            enablePageSlug={true}
            content={articles}
            type="custom"
          />
          <BannerSubscribeSection />
        </Layout>
      </BaseUrlProvider>
    </GlobalDataProvider>
  )
}

export default PaginatedArticlesPage
