import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getTag, getPostsByTag, tagsSlugsQuery, getTags, getPostsByTagAndLimit, getPostsByLimit, getPosts, postSlugsQuery, getArticlesCount, getEbooksCount, getPodcastsCount, getWebinarsCount } from '~/lib/sanity.queries'
import { getClient } from '~/lib/sanity.client'
import siteConfig from 'config/siteConfig'
import { Post, Tag } from '~/interfaces/post'
import Layout from '~/components/Layout'
import AllcontentSection from '~/components/sections/AllcontentSection'
import TagSelect from '~/contentUtils/TagSelector'
import Wrapper from '~/layout/Wrapper'
import Pagination from '~/components/commonSections/Pagination'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import ContentHub from '~/contentUtils/ContentHub'
import { BaseUrlProvider } from '~/components/Context/UrlContext'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = getClient();
    const pageNumber = params?.number ? parseInt(params.number as string, 10) : 1;
  
  const cardsPerPage = siteConfig.pagination.itemsPerPage || 5;
  const startLimit = (pageNumber - 1) * cardsPerPage;
  const endLimit = startLimit + cardsPerPage;

  const posts = await getPostsByLimit(client, startLimit, endLimit);
  
  const totalPosts = await getPosts(client);
  
  const totalPages = Math.ceil(totalPosts.length / cardsPerPage);

  const tags = await getTags(client)

  const totalPodcasts = await getPodcastsCount(client);
	const totalWebinars = await getWebinarsCount(client);
	const totalArticles = await getArticlesCount(client);
	const totalEbooks = await getEbooksCount(client);




  return {
    props: {
      posts,
      tags,
      totalPages,
      currentPage: pageNumber,
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
  const slugs = await client.fetch(postSlugsQuery)
  const numberOfPosts = slugs.length
  const cardsPerPage = siteConfig.pagination.itemsPerPage || 5;
  const numberOfPages = Math.ceil(numberOfPosts / cardsPerPage)

  const paths = []

  for (let i = 2; i <= numberOfPages; i++) {
    paths.push({ params: { number: i.toString() } })
  }

  return {
    paths,
    fallback: 'blocking',
  }
}

export default function TagPagePaginated({
  tags,
  posts,
  totalPages,
  currentPage,
  contentCount,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const totalCount:any = Object.values(contentCount).reduce((acc:any, count) => acc + count, 0);


  const baseUrl = useRef(`/${siteConfig.paginationBaseUrls.base}`).current;
  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl);
    } else {
      router.push(`${baseUrl}/page/${page}`);
    }
  };

  return (
    <BaseUrlProvider baseUrl={baseUrl}>
    <Layout>
      	<ContentHub contentCount={contentCount}/>
        <TagSelect 
          tags={tags} 
          tagLimit={5} 
          showTags={true}
          className='mt-12' 
        />
        <AllcontentSection allItemCount={totalCount} allContent={posts}  />
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