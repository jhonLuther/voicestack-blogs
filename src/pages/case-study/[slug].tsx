// pages/testimonial/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { caseStudySlugsQuery, getCaseStudy, getRelatedContents } from '~/lib/sanity.queries';
import { CaseStudies } from '~/interfaces/post';
import Wrapper from '~/components/commonSections/Wrapper';
import Image from 'next/image';
import { readToken } from '~/lib/sanity.api';
import { draftMode } from 'next/headers';
import SanityPortableText from '~/components/Editor/sanityBlockEditor';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import Container from '~/components/Container';
import DynamicComponent from '~/layout/DynamicComponent';
import AsideBannerBlock from '~/components/sections/asideBannerBlock';
import PracticeProfile from '~/contentUtils/PracticeProfile';

interface Props {
  caseStudy: CaseStudies;
  draftMode: boolean;
  token: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(caseStudySlugsQuery);

  console.log(slugs, 'slugs testimonials');

  const paths = slugs?.map((slug: string) => {
    return { params: { slug } };
  }) || [];

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps<Props> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const caseStudy = await getCaseStudy(client, params.slug as string);
  if (!caseStudy) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      caseStudy,
    },
  };
}

const CaseStudyPage = ({ caseStudy, draftMode, token }: Props) => {
  const router = useRouter();

  console.log(caseStudy, 'caseStudy data ');

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Container >
      <MainImageSection post={caseStudy} />
      <Wrapper>
        <div className="flex  md:flex-row flex-col">
          <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
            <div className='post__content w-full '>
            <PracticeProfile contents={caseStudy}/>
              <SanityPortableText
                content={caseStudy.body}
                draftMode={draftMode}
                token={token}
              />
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
            <div className='sticky top-12 flex flex-col gap-12'>
              <AsideBannerBlock contents={caseStudy}/>
              {caseStudy?.relatedCaseStudies?.length > 0 && <RelatedFeaturesSection title={caseStudy?.title} allPosts={caseStudy?.relatedCaseStudies} />}
            </div>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
};

export default CaseStudyPage;
