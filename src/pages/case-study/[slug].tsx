// pages/testimonial/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { getClient } from '~/lib/sanity.client';
import { caseStudySlugsQuery, getCaseStudies, getCaseStudy, getTagRelatedContents } from '~/lib/sanity.queries';
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
import {CustomHead, generateMetaData} from '~/utils/customHead';
import AuthorInfo from '~/components/commonSections/AuthorInfo';

interface Props {
  caseStudy: CaseStudies;
  draftMode: boolean;
  token: string;
  relatedContents: any
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
  const tagIds = caseStudy.tags?.map((tag: any) => tag?._id) || []
  const relatedContents = await getTagRelatedContents(client, tagIds,caseStudy?.contentType);


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
      relatedContents
    },
  };
};

const CaseStudyPage = ({ caseStudy,relatedContents, draftMode, token }: Props) => {
  if(!caseStudy) {
    return null;
  }

  const seoTitle = caseStudy.seoTitle || caseStudy.title;
  const seoDescription = caseStudy.seoDescription || caseStudy.excerpt;
  const seoKeywords = caseStudy.seoKeywords || '';
  const seoRobots = caseStudy.seoRobots || 'index,follow';
  const seoCanonical = caseStudy.seoCanonical || `https://carestack.com/caseStudy/${caseStudy.slug.current}`;
  const jsonLD: any = generateJSONLD(caseStudy);

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        robots={seoRobots}
        canonical={seoCanonical}
        jsonLD={jsonLD}
        ogImage={urlForImage(caseStudy?.mainImage?._id)}
        contentType={caseStudy?.contentType}
      />
      {generateMetaData(caseStudy)}
      <Layout>
        <MainImageSection isAuthor={true} post={caseStudy} enableDate={true} />
        {caseStudy?.asideBookFreeDemoBanner && <AsideBannerBlock contents={caseStudy} />}
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
                  {(caseStudy?.practiceName || caseStudy?.location || caseStudy?.providers || caseStudy?.headCount || caseStudy?.growingLocations || caseStudy?.facilities) ? <PracticeProfile contents={caseStudy} />
                    :
                    <Toc headings={caseStudy?.headings} title="Contents" />
                  }
                  <div className='flex flex-col gap-8'>
                  {caseStudy?.author &&
                    <div className=''>
                      <AuthorInfo contentType={caseStudy?.contentType} author={caseStudy?.author} />
                    </div>
                  }
                  <ShareableLinks props={caseStudy?.title} />
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </Section>
        {relatedContents.length > 0 && (
          <RelatedFeaturesSection
            contentType={caseStudy?.contentType}
            allPosts={relatedContents}
          />
        )}
      </Layout>
    </>
  )
};

export default CaseStudyPage;
