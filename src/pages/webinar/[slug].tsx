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
  const router = useRouter();


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const seoTitle = webinar.seoTitle || webinar.title;
  const seoDescription = webinar.seoDescription || webinar.excerpt;
  const seoKeywords = webinar.seoKeywords || '';
  const seoRobots = webinar.seoRobots || 'index,follow';
  const seoCanonical = webinar.seoCanonical || `https://carestack.com/webinar/${webinar.slug.current}`;
  const jsonLD: any = generateJSONLD(webinar);
  
  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        robots={seoRobots}
        canonical={seoCanonical}
        jsonLD={jsonLD}
        ogImage={urlForImage(webinar?.mainImage)}
        contentType={webinar?.contentType} />
      <Layout >
        <MainImageSection isAuthor={true} post={webinar} />
        <Wrapper>
          <div className="flex  md:flex-row flex-col">
            <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
            <VideoModal videoDetails={webinar?.videoManager} className={`pt-9 max-w-2xl   flex items-start`} />
              <div className='post__content w-full '>
                <SanityPortableText
                  content={webinar?.body}
                  draftMode={draftMode}
                  token={token}
                />
              </div>
            </div>
            <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
              <div className='sticky top-12 flex flex-col gap-12'>
                {webinar?.relatedWebinars.length > 0 && <RelatedFeaturesSection title={webinar?.title} allPosts={webinar?.relatedWebinars} />}
              </div>
            </div>
          </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default WebinarPage;
