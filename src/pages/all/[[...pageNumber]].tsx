import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getPostsByLimit,
  getTags,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { Post } from '~/interfaces/post'
import Wrapper from '~/layout/Wrapper'
import AllcontentSection from '~/components/sections/AllcontentSection'
import Pagination from '~/components/commonSections/Pagination'
import { useRouter } from 'next/router'
import TagSelect from '~/contentUtils/TagSelector'
import { useState } from 'react'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
    context?: {
      cardsPerPage: number
      totalPosts: number
    }
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const pageNumber = parseInt(params?.pageNumber as string) || 1
  const cardsPerPage =  6// decide the contents per page 

  let startLimit = Math.floor((pageNumber - 1) * cardsPerPage)
  let endLimit = startLimit + cardsPerPage

  const posts = await getPostsByLimit(client, startLimit, endLimit)
  const tags = await getTags(client);

  const totalPosts = await client.fetch(postSlugsQuery)

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
      tags,
      context: {
        cardsPerPage,
        totalPosts: totalPosts.length,
      },
    },
  }
}



export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps> & {
    posts: any
    relatedContents: Post[]
    currentPage:any
    tags?: any
  }
) {
  const router = useRouter();

  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    // router.replace(`/all/${pageNumber}/${tag.slug.current}`);
  };
  const { pageNumber }:any = router.query;
  const currentPage:number = Number(pageNumber) || 1; 
  
  const { cardsPerPage, totalPosts } = props.context;
  const numberOfPages = Math.ceil(totalPosts / cardsPerPage);

  // console.log(props.posts,'props.posts');

  return (
    <>
      <Layout>
        <Wrapper>
        <TagSelect
					tags={props?.tags}
					tagLimit={5}
					showTags={true}
          showHeading={true}
          onTagChange={handleTagChange}
				/>
          <AllcontentSection  hideSearch={true} allContent={props.posts} />
          <Pagination
            currentPage={currentPage}
            totalPages={numberOfPages}
            baseUrl="/all"
          />
        </Wrapper>
      </Layout>
    </>
  );
}


export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  const numberOfPosts = slugs.length
  const cardsPerPage = 4
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