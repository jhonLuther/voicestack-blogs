import { useRef, useState, useEffect } from 'react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '~/components/Layout'
import Section from '~/components/Section'
import { readToken } from '~/lib/sanity.api'
import {
  getEbooks,
  getEventCards,
  getHomeSettings,
  getPosts,
  getSiteSettings,
  getTags,
  getTagsByOrder,
  getTestiMonials,
  getWebinars,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { Post } from '~/interfaces/post'
import { getClient } from '~/lib/sanity.client'
import DynamicPages from '~/layout/DynamicPages'
import { indexPageJsonLd } from '~/utils/generateJSONLD'
import Head from 'next/head'
import { defaultMetaTag } from '~/utils/customHead'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'

interface IndexPageProps {
  allEventCards: any
  tagsByOrder: any
  webinars: any
  ebooks: any
  siteSettings: any
  contentType: string
  latestPosts: any
  podcastData: any
  draftMode: boolean
  token: string
  posts: Array<Post>
  tags: Array<any>
  testimonials: Array<any>
  homeSettings: any
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & { posts: Post[] }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)

  try {
    const [
      latestPosts,
      posts,
      tags,
      tagsByOrder,
      testimonials,
      homeSettings,
      siteSettings,
      ebooks,
      webinars,
      allEventCards,
    ] = await Promise.all([
      getPosts(client, 5),
      getPosts(client),
      getTags(client),
      getTagsByOrder(client),
      getTestiMonials(client),
      getHomeSettings(client),
      getSiteSettings(client),
      getEbooks(client),
      getWebinars(client),
      getEventCards(client),
    ])

    return {
      props: {
        draftMode,
        token: draftMode ? readToken : '',
        posts,
        latestPosts,
        tags,
        tagsByOrder,
        testimonials,
        homeSettings,
        siteSettings,
        ebooks,
        webinars,
        allEventCards,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        draftMode,
        token: draftMode ? readToken : '',
        posts: [],
        tags: [],
        testimonials: [],
        homeSettings: [],
        ebooks: [],
        webinars: [],
        error: true,
      },
    }
  }
}

export default function IndexPage(props: IndexPageProps) {
  const homeSettings = props?.homeSettings
  const latestPosts = props?.latestPosts
  const siteSettings = props?.siteSettings
  const eventCards = props?.allEventCards

  console.log(props, 'props')

  return (
    <GlobalDataProvider
      data={props?.tags}
      featuredTags={homeSettings.featuredTags}
      homeSettings={homeSettings}
    >
      <Layout>
        {siteSettings?.map((e: any) => {
          return defaultMetaTag(e)
        })}
        <Head>
          <script type="application/ld+json">
            {JSON.stringify(indexPageJsonLd(props))}
          </script>
        </Head>
        <DynamicPages
          posts={props.posts}
          tags={props.tags}
          testimonials={props.testimonials}
          homeSettings={homeSettings}
          podcastData={props?.podcastData}
          latestPosts={latestPosts}
          ebooks={props?.ebooks}
          webinars={props?.webinars}
          eventCards={eventCards}
        />
      </Layout>
    </GlobalDataProvider>
  )
}
