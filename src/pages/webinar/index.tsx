import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Post, Testimonial, Podcasts,Webinars } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getPodcasts, getTags, getWebinars } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';
import Wrapper from '~/components/commonSections/Wrapper';
import LatestBlogs from '~/components/sections/LatestBlogSection';
import Section from '~/components/Section';
import Container from '~/components/Container';
import TagSelect from '~/contentUtils/TagSelector';
import AllcontentSection from '~/components/sections/AllcontentSection';

export const getStaticProps: GetStaticProps<
  SharedPageProps & { webinars: Webinars[] }
> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const webinars: any = await getWebinars(client, 5);
  const allWebinars: any = await getWebinars(client);
  const tags = await getTags(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      webinars,
      allWebinars,
      tags,
    } as SharedPageProps & { webinars: Webinars[] },
  };
};

const WebinarsPage = ({ webinars, allWebinars, tags }: { webinars: Webinars[], allWebinars: Webinars[], tags: any }) => {

  return (
    <Container>
        <Wrapper>
        </Wrapper>
        <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'}  revamp={true} contents={webinars} />
        <Wrapper>
          <AllcontentSection className={'pb-9'}  allContent={allWebinars} hideSearch={true} cardType={'podcast-card'}/>
        </Wrapper>

    </Container>

  );
};

export default WebinarsPage;

