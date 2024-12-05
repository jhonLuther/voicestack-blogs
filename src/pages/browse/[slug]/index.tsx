import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getClient } from '~/lib/sanity.client'
import {
  getTag,
  getPostsByTag,
  tagsSlugsQuery,
  getTags,
  getPostsByTagAndLimit,
  getArticlesCount,
  getEbooksCount,
  getPodcastsCount,
  getWebinarsCount,
  getSiteSettings,
  getHomeSettings,
} from '~/lib/sanity.queries'
import Layout from '~/components/Layout'
import Wrapper from '~/layout/Wrapper'
import { Tag, Post } from '~/interfaces/post'
import { SharedPageProps } from '../../_app'
import TagSelect from '~/contentUtils/TagSelector'
import AllcontentSection from '~/components/sections/AllcontentSection'
import Pagination from '~/components/commonSections/Pagination'
import siteConfig from 'config/siteConfig'
import ContentHub from '~/contentUtils/ContentHub'
import { useRef } from 'react'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { defaultMetaTag } from '~/utils/customHead'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'
import { slugToCapitalized } from '~/utils/common'

interface Query {
  slug: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    tag: Tag
    posts: Post[]
    allTags: Tag[]
    totalPages: number
    contentCount: any
    totalPostCount: any[]
    siteSettings: any[]
    homeSettings: any
  }
> = async ({ params }) => {
  const client = getClient()
  const slug = params?.slug as string

  const tag = await getTag(client, slug)
  const allTags = await getTags(client)

  if (!tag) {
    return {
      notFound: true,
    }
  }

  const cardsPerPage = siteConfig.pagination.childItemsPerPage || 5
  const posts = await getPostsByTagAndLimit(client, tag._id, 0, cardsPerPage)
  const allPostsForTag = await getPostsByTag(client, tag._id)
  const totalPages = Math.ceil(allPostsForTag.length / cardsPerPage)
  const totalPodcasts = await getPodcastsCount(client)
  const totalWebinars = await getWebinarsCount(client)
  const totalArticles = await getArticlesCount(client)
  const totalEbooks = await getEbooksCount(client)
  const siteSettings = await getSiteSettings(client)
  const homeSettings = await getHomeSettings(client)

  return {
    props: {
      tag,
      allTags,
      totalPages,
      posts,
      draftMode: false,
      token: null,
      totalPostCount: allPostsForTag.length,
      contentCount: {
        podcasts: totalPodcasts,
        webinars: totalWebinars,
        articles: totalArticles,
        ebooks: totalEbooks,
      },
      siteSettings,
      homeSettings,
    },
  }
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(tagsSlugsQuery)

  return {
    paths: slugs?.map(({ slug }: { slug: string }) => `/browse/${slug}`) || [],
    fallback: 'blocking',
  }
}

export default function TagPage({
  tag,
  posts,
  allTags,
  totalPages,
  contentCount,
  totalPostCount,
  siteSettings,
  homeSettings,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const handlePageChange = (page: number) => {
    console.log(`Navigating to page: ${page}`)
  }
  const baseUrl =
    `/${siteConfig.paginationBaseUrls.base}/${tag?.slug?.current}`;
  let siteSettingWithImage = siteSettings?.find((e: any) => e?.openGraphImage)
  siteSettingWithImage.siteTitle = slugToCapitalized(tag?.slug?.current)

  const pageUrl = process.env.NEXT_PUBLIC_BASE_URL+baseUrl

  return (
    <GlobalDataProvider data={allTags} featuredTags={homeSettings.featuredTags}>
      <BaseUrlProvider baseUrl={baseUrl}>
        <Layout>
          {siteSettingWithImage ? defaultMetaTag(siteSettingWithImage,pageUrl) : <></>}
          <ContentHub contentCount={contentCount} />
          <TagSelect
            tags={allTags}
            tagLimit={5}
            showTags={true}
            className="mt-12"
          />
          <AllcontentSection allItemCount={totalPostCount} allContent={posts} />
          <Pagination
            totalPages={totalPages}
            // baseUrl={`/${siteConfig.paginationBaseUrls.base}/${tag?.slug?.current}`}
            onPageChange={handlePageChange}
            currentPage={1}
            enablePageSlug={true}
            content={posts}
          />
          <BannerSubscribeSection />
        </Layout>
      </BaseUrlProvider>
    </GlobalDataProvider>
  )
}
