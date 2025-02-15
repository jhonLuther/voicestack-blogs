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
  getCategories,
} from '~/lib/sanity.queries'
import Layout from '~/components/Layout'
import { Tag, Post } from '~/interfaces/post'
import TagSelect from '~/contentUtils/TagSelector'
import AllcontentSection from '~/components/sections/AllcontentSection'
import Pagination from '~/components/commonSections/Pagination'
import siteConfig from 'config/siteConfig'
import ContentHub from '~/contentUtils/ContentHub'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { defaultMetaTag } from '~/utils/customHead'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'
import { slugToCapitalized } from '~/utils/common'
import { SharedPageProps } from '~/pages/_app'

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
    totalPostCount: number
    siteSettings: any[]
    homeSettings: any
    categories: any
  }
> = async ({ params }) => {
  const client = getClient()
  const slug = params?.slug as string
  const region = params?.locale as string
  const cardsPerPage = siteConfig.pagination.childItemsPerPage || 5

  try {
    const tag = await getTag(client, slug)

    if (!tag) {
      return { notFound: true }
    }

    const [
      allTags,
      posts,
      allPostsForTag,
      totalPodcasts,
      totalWebinars,
      totalArticles,
      totalEbooks,
      siteSettings,
      homeSettings,
      categories
    ] = await Promise.all([
      getTags(client),
      getPostsByTagAndLimit(client, tag._id, 0, cardsPerPage, region),
      getPostsByTag(client, tag._id, region),
      getPodcastsCount(client, region),
      getWebinarsCount(client, region),
      getArticlesCount(client, region),
      getEbooksCount(client, region),
      getSiteSettings(client),
      getHomeSettings(client, region),
      getCategories(client)
    ])

    const totalPages = Math.ceil(allPostsForTag.length / cardsPerPage)

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
        categories
      },
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return { notFound: true }
  }
}

export const getStaticPaths = async () => {
  const client = getClient()
  const locales = siteConfig.locales

  try {
    const slugsPromises = locales.map(locale => 
      client.fetch(tagsSlugsQuery, { locale })
        .then(data => data.map((slug: string) => ({
          params: { slug, locale }
        })))
    )

    const localePaths = await Promise.all(slugsPromises)
    const paths = localePaths.flat()

    return {
      paths,
      fallback: 'blocking',
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error)
    return {
      paths: [],
      fallback: 'blocking',
    }
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
  categories
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
    <GlobalDataProvider data={categories} featuredTags={homeSettings?.featuredTags}>
      <BaseUrlProvider baseUrl={baseUrl}>
        <Layout>
          {siteSettingWithImage ? defaultMetaTag(siteSettingWithImage,pageUrl) : <></>}
          <ContentHub contentCount={contentCount} />
          <TagSelect
            tags={allTags}
            tagLimit={5}
            className="mt-12"
            showTags={true}
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
