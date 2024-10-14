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

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
    context?:{
      cardsPerPage:number
    }
  },
  Query
> = async ({ draftMode = false, params = {}  }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const pageNumber = parseInt(params?.pageNumber as string)
  const cardsPerPage = 4 
  // const cardsPerPage = parseInt(params?.cardsPerPage as string)


  let startLimit = (pageNumber - 1) * cardsPerPage
  let endLimit = startLimit + cardsPerPage

  // if(pageNumber > 1 ){

  //  startLimit = (pageNumber-1) * 5
  //  endLimit = startLimit + 5
  // }
  const posts = await getPostsByLimit(client,startLimit,endLimit);

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
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps> & { posts: any ,relatedContents: Post[]},
) {

  const [posts] = useLiveQuery(props.posts, postBySlugQuery, {
    slug: props.posts?.slug?.current,
  })
  

  return (
    <>
  
      <Layout >
      <Wrapper>
				<AllcontentSection allContent={posts}  />
			</Wrapper>
    
      </Layout>
    </>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  const numberOfPosts = slugs.length
  const cardsPerPage = 5
  const numberOfPages = Math.ceil(numberOfPosts / cardsPerPage)

  const paths = []

  for (let i = 1; i <= numberOfPages; i++) {
    paths.push({params:{ pageNumber: i.toString()}})
  }



  return {
    paths: paths.map(({ params }) => `/all/${params.pageNumber}`),
    fallback: 'blocking',
  }
}
