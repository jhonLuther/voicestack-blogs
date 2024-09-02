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
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'
import blogStyles from '../../styles/components/blogStyles.module.scss'
import HighlightDecorator from '~/components/HighlightDecorator'
import DynamicComponent from '../../layout/DynamicComponent'
import SEOHead from '~/layout/SeoHead'
import { Post } from '~/interfaces/post'
import { generateJSONLD } from '~/utils/generateJSONLD'


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
    },
  }
}
const myPortableTextComponents = {
  marks: {
    highlight: ({ children, value }: any) => {
      return (
        <HighlightDecorator>{children}</HighlightDecorator>
      )
    },
  },
}
export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post?.slug?.current,
  })

  if (!post) {
    return <div>Loading...</div>
  }

  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.excerpt;
  const seoKeywords = post.seoKeywords || '';
  const seoRobots = post.seoRobots || 'index,follow';
  const seoCanonical = post.seoCanonical || `https://carestack.com/post/${post.slug.current}`;
  const jsonLD = generateJSONLD(post);

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        robots={seoRobots}
        canonical={seoCanonical}
        jsonLD={jsonLD} />
      <Container>
        <section className={`post ${blogStyles.blog}`}>
          {post.mainImage ? (
            <Image
              className="post__cover"
              src={urlForImage(post.mainImage).url()}
              height={231}
              width={367}
              alt=""
            />
          ) : (
            <div className="post__cover--none" />
          )}
          <div className="post__container">
            <h1 className="post__title">{post.title}</h1>
            <p className="post__excerpt">{post.excerpt}</p>
            <p className="post__date">{formatDate(post._createdAt)}</p>
            <div className="post__content">
              <PortableText value={post.body} components={myPortableTextComponents} />
              {post.dynamicComponents && post.dynamicComponents?.map((component: any, index: number) => (
                <DynamicComponent
                  key={component._key || index}
                  componentType={component.componentType}
                  {...component}
                />
              ))}
            </div>
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
