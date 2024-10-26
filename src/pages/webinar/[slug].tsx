import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { getPodcast, getPodcasts, getRelatedContents, getWebinar, getWebinars, podcastSlugsQuery, webinarSlugsQuery } from '~/lib/sanity.queries';
import { Podcasts } from '~/interfaces/post';
import Wrapper from '~/layout/Wrapper';
import Image from 'next/image';
import { readToken } from '~/lib/sanity.api';
import { urlForImage } from '~/lib/sanity.image';
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor';
import Layout from '~/components/Layout';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import AllcontentSection from '~/components/sections/AllcontentSection';
import PracticeProfile from '~/contentUtils/PracticeProfile';
import { generateJSONLD } from '~/utils/generateJSONLD';
import SEOHead from '~/layout/SeoHead';
import { VideoModal } from '~/components/commonSections/VideoModal';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';
import Section from '~/components/Section';
import CustomHead from '~/utils/customHead';

interface Props {
  webinar: Podcasts;
  allWebinars: any;
  draftMode: boolean;
  token: string;
}


export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(webinarSlugsQuery);
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
  const webinar = await getWebinar(client, params.slug as string);
  const allWebinars = await getWebinars(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      webinar,
      allWebinars,
    },
  };
};

const WebinarPage = ({ webinar, draftMode, token }: Props) => {

  const seoTitle = webinar.seoTitle || webinar.title;
  const seoDescription = webinar.seoDescription || webinar.excerpt;
  const seoKeywords = webinar.seoKeywords || '';
  const seoRobots = webinar.seoRobots || 'index,follow';
  const seoCanonical = webinar.seoCanonical || `https://carestack.com/webinar/${webinar.slug.current}`;
  const jsonLD: any = generateJSONLD(webinar);

  return (
    <>
      <CustomHead props ={webinar} type="webinar"/>
      <Layout >
      <MainImageSection isAuthor={true} post={webinar} />

        <Section className='justify-center'>
          <Wrapper className={'flex-col'}>
            <div className="flex  md:flex-row justify-between gap-20 flex-col">
                <div className="mt-12 flex md:flex-col flex-col-reverse w-full ">
                  <VideoModal videoDetails={webinar?.videos} className={`pt-9 max-w-[800px] flex items-start`} />
                  <div className='post__content w-full  max-w-[800px]'>
                    <SanityPortableText
                      content={webinar?.body}
                      draftMode={draftMode}
                      token={token}
                    />
                  </div>
                </div>
            </div>
              {webinar?.relatedWebinars?.length > 0 && (
              <RelatedFeaturesSection
                title={webinar?.title}
                allPosts={webinar?.relatedWebinars}
              />
            )}
          </Wrapper>
          
        </Section>
        <BannerSubscribeSection />

          
      </Layout>
    </>
  );
};

export default WebinarPage;
