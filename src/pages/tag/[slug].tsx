import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { getClient } from '~/lib/sanity.client'
import { authorBySlugQuery, authorSlugsQuery, getAuthor, getAuthors, getPost, getPostsBySlug, getTag, tagBySlugQuery, tagsSlugsQuery } from '~/lib/sanity.queries'
import Container from '~/components/Container'
import Wrapper from '~/components/commonSections/Wrapper'
import { readToken } from '~/lib/sanity.api'
import { Author, Post, Tag } from '~/interfaces/post'
import { SharedPageProps } from '../_app'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    tag: Tag;
    posts: Post[];
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const tag = await getTag(client, params.slug)

  console.log({tagin:tag});
  
  const posts = await getPostsBySlug(client, params.slug)

  if (!tag) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      tag,
      posts,
    },
  }
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(tagsSlugsQuery)

  return {
    paths: slugs?.map(({ slug }: { slug: string }) => `/tag/${slug}`) || [],
    fallback: 'blocking',
  }
}

export default function TagPage({
  tag,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  // console.log(tag,'in tag tsx');

  console.log({postsin:posts});
  
  
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Wrapper>
      <section className="author-page">
        <h1>{tag?.tagName}</h1>
      </section>
    </Wrapper>
  )
}
