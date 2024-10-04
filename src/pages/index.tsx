import { useRef, useState, useEffect } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Container from '~/components/Container';
import Section from '~/components/Section';
import { readToken } from '~/lib/sanity.api';
import { getHomeSettings, getPosts, getTags, getTestiMonials } from '~/lib/sanity.queries';
import type { SharedPageProps } from '~/pages/_app';
import { Post } from '~/interfaces/post';
import TagSelect from '~/common/TagSelector';
import { getClient } from '~/lib/sanity.client';
import Wrapper from '~/components/commonSections/Wrapper';
import Layout from '~/layout/Layout';
import { PostProvider } from '~/components/Context/postContext';
import DynamicPages from '~/layout/DynamicPages';



interface IndexPageProps {
  podcastData: any;
  draftMode: boolean;
  token: string;
  posts: Array<Post>;
  tags: Array<any>; 
  testimonials: Array<any>; 
  homeSettings: Array<any>; 
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[];
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const posts = await getPosts(client);
  const tags = await getTags(client)
  const testimonials = await getTestiMonials(client)
  const homeSettings = await getHomeSettings(client)
  // const podcastData = await getPodcastsWithAuthorData(client)


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
      tags,
      testimonials,
      homeSettings,
    },
  };
};

export default function IndexPage(props: IndexPageProps) {
  const mainSection = useRef<HTMLDivElement>(null);


  const homeSettings = props?.homeSettings[0]; 

  return (
    <Container>
        <Section ref={mainSection} className="flex-col py-12 bg-cs-gray">
          <Layout>
            <DynamicPages posts={props.posts} tags={props.tags} testimonials={props.testimonials}
             homeSettings={homeSettings} popularBlogs={homeSettings?.popularBlogs}
             podcastData={props?.podcastData}
             featuredContents={homeSettings?.FeaturedContents}/>
          </Layout>
        </Section>
    </Container>
  );
}