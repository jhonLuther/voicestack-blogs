import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { getClient } from '~/lib/sanity.client'
import { authorBySlugQuery, authorSlugsQuery, getAuthor, getAuthors, getPost } from '~/lib/sanity.queries'
import Container from '~/components/Container'
import Wrapper from '~/components/commonSections/Wrapper'
import { readToken } from '~/lib/sanity.api'
import { Author, Post } from '~/interfaces/post'
import { SharedPageProps } from '../_app'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    author: Author
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const author = await getAuthor(client, params.slug)

  if (!author) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      author,
    },
  }
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(authorSlugsQuery)

  return {
    paths: slugs?.map(({ slug }: { slug: string }) => `/author/${slug}`) || [],
    fallback: 'blocking',
  }
}

export default function AuthorPage({
  author,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  console.log(author,'in author tsx');
  
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Wrapper>
      <section className="author-page">
        <h1>{author.name}</h1>
        <p>{author.role}</p>
        {author.picture && (
          <img
            src={author.picture}
            alt={author.name}
            width={150}
            height={150}
          />
        )}
        <p>{author.bio}</p>
      </section>
    </Wrapper>
  )
}
