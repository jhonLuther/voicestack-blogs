import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { ebookSlugsQuery, getEbook, getEbooks, getPodcast, getPodcasts, getRelatedContents, getTagRelatedContents, getWebinar, getWebinars, podcastSlugsQuery, webinarSlugsQuery } from '~/lib/sanity.queries';
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
import {CustomHead, generateMetaData} from '~/utils/customHead';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';
import AuthorInfo from '~/components/commonSections/AuthorInfo';
import SidebarTitle from '~/components/typography/SidebarTitle';
import ShareableLinks from '~/components/commonSections/ShareableLinks';

interface Props {
  ebook: Ebooks;
  limitedEbooks?:any;
  draftMode: boolean;
  token: string;
  relatedContents: any;
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
  const tagIds = ebook.tags?.map((tag: any) => tag?._id) || []
  const relatedContents = await getTagRelatedContents(client, tagIds,ebook?.contentType);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      ebook,
      relatedContents
    },
  };
};

const EbookPage = ({ ebook,relatedContents, draftMode, token }: Props) => {
  

  const seoTitle = ebook.seoTitle || ebook.title;
  const seoDescription = ebook.seoDescription || ebook.excerpt;
  const seoKeywords = ebook.seoKeywords || '';
  const seoRobots = ebook.seoRobots || 'index,follow';
  const seoCanonical = ebook.seoCanonical || `https://carestack.com/ebook/${ebook.slug.current}`;
  const jsonLD: any = generateJSONLD(ebook);


  return (
    <>
    <CustomHead props ={ebook} type='eBook'/>
    {generateMetaData(ebook)}
      <Layout >
        <MainImageSection  post={ebook} enableDate={true}/>
        <Section className='justify-center flex-col'>
          <div className="flex md:flex-row flex-col justify-center gap-20">
            <div className="flex md:flex-col flex-col-reverse max-w-[710px] w-full ">
            {/* <EbookCard ebook={ebook}/> */}
              <div className='post__content w-full '>
                
                {/* <h2 className="text-3xl font-bold mb-4">{ebook?.title}</h2>
                <p className="text-lg mb-6">{ebook?.excerpt}</p> */}
                <SanityPortableText
                  content={ebook?.body}
                  draftMode={draftMode}
                  token={token}
                />
              </div>
            </div>
            <div className='flex-1 flex flex-col gap-12 bg-red relative max-w-[410px] w-full'>
              <div className='sticky top-12 flex flex-col gap-8'>
                <>
                  <SidebarTitle className='border-b border-zinc-200 pb-3'>{`To Know More About`}</SidebarTitle>
                  <div className='flex flex-col gap-6'>
                    <DownloadEbook ebook={ebook} />
                  </div>
                </>
                <ShareableLinks props={ebook?.title} />
              </div>
            </div>
          </div>
        </Section>
        {relatedContents &&relatedContents.length > 0 && (
          <RelatedFeaturesSection
            contentType={ebook?.contentType}
            allPosts={relatedContents}
          />
        )}
      </Layout>
    </>
  );
};

export default EbookPage;
