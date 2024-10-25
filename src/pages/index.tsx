import { useRef, useState, useEffect } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '~/components/Layout';
import Section from '~/components/Section';
import { readToken } from '~/lib/sanity.api';
import { getEbooks, getHomeSettings, getPosts, getSiteSettings, getTags, getTestiMonials, getWebinars } from '~/lib/sanity.queries';
import type { SharedPageProps } from '~/pages/_app';
import { Post } from '~/interfaces/post';
import { getClient } from '~/lib/sanity.client';
import DynamicPages from '~/layout/DynamicPages'
import { indexPageJsonLd } from '~/utils/generateJSONLD'
import Head from 'next/head'

interface IndexPageProps {
  webinars: any;
  ebooks: any;
  siteSettings: any;
  contentType: string;
  latestPosts: any;
  podcastData: any;
  draftMode: boolean;
  token: string;
  posts: Array<Post>;
  tags: Array<any>;
  testimonials: Array<any>;
  homeSettings: Array<any>;
}

export const getStaticProps: GetStaticProps<SharedPageProps & { posts: Post[] }> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);

  try {
    const latestPosts = await getPosts(client, 4);
    const posts = await getPosts(client);
    const tags = await getTags(client);
    const testimonials = await getTestiMonials(client);
    const homeSettings = await getHomeSettings(client);
    const siteSettings = await getSiteSettings(client);
    const ebooks: any = await getEbooks(client);
    const webinars: any = await getWebinars(client);



    return {
      props: {
        draftMode,
        token: draftMode ? readToken : '',
        posts,
        latestPosts,
        tags,
        testimonials,
        homeSettings,
        siteSettings,
        ebooks,
        webinars
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
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
    };
  }
};

export default function IndexPage(props: IndexPageProps) {
  console.log(props);
  
  const homeSettings = props?.homeSettings[0];
  const latestPosts = props?.latestPosts;
  const siteSettings = props?.siteSettings;

  return (
    <Layout>
      <Head>
        <script type="application/ld+json">{indexPageJsonLd(props)}</script>
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
      />
    </Layout>
  )
}