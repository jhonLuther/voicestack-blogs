// pages/testimonial/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { pressReleaseSlugsQuery, getCaseStudy, getPressRelease, getRelatedContents, getPressReleases, getTagRelatedContents } from '~/lib/sanity.queries';
import { CaseStudies, PressRelease } from '~/interfaces/post';
import Wrapper from '~/layout/Wrapper';
import Image from 'next/image';
import { readToken } from '~/lib/sanity.api';
import { draftMode } from 'next/headers';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import Layout from '~/components/Layout';
import AsideBannerBlock from '~/components/sections/asideBannerBlock';
import PracticeProfile from '~/contentUtils/PracticeProfile';
import { generateJSONLD } from '~/utils/generateJSONLD';
import SEOHead from '~/layout/SeoHead';
import { urlForImage } from '~/lib/sanity.image';
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor';
import AuthorInfo from '~/components/commonSections/AuthorInfo';
import { Toc } from '~/contentUtils/sanity-toc';
import Section from '~/components/Section';
import SidebarTitle from '~/components/typography/SidebarTitle';
import ShareableLinks from '~/components/commonSections/ShareableLinks';
import Button from '~/components/commonSections/Button';
import {DocumentTextIcon} from '@sanity/icons'
import { CustomHead, generateMetaData } from '~/utils/customHead';

interface Props {
  pressRelease: PressRelease;
  draftMode: boolean;
  token: string;
  relatedContents?: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(pressReleaseSlugsQuery);

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
  const pressRelease = await getPressRelease(client, params.slug as string);
  const tagIds = pressRelease.tags?.map((tag: any) => tag?._id) || []
  const relatedContents = await getTagRelatedContents(client,params.slug as string, tagIds,pressRelease.contentType);


  if (!pressRelease) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      pressRelease,
      relatedContents
    },
  };
}

const PressReleasePage = ({ pressRelease,relatedContents, draftMode, token }: Props) => {

  const seoTitle = pressRelease.seoTitle || pressRelease.title;
  const seoDescription = pressRelease.seoDescription || pressRelease.excerpt;
  const seoKeywords = pressRelease.seoKeywords || '';
  const seoRobots = pressRelease.seoRobots || 'index,follow';
  const seoCanonical = pressRelease.seoCanonical || `https://carestack.com/pressRelease/${pressRelease.slug.current}`;
  const jsonLD: any = generateJSONLD(pressRelease);

  console.log({pressRelease});
  
  return (
    <>
      {/* <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        robots={seoRobots}
        canonical={seoCanonical}
        jsonLD={jsonLD}
        ogImage={urlForImage(pressRelease?.mainImage)}
        contentType={pressRelease?.contentType} /> */}
        {generateMetaData(pressRelease)}
        <CustomHead props={pressRelease} type="pressRelease"/>

      <Layout >
        <MainImageSection enableDate={true} post={pressRelease} />
        <Section className='justify-center !pt-24 !pb-12'>
          <Wrapper className={'flex-col'}>
            <div className="flex md:flex-row flex-col justify-between gap-20">
              <div className="flex md:flex-col flex-col-reverse max-w-[710px] w-full ">
                <div className='post__content w-full '>
                  <SanityPortableText
                    content={pressRelease.body}
                    draftMode={draftMode}
                    token={token}
                  />
                </div>
              </div>
              {/* <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
                <div className='sticky top-12 flex flex-col gap-12'>
                  <Toc headings={pressRelease?.headings} title="Contents" />
                  {pressRelease?.author &&
                    <div className=''>
                      <AuthorInfo contentType={pressRelease.contentType} author={pressRelease?.author} />
                    </div>
                  }
                </div>
              </div> */}
              <div className='flex-1 flex flex-col gap-12 bg-red relative max-w-[410px] w-full'>
                <div className='sticky top-12 flex flex-col gap-8'>
                  <>
                    {pressRelease.pressReleaseUrl && (
                      <>
                        <SidebarTitle className='border-b border-zinc-200 pb-3'>{`To Know More About`}</SidebarTitle>
                        <Button target="_blank" link={pressRelease.pressReleaseUrl} className='bg-zinc-900 gap-6 py-[14px] px-7 hover:bg-zinc-800 self-start'>
                          <DocumentTextIcon width={24} height={24} className='text-white'/>
                          <span className='text-base font-medium'>{`Read Original Article`}</span>
                        </Button>
                      </>
                    )}
                    {pressRelease?.author &&
                    <div className=''>
                      <AuthorInfo contentType={pressRelease.contentType} author={pressRelease?.author} />
                    </div>
                  }
                  </>
                  <ShareableLinks props={pressRelease?.title} />
                </div>
              </div>
            </div>
          </Wrapper>
        </Section>
        {relatedContents.length > 0 && (
          <RelatedFeaturesSection
            contentType={pressRelease?.contentType}
            allPosts={relatedContents}
          />
        )}
      </Layout>
    </>
  );
};

export default PressReleasePage;
