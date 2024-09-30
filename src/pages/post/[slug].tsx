import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  getPosts,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'
import blogStyles from '../../styles/components/blogStyles.module.scss'
import HighlightDecorator from '~/components/HighlightDecorator'
import DynamicComponent from '../../layout/DynamicComponent'
import SEOHead from '~/layout/SeoHead'
import { Post } from '~/interfaces/post'
import { generateJSONLD } from '~/utils/generateJSONLD'
import { fetchAuthor, getRelatedFeatures } from '~/utils/common'
import AuthorInfo from '~/components/commonSections/AuthorInfo'
import Header from '~/components/commonSections/Header'
import Wrapper from '~/components/commonSections/Wrapper'
import { SanityImage } from '~/components/SanityImage'
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection'
import ShareableLinks from '~/components/commonSections/ShareableLinks'
import Breadcrumb from '~/components/commonSections/BreadCrumb'
import MainImageSection from '~/components/MainImageSection'
import DecoratorTable from '~/components/DecoratorTable'


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
      allPosts
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>  & { allPosts: Post[] },
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
  const jsonLD: any = generateJSONLD(post);
  const authorInfo = post?.author;


  const myPortableTextComponents : any = {
    marks: {

      link: ({ children, value }) => {
        return <a href={value.href} >{children}</a>

      },
    },

    types: {
      image: ({ value }) => {
        return (
          <SanityImage {...value} client={getClient(props.draftMode ? { token: props.token } : undefined)} />
        );
      },
      table: ({ value }) => {
        return (
          <DecoratorTable>{value}</DecoratorTable>
          
        );
      },

      dynamicComponent: ({ value }) => {
        return <DynamicComponent {...value} client={getClient(props.draftMode ? { token: props.token } : undefined)} />
      }
    },
  }

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        robots={seoRobots}
        canonical={seoCanonical}
        jsonLD={jsonLD}
        contentType={post?.contentType} />
      <Container >
        <MainImageSection post={post} />
        <section className={`post ${blogStyles.blog}`}>
          <div className="post__container">

            <Wrapper>
            <div className="flex gap-[74px] md:flex-row flex-col">

              <div className="mt-12 flex md:flex-col flex-col-reverse">
              <div className='post__content max-w-[53rem] '>
                <PortableText value={post.body} components={myPortableTextComponents} />
                
              </div>

              <div className='md:hidden block'>
              {authorInfo && <AuthorInfo author={authorInfo} />}
              </div>
              </div>
              <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative'>
              <div className='sticky top-12 flex flex-col gap-12'>
              {authorInfo &&
                <div className=''>
              
              <AuthorInfo author={authorInfo} />

              </div>
              }
                <RelatedFeaturesSection currentPostSlug={post.slug.current} allPosts={allPosts} />
                <ShareableLinks props={post.title ?? post.title} />
              </div>

              </div>
            </div>
            </Wrapper>
          </div>
        </section>
      </Container>
    </>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    fallback: 'blocking',
  }
}
