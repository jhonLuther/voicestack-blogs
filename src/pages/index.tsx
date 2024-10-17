import { useRef, useState, useEffect } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '~/components/Layout';
import Section from '~/components/Section';
import { readToken } from '~/lib/sanity.api';
import { getHomeSettings, getPosts, getTags, getTestiMonials } from '~/lib/sanity.queries';
import type { SharedPageProps } from '~/pages/_app';
import { Post } from '~/interfaces/post';
import { getClient } from '~/lib/sanity.client';
import DynamicPages from '~/layout/DynamicPages';



interface IndexPageProps {
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

    return {
      props: {
        draftMode,
        token: draftMode ? readToken : '',
        posts,
        latestPosts,
        tags,
        testimonials,
        homeSettings,
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
        error: true,
      },
    };
  }
};

export default function IndexPage(props: IndexPageProps) {
  const homeSettings = props?.homeSettings[0];
  const latestPosts = props?.latestPosts;

  return (
    <Layout>
        <DynamicPages posts={props.posts} tags={props.tags} testimonials={props.testimonials}
          homeSettings={homeSettings} popularBlogs={homeSettings?.popularBlogs}
          podcastData={props?.podcastData} latestPosts={latestPosts}
          featuredContents={homeSettings?.FeaturedContents} />
    </Layout>
  );
}