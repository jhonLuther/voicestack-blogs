import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '~/components/Layout'
import { getClient } from '~/lib/sanity.client'
import {
  getArticlesCount,
  getEbooksCount,
  getHomeSettings,
  getPodcastsCount,
  getPosts,
  getPostsByLimit,
  getSiteSettings,
  getTags,
  getWebinarsCount,
} from '~/lib/sanity.queries'
import AllcontentSection from '~/components/sections/AllcontentSection'
import Pagination from '~/components/commonSections/Pagination'
import siteConfig from 'config/siteConfig'
import TagSelect from '~/contentUtils/TagSelector'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { useRef } from 'react'
import router, { useRouter } from 'next/router'
import ContentHub from '~/contentUtils/ContentHub'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import { defaultMetaTag } from '~/utils/customHead'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = getClient()
  const pageNumber = params?.pageNumber
    ? parseInt(params.pageNumber as string, 10)
    : 1

  const cardsPerPage = siteConfig.pagination.childItemsPerPage || 5
  const startLimit = (pageNumber - 1) * cardsPerPage

  const tags = await getTags(client)

  const endLimit = startLimit + cardsPerPage

  const posts = await getPostsByLimit(client, startLimit, cardsPerPage)
  const totalPosts = await getPosts(client)
  const siteSettings = await getSiteSettings(client)

  const totalPages = Math.ceil(totalPosts.length / cardsPerPage)

  const totalPodcasts = await getPodcastsCount(client)
  const totalWebinars = await getWebinarsCount(client)
  const totalArticles = await getArticlesCount(client)
  const totalEbooks = await getEbooksCount(client)
  const homeSettings = await getHomeSettings(client);

  return {
    props: {
      posts,
      tags,
      totalPages,
      totalPosts,
      currentPage: pageNumber,
      contentCount: {
        podcasts: totalPodcasts,
        webinars: totalWebinars,
        articles: totalArticles,
        ebooks: totalEbooks,
      },
      siteSettings: siteSettings,
      homeSettings: homeSettings
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps> & {
    posts: any
    totalPages: any
    tags: any
  },
) {
  const router = useRouter()

  const { posts, totalPages, tags, contentCount, totalPosts, siteSettings,homeSettings } = props
  const totalCount: any = totalPosts.length ?? 0;

  const baseUrl = useRef(`/${siteConfig.paginationBaseUrls.base}`).current

  const handlePageChange = (page: number) => {
    //   if (page === 1) {
    // 	router.push(baseUrl);
    //   } else {
    // 	router.push(`${baseUrl}/page/${page}`);
    //   }
  }
  const siteSettingWithImage = siteSettings?.find((e: any) => e?.openGraphImage)

  return (
    <>
      <GlobalDataProvider data={tags} featuredTags={homeSettings?.featuredTags}>
      <BaseUrlProvider baseUrl={baseUrl}>
        <Layout>
          {siteSettingWithImage ? defaultMetaTag(siteSettingWithImage) : <></>}
          <ContentHub contentCount={contentCount} />
          <TagSelect tags={tags} tagLimit={5} showTags={true} />
          <AllcontentSection allItemCount={totalCount} allContent={posts} />
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={0}
            enablePageSlug={true}
          />
          <BannerSubscribeSection />
        </Layout>
      </BaseUrlProvider>
      </GlobalDataProvider>
    </>
  )
}
