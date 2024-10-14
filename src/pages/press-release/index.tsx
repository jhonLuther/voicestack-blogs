import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Post, Testimonial, Podcasts, PressRelease } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getCaseStudies, getPodcasts, getPressReleases, getTags } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';
import Wrapper from '~/layout/Wrapper';
import LatestBlogs from '~/components/sections/LatestBlogSection';
import Section from '~/components/Section';
import Layout from '~/components/Layout';
import TagSelect from '~/contentUtils/TagSelector';
import AllcontentSection from '~/components/sections/AllcontentSection';

export const getStaticProps: GetStaticProps<
  SharedPageProps & { pressReleases: PressRelease[] }
> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const pressReleases: any = await getPressReleases(client, 4);
  const allPressReleases: any = await getPressReleases(client);
  const tags = await getTags(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      pressReleases,
      allPressReleases,
    } as SharedPageProps & { pressReleases: PressRelease[] },
  };
};

const PressReleasesPage = ({ pressReleases, allPressReleases, tags }: { pressReleases: PressRelease[], allPressReleases: PressRelease[], tags: any }) => {


  return (
    <Layout>
      <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'} revamp={true} contents={pressReleases ? pressReleases : []} />
      <Wrapper>
        <AllcontentSection className={'pb-9'} allContent={allPressReleases} hideSearch={true} cardType={'podcast-card'} />
      </Wrapper>
    </Layout>

  );
};

export default PressReleasesPage;

