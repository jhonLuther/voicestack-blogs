import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { getClient } from '~/lib/sanity.client'
import { authorBySlugQuery, authorSlugsQuery, getAuthor, getauthorRelatedContents, getAuthors, getPost } from '~/lib/sanity.queries'
import Layout from '~/components/Layout'
import Wrapper from '~/layout/Wrapper'
import { readToken } from '~/lib/sanity.api'
import { Author, Post } from '~/interfaces/post'
import { SharedPageProps } from '../_app'
import Image from 'next/image'
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection'
import Card from '~/components/Card'
import AllcontentSection from '~/components/sections/AllcontentSection'
import siteConfig from 'config/siteConfig'
import Section from '~/components/Section'
import { useRef } from 'react'
import { BaseUrlProvider } from '~/components/Context/UrlContext'

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
  const paths = slugs?.map((slug: string) => ({
    params: { slug }
  })).filter(Boolean)

  return {
    paths,
    fallback: 'blocking',
  }
}

export default function AuthorPage({
  author,
  relatedContents
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const baseUrl = useRef(`/${siteConfig.pageURLs.author}`).current;  

  return (
    <BaseUrlProvider baseUrl={baseUrl}>
    <Layout >
      <Section className='justify-center'>
        <Wrapper className={`flex-col`}>
          <div className='flex md:flex-row flex-col items-center gap-16'>
            <div>
              {author.picture && (
                <Image
                  src={author.picture}
                  alt={author.name}
                  width={360}
                  height={360}
                  className='rounded-s'
                />
              )}
            </div>
            <div className=' flex flex-col gap-6'>
              <h2 className='md:text-6xl text-2xl text-cs-zinc-900  font-extrabold font-manrope '>{author.name}</h2>
              <p className='md:text-4xl text-xl text-cs-dark-500 font-manrope font-semibold pb-6 border-b-2 border-cs-darkBlack' >{author.role}</p>
              <p className='max-w-3xl text-xl text-cs-zinc-900   font-normal'>{author.bio}</p>
            </div>
          </div>
          {relatedContents &&
            <AllcontentSection
              className={'pb-9'}
              allContent={relatedContents}
              itemsPerPage={siteConfig.pagination.childItemsPerPage}
              redirect={true}
            />}
        </Wrapper>
      </Section>
    </Layout >
    </BaseUrlProvider>
  )
}
