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
import AuthorInfo from '~/components/commonSections/AuthorInfo';
import ShareableLinks from '~/components/commonSections/ShareableLinks';
import PodcastNavigator from '~/contentUtils/PodcastNavigator';
import Section from '~/components/Section';
import SidebarTitle from '~/components/typography/SidebarTitle';

interface Props {
  podcast: Podcasts;
  draftMode: boolean;
  token: string;
  allSlugs?: any;
  previous?: any;
  next?: any;
  totalPodcasts?: any;
  currentNumber?: any;
  limitedPodcasts?: any
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
  const limitedPodcasts: any = await getPodcasts(client, 0, 4);
  const currentSlug: any = params?.slug;
  const { current, totalPodcasts, previous, next } = await getAllPodcastSlugs(client, currentSlug);


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      podcast,
      previous,
      next,
      currentNumber: current.number,
      totalPodcasts,
      limitedPodcasts
    },
  };
};

const PodcastPage = ({ podcast,limitedPodcasts, previous, next, currentNumber, totalPodcasts, draftMode, token }: Props) => {

  if (!podcast) {
    return <div>Podcast not found</div>
  }

  const seoTitle = podcast.seoTitle || podcast.title;
  const seoDescription = podcast.seoDescription || podcast.excerpt;
  const seoKeywords = podcast.seoKeywords || '';
  const seoRobots = podcast.seoRobots || 'index,follow';
  const seoCanonical = podcast.seoCanonical || `https://carestack.com/podcast/${podcast.slug.current}`;
  const jsonLD: any = generateJSONLD(podcast);

  // console.log(podcast,'ALL PODCAST');

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
        <MainImageSection isAudio={true} enableDate={true} post={podcast} />
        <PodcastNavigator currentNumber={currentNumber} totalPodcasts={totalPodcasts} nextSlug={next ? next : '/'} prevSlug={previous ? previous : '/'} />
        <Section className='justify-center'>
          <Wrapper className={'flex-col'}>
            <div className="flex  md:flex-row flex-col">
              <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
                <div className='post__content w-full '>
                {
                  podcast.htmlCode &&
                  (
                    <div dangerouslySetInnerHTML={{ __html: podcast.htmlCode }}>
                    </div>
                  )
                }
                  <SanityPortableText
                    content={podcast?.body}
                    draftMode={draftMode}
                    token={token}
                  />
                </div>
              </div>
              <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
                <div className='sticky top-12 flex flex-col gap-8'>
                  {podcast.author  && podcast.author?.length > 0 &&  
                  <div className='flex flex-col gap-8'>
                  <SidebarTitle className='border-b border-zinc-200 pb-3'>{`Speakers`}</SidebarTitle>
                  <div className='flex flex-col gap-6'>
                  {podcast.author && podcast.author?.length > 0 && 
                    podcast.author.map((author: any,i) => {
                      return(
                        <AuthorInfo key={author._id || i} contentType={'podcast'} author={[author]} />
                      )
                    })
                  }
                  </div>
      
                  </div>}
                  <ShareableLinks props={podcast?.title} />
                </div>
              </div>
            </div>
          </Wrapper>
        </Section>
        {podcast?.relatedPodcasts?.length > 0 && (
          <RelatedFeaturesSection
            contentType={podcast?.contentType}
            allPosts={[
              ...(Array.isArray(podcast?.relatedPodcasts) ? podcast?.relatedPodcasts : []),
              ...(Array.isArray(limitedPodcasts) ? limitedPodcasts : [])
            ].slice(0, 4)}
          />
        )}
      </Layout>
    </>
  );
};

export default PodcastPage;
