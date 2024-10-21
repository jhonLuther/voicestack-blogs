// pages/testimonial/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { pressReleaseSlugsQuery, getCaseStudy, getPressRelease, getRelatedContents } from '~/lib/sanity.queries';
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

const router = useRouter();


interface Props {
  pressRelease: PressRelease;
  draftMode: boolean;
  token: string;
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
    },
  };
}

const PressReleasePage = ({ pressRelease, draftMode, token }: Props) => {
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const seoTitle = pressRelease.seoTitle || pressRelease.title;
  const seoDescription = pressRelease.seoDescription || pressRelease.excerpt;
  const seoKeywords = pressRelease.seoKeywords || '';
  const seoRobots = pressRelease.seoRobots || 'index,follow';
  const seoCanonical = pressRelease.seoCanonical || `https://carestack.com/pressRelease/${pressRelease.slug.current}`;
  const jsonLD: any = generateJSONLD(pressRelease);


  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        robots={seoRobots}
        canonical={seoCanonical}
        jsonLD={jsonLD}
        ogImage={urlForImage(pressRelease?.mainImage)}
        contentType={pressRelease?.contentType} />
      <Layout >
        <MainImageSection post={pressRelease} />
        <Wrapper>
          <div className="flex  md:flex-row flex-col">
            <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
              <div className='post__content w-full '>
                <SanityPortableText
                  content={pressRelease.body}
                  draftMode={draftMode}
                  token={token}
                />
              </div>
            </div>
            <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
              <div className='sticky top-12 flex flex-col gap-12'>
                <Toc headings={pressRelease?.headings} title="Article content" />
                {pressRelease?.author &&
                  <div className=''>
                    <AuthorInfo contentType={pressRelease.contentType} author={pressRelease?.author} />
                  </div>
                }
              </div>
            </div>
          </div>
          {pressRelease?.relatedPressReleases.length > 0 && <RelatedFeaturesSection title={pressRelease?.title} allPosts={pressRelease?.relatedPressReleases} />}
        </Wrapper>
      </Layout>
    </>
  );
};

export default PressReleasePage;
