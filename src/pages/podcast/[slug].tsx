import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { getAllPodcastSlugs, getPodcast, getPodcasts, getRelatedContents, podcastSlugsQuery } from '~/lib/sanity.queries';
import { Podcasts } from '~/interfaces/post';
import Wrapper from '~/layout/Wrapper';
import { readToken } from '~/lib/sanity.api';
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor';
import Layout from '~/components/Layout';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import { generateJSONLD } from '~/utils/generateJSONLD';
import SEOHead from '~/layout/SeoHead';
import { urlForImage } from '~/lib/sanity.image';
import { Toc } from '~/contentUtils/sanity-toc';
import AuthorInfo from '~/components/commonSections/AuthorInfo';
import ShareableLinks from '~/components/commonSections/ShareableLinks';

interface Props {
  podcast: Podcasts;
  draftMode: boolean;
  token: string;
  allSlugs?: any;
  previous?:any;
  next?:any;
}


export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(podcastSlugsQuery);
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
  const currentSlug:any = params?.slug;
  
  // const allSlugs = await getAllPodcastSlugs(client, currentSlug);

  const { current, previous, next } = await getAllPodcastSlugs(client, currentSlug);

  



  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      podcast,
      previous ,
      next,
    },
  };
};

const PodcastPage = ({ podcast,previous,next, draftMode, token }: Props) => {
  if(!podcast) {
    return <div>Podcast not found</div>
  }
   console.log(previous,next);


  const seoTitle = podcast.seoTitle || podcast.title;
  const seoDescription = podcast.seoDescription || podcast.excerpt;
  const seoKeywords = podcast.seoKeywords || '';
  const seoRobots = podcast.seoRobots || 'index,follow';
  const seoCanonical = podcast.seoCanonical || `https://carestack.com/podcast/${podcast.slug.current}`;
  const jsonLD: any = generateJSONLD(podcast);


  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        robots={seoRobots}
        canonical={seoCanonical}
        jsonLD={jsonLD}
        ogImage={urlForImage(podcast?.mainImage)}
        contentType={podcast?.contentType} />
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
              <ShareableLinks props={podcast?.title} />
              </div>
            </div>
          </div>
          {podcast?.relatedPodcasts.length > 0 && <RelatedFeaturesSection title={podcast?.title} allPosts={podcast?.relatedPodcasts} />}
        </Wrapper>
      </Layout>
    </>
  );
};

export default PodcastPage;
