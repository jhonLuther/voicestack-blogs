import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { ebookSlugsQuery, getEbook, getPodcast, getPodcasts, getRelatedContents, getWebinar, getWebinars, podcastSlugsQuery, webinarSlugsQuery } from '~/lib/sanity.queries';
import { Ebooks, Podcasts } from '~/interfaces/post';
import Wrapper from '~/layout/Wrapper';
import Image from 'next/image';
import { readToken } from '~/lib/sanity.api';
import { urlForImage } from '~/lib/sanity.image';
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor';
import Layout from '~/components/Layout';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import DownloadEbook from '~/contentUtils/EbookDownloader';
import SEOHead from '~/layout/SeoHead';
import { generateJSONLD } from '~/utils/generateJSONLD';

interface Props {
  ebook: Ebooks;
  draftMode: boolean;
  token: string;
}


export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(ebookSlugsQuery);

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
  const ebook = await getEbook(client, params.slug as string);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      ebook,
    },
  };
};

const EbookPage = ({ ebook, draftMode, token }: Props) => {
  const router = useRouter();

  console.log(ebook, 'slugxx ');

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const seoTitle = ebook.seoTitle || ebook.title;
  const seoDescription = ebook.seoDescription || ebook.excerpt;
  const seoKeywords = ebook.seoKeywords || '';
  const seoRobots = ebook.seoRobots || 'index,follow';
  const seoCanonical = ebook.seoCanonical || `https://carestack.com/ebook/${ebook.slug.current}`;
  const jsonLD: any = generateJSONLD(ebook);


  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        robots={seoRobots}
        canonical={seoCanonical}
        jsonLD={jsonLD}
        contentType={ebook?.contentType} />
      <Layout >
        <MainImageSection isAuthor={true} post={ebook} />
        <Wrapper>
          <div className="flex  md:flex-row flex-col">
            <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
              <div className='post__content w-full '>
                <DownloadEbook ebook={ebook} />
                <SanityPortableText
                  content={ebook?.body}
                  draftMode={draftMode}
                  token={token}
                />
              </div>
            </div>
            <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
              <div className='sticky top-12 flex flex-col gap-12'>
                {ebook?.relatedEbooks.length > 0 && <RelatedFeaturesSection title={ebook?.title} allPosts={ebook?.relatedEbooks} />}
              </div>
            </div>
          </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default EbookPage;
