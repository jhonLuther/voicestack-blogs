// pages/testimonial/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { getClient } from '~/lib/sanity.client';
import { caseStudySlugsQuery, getCaseStudies, getCaseStudy } from '~/lib/sanity.queries';
import { CaseStudies } from '~/interfaces/post';
import Wrapper from '~/layout/Wrapper';
import { readToken } from '~/lib/sanity.api';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import Layout from '~/components/Layout';
import AsideBannerBlock from '~/components/sections/asideBannerBlock';
import PracticeProfile from '~/contentUtils/PracticeProfile';
import SEOHead from '~/layout/SeoHead';
import { generateJSONLD } from '~/utils/generateJSONLD';
import { urlForImage } from '~/lib/sanity.image';
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor';
import { Toc } from '~/contentUtils/sanity-toc';
import ShareableLinks from '~/components/commonSections/ShareableLinks';
import Section from '~/components/Section';
import CustomHead from '~/utils/customHead';

interface Props {
  caseStudy: CaseStudies;
  limitCaseStudies?: any;
  draftMode: boolean;
  token: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(caseStudySlugsQuery);

  const paths = slugs?.map((slug: string) => {
    return { params: { slug } };
  }) || [];

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const caseStudy = await getCaseStudy(client, params.slug as string);
  const limitCaseStudies: any = await getCaseStudies(client, 0, 4);


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
      limitCaseStudies
    },
  };
};

const CaseStudyPage = ({ caseStudy,limitCaseStudies, draftMode, token }: Props) => {
  const seoTitle = caseStudy.seoTitle || caseStudy.title;
  const seoDescription = caseStudy.seoDescription || caseStudy.excerpt;
  const seoKeywords = caseStudy.seoKeywords || '';
  const seoRobots = caseStudy.seoRobots || 'index,follow';
  const seoCanonical = caseStudy.seoCanonical || `https://carestack.com/caseStudy/${caseStudy.slug.current}`;
  const jsonLD: any = generateJSONLD(caseStudy);

  // console.log(limitCaseStudies);
  

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        robots={seoRobots}
        canonical={seoCanonical}
        jsonLD={jsonLD}
        ogImage={urlForImage(caseStudy?.mainImage)}
        contentType={caseStudy?.contentType}
      />
      <Layout>
        <MainImageSection isAuthor={true} post={caseStudy} />
        <AsideBannerBlock contents={caseStudy} />
        <Section className="justify-center">
          <Wrapper className="flex-col">
            <CustomHead props={caseStudy} type="caseStudy" />
            <div className="flex md:flex-row flex-col">
              <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full">
                <div className="post__content w-full">
                <SanityPortableText content={caseStudy.body} draftMode={draftMode} token={token} />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-12 mt-12 relative md:w-1/3 w-full">
                <div className="sticky top-12 flex flex-col gap-12">
                  <Toc headings={caseStudy?.headings} title="Contents" />
                  <ShareableLinks props={caseStudy?.title} />
                  <PracticeProfile contents={caseStudy} />
                </div>
              </div>
            </div>
          </Wrapper>
        </Section>
        {caseStudy?.relatedCaseStudies?.length > 0 && (
              <RelatedFeaturesSection
                contentType={caseStudy?.contentType}
                allPosts={[
                  ...(Array.isArray(caseStudy?.relatedArticles) ? caseStudy.relatedArticles : []),
                  ...(Array.isArray(limitCaseStudies) ? limitCaseStudies : [])
                ].slice(0, 4)}
              />
            )}
      </Layout>
    </>
  );
};

export default CaseStudyPage;
