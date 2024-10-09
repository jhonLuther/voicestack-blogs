import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Post, Testimonial, Podcasts } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getPodcasts, getTags } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';
import Wrapper from '~/components/commonSections/Wrapper';
import LatestBlogs from '~/components/sections/LatestBlogSection';
import Section from '~/components/Section';
import Container from '~/components/Container';
import TagSelect from '~/contentUtils/TagSelector';
import AllcontentSection from '~/components/sections/AllcontentSection';

export const getStaticProps: GetStaticProps<
  SharedPageProps & { podcasts: Podcasts[] }
> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const podcasts: any = await getPodcasts(client, 5);
  const allPodcasts: any = await getPodcasts(client);
  const tags = await getTags(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      podcasts,
      allPodcasts,
      tags,
    } as SharedPageProps & { podcasts: Podcasts[] },
  };
};

const PodcastsPage = ({ podcasts, allPodcasts, tags }: { podcasts: Podcasts[], allPodcasts: Podcasts[], tags: any }) => {

  return (
    <Container>
        <Wrapper>
        </Wrapper>
        <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'}  revamp={true} contents={podcasts} />
        <Wrapper>
          <AllcontentSection className={'pb-9'}  allContent={allPodcasts} hideSearch={true} cardType={'podcast-card'}/>
        </Wrapper>
    </Container>

  );
};

export default PodcastsPage;

