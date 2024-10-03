import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { getPodcast, podcastSlugsQuery } from '~/lib/sanity.queries';
import { Podcasts } from '~/interfaces/post';
import Wrapper from '~/components/commonSections/Wrapper';
import Image from 'next/image';
import { readToken } from '~/lib/sanity.api';
import { urlForImage } from '~/lib/sanity.image';
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor';

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

  console.log(podcast, 'podcastslug', params);

  if (!podcast) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      podcast,
    },
    revalidate: 60,  // only include revalidate when the page is found
  };
}

// Testimonial page component
const PodcastPage = ({ podcast, draftMode, token }: Props) => {
  const router = useRouter();

  console.log(podcast, 'slugxx ');

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <section className="flex flex-col mx-auto w-full h-full items-center">
        <div className="flex flex-col items-center gap-4">
          {podcast.mainImage && (
            <Image
              src={urlForImage(podcast.mainImage).width(500).height(600).url()}
              alt={`podcast.mainImageName`}
              width={300}
              height={300}
            />
          )}
          <h1 className="text-2xl font-semibold">{podcast.title}</h1>
          <p className="text-lg font-normal">{podcast.excerpt}</p>
          <SanityPortableText
            content={podcast.body}
            draftMode={draftMode}
            token={token}
          />
          {podcast.htmlCode && (
            <div
              className="video-embed w-full"
              dangerouslySetInnerHTML={{ __html: podcast.htmlCode }}
            />
          )}
        </div>
      </section>
    </Wrapper>
  );
};

export default PodcastPage;
