import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getTag, getPostsByTag, tagsSlugsQuery, getTags, getPostsByTagAndLimit, getPostsByLimit, getPosts, postSlugsQuery } from '~/lib/sanity.queries'
import { getClient } from '~/lib/sanity.client'
import siteConfig from 'config/siteConfig'
import { Post, Tag } from '~/interfaces/post'
import Layout from '~/components/Layout'
import AllcontentSection from '~/components/sections/AllcontentSection'
import TagSelect from '~/contentUtils/TagSelector'
import Wrapper from '~/layout/Wrapper'
import Pagination from '~/components/commonSections/Pagination'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'

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




  return {
    props: {
      posts,
      tags,
      totalPages,
      currentPage: pageNumber,
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
  allTags,
  totalPages,
  currentPage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const handlePageChange = (page: number) => {
    console.log(`Navigating to page: ${page}`)
  }

  return (
    <Layout>
        {/* <h1 className='md:text-5xl text-xl font-extrabold font-manrope text-center'>{tag?.tagName}</h1> */}
        <TagSelect 
          tags={tags} 
          tagLimit={5} 
          showTags={true}
          className='mt-12' 
        />
        <AllcontentSection allContent={posts} hideSearch={true} />
        <Pagination
          totalPages={totalPages}
          baseUrl={`/browse`}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          enablePageSlug={true}
          content={posts}
        />
        <BannerSubscribeSection />
    </Layout>
  )
}