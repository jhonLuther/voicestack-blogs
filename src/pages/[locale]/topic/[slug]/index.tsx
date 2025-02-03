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
  getCategory,
  getPostsByCategoryAndLimit,
  getCategories,
  catsSlugsQuery,
} from '~/lib/sanity.queries'
import Layout from '~/components/Layout'
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

interface Query {
  slug: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = getClient();
  const slug = params?.slug as string;
  const region = params?.locale as string
  const categoryPromise = getCategory(client, slug);
  const siteSettingsPromise = getSiteSettings(client,region);
  const homeSettingsPromise = getHomeSettings(client,region);

  const [category, siteSettings, homeSettings] = await Promise.all([
    categoryPromise,
    siteSettingsPromise,
    homeSettingsPromise,
  ]);
  
  const cardsPerPage = siteConfig.pagination.childItemsPerPage || 5;

  const [
    categoryPosts,
    allPostsForTag,
    totalPodcasts,
    totalWebinars,
    totalArticles,
    totalEbooks,
    allTags,
    categories,
  ] = await Promise.all([
    getPostsByCategoryAndLimit(client, category?._id, 0, cardsPerPage,region),
    getPostsByTag(client, category._id,region),
    getPodcastsCount(client,region),
    getWebinarsCount(client,region),
    getArticlesCount(client,region),
    getEbooksCount(client,region),
    getTags(client),
    getCategories(client),
  ]);

  const totalPages = Math.ceil(allPostsForTag.length / cardsPerPage);

  if (!category || !categoryPosts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category,
      categories,
      allTags,
      totalPages,
      categoryPosts,
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
  };
};

export const getStaticPaths = async () => {

  const client = getClient()
  const locales = siteConfig.locales

    const slugs = await Promise.all(
      locales.map(async (locale) => {
        const data = await client.fetch(catsSlugsQuery, { locale });
        return data as string[]; 
      })
    );
  

  return {
    paths:slugs.flat().map((item:any) => ({
      params: { slug:item.slug, locale:item.locale },
    })),
    fallback: 'blocking',
  }
}

export default function TagPage({
  category,
  categories,
  categoryPosts,
  allTags,
  totalPages,
  contentCount,
  totalPostCount,
  siteSettings,
  homeSettings,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if(!categoryPosts || !category) return null
  
  const handlePageChange = (page: number) => {
    console.log(`Navigating to page: ${page}`)
  }
  const baseUrl =
    `/${siteConfig.categoryBaseUrls.base}/${category?.slug?.current}`;
  let siteSettingWithImage = siteSettings && siteSettings?.find((e: any) => e?.openGraphImage);

  if (siteSettingWithImage) {
    siteSettingWithImage.siteTitle = slugToCapitalized(category?.slug?.current);
  }


  return (
    <GlobalDataProvider data={categories} featuredTags={homeSettings?.featuredTags}>
      <BaseUrlProvider baseUrl={baseUrl}>
        <Layout>
          {siteSettingWithImage ? defaultMetaTag(siteSettingWithImage) : <></>}
          <ContentHub categories={categories} contentCount={contentCount}   />
          <TagSelect
            tags={allTags}
            tagLimit={5}
            className="mt-12"
          />
          <AllcontentSection  sectionType='category' allItemCount={totalPostCount} allContent={categoryPosts} />
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={1}
            enablePageSlug={true}
            content={categoryPosts}
          />
          <BannerSubscribeSection />
        </Layout>
      </BaseUrlProvider>
    </GlobalDataProvider>
  )
}
