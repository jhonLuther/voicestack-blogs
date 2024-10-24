import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getTag, getPostsByTag, tagsSlugsQuery, getTags, getPostsByTagAndLimit } from '~/lib/sanity.queries'
import { getClient } from '~/lib/sanity.client'
import { SharedPageProps } from '../../../_app'
import siteConfig from 'config/siteConfig'
import { Post, Tag } from '~/interfaces/post'
import Layout from '~/components/Layout'
import AllcontentSection from '~/components/sections/AllcontentSection'
import TagSelect from '~/contentUtils/TagSelector'
import Wrapper from '~/layout/Wrapper'
import Pagination from '~/components/commonSections/Pagination'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    tag: Tag;
    posts: Post[];
    allTags: Tag[];
    totalPages: number;
    currentPage: number;
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

  const cardsPerPage = siteConfig.pagination.itemsPerPage || 5;
  const startLimit = (pageNumber - 1) * cardsPerPage;
  const endLimit = startLimit + cardsPerPage;

  const posts = await getPostsByTagAndLimit(client, tag._id, startLimit, endLimit);
  const allPostsForTag = await getPostsByTag(client, tag._id);
  const totalPages = Math.ceil(allPostsForTag.length / cardsPerPage);

  return {
    props: {
      tag,
      allTags,
      totalPages,
      posts,
      currentPage: pageNumber,
      draftMode: false, 
      token: null,      
    },
  };
};

export const getStaticPaths = async () => {

  const client = getClient()
  const tags = await getTags(client)
  const cardsPerPage = siteConfig.pagination.itemsPerPage || 5

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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const handlePageChange = (page: number) => {
    console.log(`Navigating to page: ${page}`)
  }

  return (
    <Layout>
        <h1 className='md:text-5xl text-xl font-extrabold font-manrope text-center'>{tag?.tagName}</h1>
        <TagSelect 
          tags={allTags} 
          tagLimit={5} 
          showTags={true}
          className='mt-12' 
        />
        <AllcontentSection allContent={posts} hideSearch={true} />
        <Pagination
          totalPages={totalPages}
          baseUrl={`/browse/${tag.slug.current}`}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          enablePageSlug={true}
          content={posts}
        />
    </Layout>
  )
}