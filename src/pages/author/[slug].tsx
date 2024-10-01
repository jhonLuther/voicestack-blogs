import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { getClient } from '~/lib/sanity.client'
import { authorBySlugQuery, authorSlugsQuery, getAuthor, getauthorRelatedContents, getAuthors, getPost } from '~/lib/sanity.queries'
import Container from '~/components/Container'
import Wrapper from '~/components/commonSections/Wrapper'
import { readToken } from '~/lib/sanity.api'
import { Author, Post } from '~/interfaces/post'
import { SharedPageProps } from '../_app'
import Image from 'next/image'
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection'
import Card from '~/components/Card'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    author: Author
    relatedContents: Post[]
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const author = await getAuthor(client, params.slug)
  const authorId = author?._id

  const relatedContents = await getauthorRelatedContents(client, authorId);

  if (!author) {
    return {
      notFound: true,
      revalidate: 60,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      author,
      relatedContents
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
  relatedContents
}: InferGetStaticPropsType<typeof getStaticProps>) {

  console.log(relatedContents, 'relatedContents');


  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Wrapper>
      <section className="flex flex-col mx-auto  w-full h-full items-center">
        <div className='flex flex-col items-center gap-4'>
          {author.picture && (
            <Image
              src={author.picture}
              alt={author.name}
              width={150}
              height={150}
              className='rounded-full'
            />
          )}
          <h1 className='text-2xl font-semibold'>{author.name}</h1>
          <p className='text-lg font-normal'>{author.role}</p>
        </div>
        <p className='max-w-3xl text-lg font-normal'>{author.bio}</p>

        <div className='flex flex-col max-w-3xl items-center gap-4 mt-8'>
          <h2 className='text-2xl font-semibold'>{`More Like This`}</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-y-9 gap-4">
            {
              relatedContents?.length > 0 && (
                relatedContents.map((contents) => (
                  <Card key={contents._id} post={contents} />
                ))
              )
            }
          </div>
        </div>
      </section>
    </Wrapper>
  )
}
