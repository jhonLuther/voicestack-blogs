import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  getPosts,
  getPostsByLimit,
  getRelatedContents,
  getTags,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import blogStyles from '../../styles/components/blogStyles.module.scss'
import SEOHead from '~/layout/SeoHead'
import { Post } from '~/interfaces/post'
import { generateJSONLD } from '~/utils/generateJSONLD'
import AuthorInfo from '~/components/commonSections/AuthorInfo'
import Wrapper from '~/layout/Wrapper'
import { SanityImage } from '~/components/SanityImage'
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection'
import MainImageSection from '~/components/MainImageSection'
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor'
import AllcontentSection from '~/components/sections/AllcontentSection'
import Pagination from '~/components/commonSections/Pagination'
import siteConfig from 'config/siteConfig'
import TagSelect from '~/contentUtils/TagSelector'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
    context?: {
      cardsPerPage: number
    }
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const pageNumber = parseInt(params?.pageNumber as string);
  const tags = await getTags(client);

  
  // Ensure pageNumber is a valid number
  if (isNaN(pageNumber) || pageNumber < 1) {
    return {
      notFound: true,
    };
  }

  const cardsPerPage = siteConfig.pagination.itemsPerPage || 5;
  const startLimit = (pageNumber - 1) * cardsPerPage;
  const endLimit = startLimit + cardsPerPage;

  console.log(`Fetching posts from ${startLimit} to ${endLimit}`);

  const posts = await getPostsByLimit(client, startLimit, endLimit);
  const totalPosts = await getPosts(client);

  const totalPages = Math.ceil(totalPosts.length / cardsPerPage);

  // Ensure posts is an array before accessing length
  if (!Array.isArray(posts) || posts.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      draftMode,
      totalPages,
      token: draftMode ? readToken : '',
      posts,
      tags,
    },
  };
};


export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps> & { posts: any, totalPages: any, tags: any },
) {

  const { posts, totalPages ,tags} = props;

  const handlePageChange = (page: number) => {
    console.log(`Navigating to page: ${page}`);
  };

  return (
    <>
      <Layout>
        <Wrapper>
          <TagSelect tags={tags} tagLimit={5} showTags={true} />
          <AllcontentSection allContent={posts} />
          <Pagination
            totalPages={totalPages}
            baseUrl="/all"
            onPageChange={handlePageChange}
            currentPage={0}
            content={posts}
          />
        </Wrapper>
      </Layout>
    </>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)
  const numberOfPosts = slugs.length
  const cardsPerPage = siteConfig.pagination.itemsPerPage || 5;
  const numberOfPages = Math.ceil(numberOfPosts / cardsPerPage)

  const paths = []

  for (let i = 1; i <= numberOfPages; i++) {
    paths.push({ params: { pageNumber: i.toString() } })
  }

  return {
    paths: paths.map(({ params }) => `/all/${params.pageNumber}`),
    fallback: 'blocking',
  }
}
