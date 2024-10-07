import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Post, Testimonial, Podcasts, CaseStudies } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getCaseStudies, getPodcasts, getTags } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';
import Wrapper from '~/components/commonSections/Wrapper';
import LatestBlogs from '~/components/sections/LatestBlogSection';
import Section from '~/components/Section';
import Container from '~/components/Container';
import TagSelect from '~/contentUtils/TagSelector';
import AllcontentSection from '~/components/sections/AllcontentSection';

export const getStaticProps: GetStaticProps<
  SharedPageProps & { caseStudies: CaseStudies[] }
> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const caseStudies: any = await getCaseStudies(client, 4);
  // const allPodcasts: any = await getPodcasts(client);
  const tags = await getTags(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      caseStudies,
      // allPodcasts,
      // tags,
    } as SharedPageProps & { caseStudies: CaseStudies[] },
  };
};

const CaseStudyPage = ({ caseStudies, allPodcasts, tags }: { caseStudies: CaseStudies[], allPodcasts: Podcasts[], tags: any }) => {
  console.log(caseStudies, 'caseStudies  IN  MAIN SECTON');


  return (
    <Container>
      <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'} revamp={true} contents={caseStudies ? caseStudies : []} />
      <Wrapper>
        <AllcontentSection className={'pb-9'} allContent={caseStudies} hideSearch={true} cardType={'podcast-card'} />
      </Wrapper>
    </Container>

  );
};

export default CaseStudyPage;

