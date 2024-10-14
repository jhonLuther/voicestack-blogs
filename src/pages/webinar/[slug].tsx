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
import VideoModal from '~/components/commonSections/VideoModal';

interface Props {
  webinar: Podcasts;
  allWebinars: any;
  draftMode: boolean;
  token: string;
}


export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(webinarSlugsQuery);

  console.log(slugs, 'slugs podcast');

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

  console.log(webinar, 'slugxx ');

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (

    <Layout >
      <MainImageSection isAuthor={true} post={webinar} />
      <Wrapper>
      <VideoModal className={`pt-9 max-w-xl flex items-start`} platform={`${webinar.platform ? webinar.platform : 'Youtube'}`} link={`${webinar.videoId ? webinar.videoId : '650959265'}`}/>
        <div className="flex  md:flex-row flex-col">
          <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
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
  );
};

export default WebinarPage;
