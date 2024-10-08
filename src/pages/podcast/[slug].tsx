import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { getPodcast, getPodcasts, getRelatedContents, podcastSlugsQuery } from '~/lib/sanity.queries';
import { Podcasts } from '~/interfaces/post';
import Wrapper from '~/components/commonSections/Wrapper';
import Image from 'next/image';
import { readToken } from '~/lib/sanity.api';
import { urlForImage } from '~/lib/sanity.image';
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor';
import Container from '~/components/Container';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import AllcontentSection from '~/components/sections/AllcontentSection';
import PracticeProfile from '~/contentUtils/PracticeProfile';

interface Props {
  podcast: Podcasts;
  allPodcasts: any;
  draftMode: boolean;
  token: string;
  relatedContents: any
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
  const relatedContents = await getRelatedContents(client, params.slug as string, 3 as number);
  const allPodcasts = await getPodcasts(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      podcast,
      relatedContents,
      allPodcasts,
    },
  };
};

const PodcastPage = ({ podcast,relatedContents, draftMode, token }: Props) => {
  const router = useRouter();

  console.log(podcast, 'slugxx ');

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (

    <Container >
      <MainImageSection isAuthor={true} post={podcast} />
      <Wrapper>
        <div className="flex  md:flex-row flex-col">
          <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
            <div className='post__content w-full '>
              {podcast && podcast?.practiceName ? <PracticeProfile contents={podcast}/> : ""}
              <SanityPortableText
                content={podcast?.body}
                draftMode={draftMode}
                token={token}
              />
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
            <div className='sticky top-12 flex flex-col gap-12'>
              <RelatedFeaturesSection title={podcast?.title} allPosts={relatedContents} />
            </div>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
};

export default PodcastPage;
