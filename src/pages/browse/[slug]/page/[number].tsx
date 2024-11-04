import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getTag, getPostsByTag, tagsSlugsQuery, getTags, getPostsByTagAndLimit, getWebinarsCount, getArticlesCount, getEbooksCount, getPodcastsCount } from '~/lib/sanity.queries'
import { getClient } from '~/lib/sanity.client'
import { SharedPageProps } from '../../../_app'
import siteConfig from 'config/siteConfig'
import { Post, Tag } from '~/interfaces/post'
import Layout from '~/components/Layout'
import AllcontentSection from '~/components/sections/AllcontentSection'
import TagSelect from '~/contentUtils/TagSelector'
import Wrapper from '~/layout/Wrapper'
import Pagination from '~/components/commonSections/Pagination'
import ContentHub from '~/contentUtils/ContentHub'
import { useRef } from 'react'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    tag: Tag;
    posts: Post[];
    allTags: Tag[];
    totalPages: number;
    currentPage: number;
    contentCount:any
    totalPostCount: any[];
  }
> = async ({ params }) => {
  const client = getClient();

  const slug = params?.slug as string;
  const pageNumber = parseInt(params?.number as string, 10) || 1; 

  const tag = await getTag(client, slug);
  const allTags = await getTags(client);

  if (!tag) {
    return {
      notFound: true,
    };
  }

  const cardsPerPage = siteConfig.pagination.childItemsPerPage || 5;
  const startLimit = (pageNumber - 1) * cardsPerPage;
  const endLimit = startLimit + cardsPerPage;

  const posts = await getPostsByTagAndLimit(client, tag._id, startLimit, endLimit);
  const allPostsForTag = await getPostsByTag(client, tag._id);
  const totalPages = Math.ceil(allPostsForTag.length / cardsPerPage);

  const totalPodcasts = await getPodcastsCount(client);
	const totalWebinars = await getWebinarsCount(client);
	const totalArticles = await getArticlesCount(client);
	const totalEbooks = await getEbooksCount(client);

  return {
    props: {
      tag,
      allTags,
      totalPages,
      totalPostCount: allPostsForTag.length,
      posts,
      currentPage: pageNumber,
      draftMode: false, 
      token: null,  
      contentCount:{
				podcasts: totalPodcasts,
				webinars: totalWebinars,
				articles: totalArticles,
				ebooks: totalEbooks
			}    
    },
  };
};

export const getStaticPaths = async () => {

  const client = getClient()
  const tags = await getTags(client)
  const cardsPerPage = siteConfig.pagination.childItemsPerPage || 5

  const paths = []

  for (const tag of tags) {
    const posts = await getPostsByTag(client, tag._id)
    const totalPages = Math.ceil(posts.length / cardsPerPage)

    for (let i = 2; i <= totalPages; i++) {
      paths.push({ params: { slug: tag.slug.current, number: i.toString() } })
    }
  }

  return {
    paths,
    fallback: false
  }
}
export default function TagPagePaginated({
  tag,
  posts,
  allTags,
  totalPages,
  currentPage,
  contentCount,
  totalPostCount
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const handlePageChange = (page: number) => {
    console.log(`Navigating to page: ${page}`)
  }
  
  const baseUrl = useRef(`/${siteConfig.paginationBaseUrls.base}/${tag?.slug?.current}`).current


  return (
    <BaseUrlProvider baseUrl={baseUrl}>
    <Layout>
        <ContentHub contentCount={contentCount}/>
        <TagSelect 
          tags={allTags} 
          tagLimit={5} 
          showTags={true}
          className='mt-12' 
        />
        <AllcontentSection  allItemCount={totalPostCount}  allContent={posts}  />
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          enablePageSlug={true}
          content={posts}
        />
        <BannerSubscribeSection />
    </Layout>
    </BaseUrlProvider>
  )
}