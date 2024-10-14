import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { getPodcast, getPodcasts, getRelatedContents, podcastSlugsQuery } from '~/lib/sanity.queries';
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

interface Props {
  podcast: Podcasts;
  draftMode: boolean;
  token: string;
}


export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(podcastSlugsQuery);

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
  const podcast = await getPodcast(client, params.slug as string);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      podcast,
    },
  };
};

const PodcastPage = ({ podcast, draftMode, token }: Props) => {
  const router = useRouter();

  console.log(podcast, 'slugxx ');

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (

    <Layout >
      <MainImageSection isAuthor={true} post={podcast} />
      <Wrapper>
      {
        podcast.htmlCode &&
        (
          <div className='pt-9' dangerouslySetInnerHTML={{ __html: podcast.htmlCode }}>
          </div>
        )
      }
      </Wrapper>

      <Wrapper>
        <div className="flex  md:flex-row flex-col">
          <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
            <div className='post__content w-full '>
              <SanityPortableText
                content={podcast?.body}
                draftMode={draftMode}
                token={token}
              />
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
            <div className='sticky top-12 flex flex-col gap-12'>
              {podcast?.relatedPodcasts.length > 0 && <RelatedFeaturesSection title={podcast?.title} allPosts={podcast?.relatedPodcasts} />}
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default PodcastPage;
