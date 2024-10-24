import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getClient } from '~/lib/sanity.client'
import { getTag, getPostsByTag, tagsSlugsQuery, getTags, getPostsByTagAndLimit } from '~/lib/sanity.queries'
import Layout from '~/components/Layout'
import Wrapper from '~/layout/Wrapper'
import { Tag, Post } from '~/interfaces/post'
import { SharedPageProps } from '../../_app'
import TagSelect from '~/contentUtils/TagSelector'
import AllcontentSection from '~/components/sections/AllcontentSection'
import Pagination from '~/components/commonSections/Pagination'
import siteConfig from 'config/siteConfig'

interface Query {
  slug: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    tag: Tag;
    posts: Post[];
    allTags: Tag[];
    totalPages: number;
  }
> = async ({ params }) => {
  const client = getClient();
  const slug = params?.slug as string;

  const tag = await getTag(client, slug);
  const allTags = await getTags(client);

  if (!tag) {
    return {
      notFound: true,
    };
  }

  const cardsPerPage = siteConfig.pagination.itemsPerPage || 5;
  const posts = await getPostsByTagAndLimit(client, tag._id, 0, cardsPerPage);
  const allPostsForTag = await getPostsByTag(client, tag._id);
  const totalPages = Math.ceil(allPostsForTag.length / cardsPerPage);

  return {
    props: {
      tag,
      allTags,
      totalPages,
      posts,
      draftMode: false,
      token: null,      
    },
  };
};



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
          baseUrl={`/browse/${tag?.slug?.current}`}
          onPageChange={handlePageChange}
          currentPage={1}
          enablePageSlug={true}
          content={posts}
        />
    </Layout>
  )
}