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
  getRelatedContents,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import SEOHead from '~/layout/SeoHead'
import { Post } from '~/interfaces/post'
import { generateJSONLD } from '~/utils/generateJSONLD'
import AuthorInfo from '~/components/commonSections/AuthorInfo'
import Wrapper from '~/layout/Wrapper'
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection'
import MainImageSection from '~/components/MainImageSection'
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor'
import { Toc } from '~/contentUtils/sanity-toc'
import ShareableLinks from '~/components/commonSections/ShareableLinks'

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
      relatedContents
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps> & { allPosts: Post[] ,relatedContents: Post[]},
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post?.slug?.current,
  })

  const [allPosts] = useLiveQuery(props.allPosts, postsQuery);

  if (!post) {
    return <div>Loading...</div>
  }

  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.excerpt;
  const seoKeywords = post.seoKeywords || '';
  const seoRobots = post.seoRobots || 'index,follow';
  const seoCanonical = post.seoCanonical || `https://carestack.com/post/${post.slug.current}`;
  const authorInfo = post?.author
  const jsonLD: any = generateJSONLD(post);  

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        robots={seoRobots}
        canonical={seoCanonical}
        jsonLD={jsonLD}
        ogImage={urlForImage(post?.mainImage)}
        contentType={post?.contentType} />
      <Layout >
        <MainImageSection post={post} />
        <section >
          <div className="post__container">
            <Wrapper>
              <div className="flex  md:flex-row flex-col">
                <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
                  <div className='post__content w-full '>
                  <SanityPortableText
                      content={post.body}
                      draftMode={props.draftMode}
                      token={props.token}
                    />
                  </div>
                  <div className='md:hidden block'>
                    {authorInfo && <AuthorInfo contentType={post.contentType} author={authorInfo} />}
                  </div>
                </div>
                <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
                  <div className='sticky top-12 flex flex-col gap-12'>
                  <Toc headings={ post?.headings} title="Contents" />
                    {authorInfo &&
                      <div className=''>
                        <AuthorInfo contentType={post.contentType} author={authorInfo} />
                      </div>
                    }
                    <ShareableLinks props={post?.title} />
                  </div>
                </div>
              </div>
              {post?.relatedPosts && <RelatedFeaturesSection  contentType={post.contentType} allPosts={post?.relatedPosts} />}
            </Wrapper>
          </div>
        </section>
      </Layout>
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
