import { GetStaticProps, InferGetStaticPropsType } from 'next'
import {
  getTags,
  getPostsByLimit,
  getPosts,
  postSlugsQuery,
  getArticlesCount,
  getEbooksCount,
  getPodcastsCount,
  getWebinarsCount,
  getHomeSettings,
  getCategories,
} from '~/lib/sanity.queries'
import { getClient } from '~/lib/sanity.client'
import siteConfig from 'config/siteConfig'
import Layout from '~/components/Layout'
import AllcontentSection from '~/components/sections/AllcontentSection'
import TagSelect from '~/contentUtils/TagSelector'
import Pagination from '~/components/commonSections/Pagination'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { useRouter } from 'next/router'
import ContentHub from '~/contentUtils/ContentHub'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = getClient()
  const region =  params.locale as string;   
  const pageNumber = params?.number ? parseInt(params.number as string, 10) : 1

  const cardsPerPage = siteConfig.pagination.childItemsPerPage || 5
  const startLimit = (pageNumber - 1) * cardsPerPage
  const endLimit = startLimit + cardsPerPage

  const posts = await getPostsByLimit(client, startLimit, endLimit,undefined,region)
  const totalPosts = await getPosts(client,undefined,region)

  const totalPages = Math.ceil(totalPosts.length / cardsPerPage)

  const tags = await getTags(client)

  const totalPodcasts = await getPodcastsCount(client,region)
  const totalWebinars = await getWebinarsCount(client,region)
  const totalArticles = await getArticlesCount(client,region)
  const totalEbooks = await getEbooksCount(client,region)
  const homeSettings = await getHomeSettings(client,region)
  const categories = await getCategories(client)


  return {
    props: {
      posts,
      tags,
      totalPages,
      totalPosts,
      currentPage: pageNumber,
      categories,
      homeSettings,
      contentCount: {
        podcasts: totalPodcasts,
        webinars: totalWebinars,
        articles: totalArticles,
        ebooks: totalEbooks,
      },
    },
  }
}

export const getStaticPaths = async () => {
  const client = getClient()
  const locales = siteConfig.locales; 
  const paths = await Promise.all(
    locales.map(async (locale) => {
      const slugs = await client.fetch(postSlugsQuery, { locale });
      const numberOfPosts = slugs.length
      const cardsPerPage = siteConfig.pagination.childItemsPerPage || 5
      const numberOfPages = Math.ceil(numberOfPosts / cardsPerPage)
      const pagePaths = []
      for (let i = 2; i <= numberOfPages; i++) {
        pagePaths.push({ params: { number: i.toString(), locale } })
      }

      return pagePaths
    })
  );
  

  return {
    paths: paths.flat(),
    fallback: 'blocking',
  }
}

export default function TagPagePaginated({
  tags,
  posts,
  totalPages,
  currentPage,
  contentCount,
  totalPosts,
  homeSettings,
  categories
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const totalCount: any = totalPosts?.length ?? 0

  const baseUrl = `/${siteConfig.paginationBaseUrls.base}`;
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
          <ContentHub contentCount={contentCount} />
          <TagSelect
            tags={tags}
            tagLimit={5}
            className="mt-12"
            showTags={true}
          />
          <AllcontentSection allItemCount={totalCount} allContent={posts} />
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            enablePageSlug={true}
            content={posts}
            type="customs"
          />
          <BannerSubscribeSection />
        </Layout>
      </BaseUrlProvider>
    </GlobalDataProvider>
  )
}
