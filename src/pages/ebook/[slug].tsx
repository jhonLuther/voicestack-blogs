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
import EbookCard from '~/components/uiBlocks/EbookCard';
import Section from '~/components/Section';

interface Props {
  ebook: Ebooks;
  draftMode: boolean;
  token: string;
}


export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(ebookSlugsQuery);
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
        ogImage={urlForImage(ebook?.mainImage)}
        contentType={ebook?.contentType} />
      <Layout >
        <Section className='justify-center'>
          <div className="flex  md:flex-row flex-col justify-between gap-20">
            <div className="mt-12 flex md:flex-col flex-col-reverse md:max-w-xl w-full ">
            <EbookCard ebook={ebook}/>
            </div>
            <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:max-w-lg w-full'>
              <div className='flex flex-col gap-12'>
              <DownloadEbook ebook={ebook} />
              </div>
            </div>
          </div>
        </Section>
      </Layout>
    </>
  );
};

export default EbookPage;
