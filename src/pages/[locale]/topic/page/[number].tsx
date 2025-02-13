import { GetStaticProps, InferGetStaticPropsType } from 'next';
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
} from '~/lib/sanity.queries';
import { getClient } from '~/lib/sanity.client';
import siteConfig from 'config/siteConfig';
import Layout from '~/components/Layout';
import AllcontentSection from '~/components/sections/AllcontentSection';
import TagSelect from '~/contentUtils/TagSelector';
import Pagination from '~/components/commonSections/Pagination';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';
import { useRouter } from 'next/router';
import ContentHub from '~/contentUtils/ContentHub';
import { BaseUrlProvider } from '~/components/Context/UrlContext';
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = getClient();
  const pageNumber = params?.number ? parseInt(params.number as string, 10) : 1;
  const region = params?.locale as string  


  const cardsPerPage = siteConfig.pagination.childItemsPerPage || 5;
  const startLimit = (pageNumber - 1) * cardsPerPage;

  // Concurrently fetch data
  const [
    posts,
    totalPosts,
    tags,
    totalPodcasts,
    totalWebinars,
    totalArticles,
    totalEbooks,
    homeSettings,
    categories,
  ] = await Promise.all([
    getPostsByLimit(client, startLimit, cardsPerPage,region),
    getPosts(client,undefined,region),
    getTags(client),
    getPodcastsCount(client,region),
    getWebinarsCount(client,region),
    getArticlesCount(client,region),
    getEbooksCount(client,region),
    getHomeSettings(client,region),
    getCategories(client),
  ]);

  const totalPages = Math.ceil(totalPosts.length / cardsPerPage);

  return {
    props: {
      posts,
      tags,
      totalPages,
      currentPage: pageNumber,
      totalPostCount: totalPosts.length,
      homeSettings,
      categories,
      contentCount: {
        podcasts: totalPodcasts,
        webinars: totalWebinars,
        articles: totalArticles,
        ebooks: totalEbooks,
      },
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

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
  totalPostCount,
  homeSettings,
  categories,
  contentCount,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const baseUrl = `/${siteConfig.paginationBaseUrls.base}`;
  const handlePageChange = (page: number) => {
    // if (page === 1) {
    //   router.push(baseUrl);
    // } else {
    //   router.push(`${baseUrl}/page/${page}`);
    // }
  };

  return (
    <GlobalDataProvider data={categories} featuredTags={homeSettings?.featuredTags}>
      <BaseUrlProvider baseUrl={baseUrl}>
        <Layout>
          <ContentHub contentCount={contentCount} />
          <TagSelect tags={tags} tagLimit={5} className="mt-12" />
          <AllcontentSection allItemCount={totalPostCount} allContent={posts} />
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
  );
}
