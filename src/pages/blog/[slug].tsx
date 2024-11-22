import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getHomeSettings,
  getPost,
  getPosts,
  getRelatedContents,
  getTags,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { Post } from '~/interfaces/post'
import Wrapper from '~/layout/Wrapper'
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection'
import MainImageSection from '~/components/MainImageSection'
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'
import homeSettings from '~/schemas/homeSettings'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPost(client, params.slug)
  const allPosts = await getPosts(client);
  const relatedContents = await getRelatedContents(client, params?.slug);
  const tags =  await getTags(client)
  const homeSettings = await getHomeSettings(client)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
      allPosts,
      relatedContents,
      tags,
      homeSettings
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps> & { tags: any,homeSettings: any, allPosts: Post[] ,relatedContents: Post[]},
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post?.slug?.current,
  })

  const [allPosts] = useLiveQuery(props.allPosts, postsQuery);

  if (!post) {
    return <div>Loading...</div>
  }


  return (
    <>
     <GlobalDataProvider data={props.tags} featuredTags={props?.homeSettings.featuredTags} >
      <Layout >
        <MainImageSection post={post} />
        <section >
          <div className="post__container">
            <Wrapper>
              <div className="flex md:flex-row flex-col gap-6 md:gap-12 justify-between">
                <div className="md:mt-12 flex-1 flex md:flex-col flex-col-reverse md:w-2/3 w-full md:max-w-[710px]">
                  <div className='post__content w-full '>
                  <SanityPortableText
                      content={post.body}
                      draftMode={props.draftMode}
                      token={props.token}
                    />
                  </div>
    
                </div>
              </div>
              {post?.relatedPosts && <RelatedFeaturesSection  contentType={post.contentType} allPosts={post?.relatedPosts} />}
            </Wrapper>
          </div>
        </section>
      </Layout>
      </GlobalDataProvider>
    </>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/blog/${slug}`) || [],
    fallback: 'blocking',
  }
}
