import { GetStaticProps, GetStaticPaths } from 'next'
import { getClient } from '~/lib/sanity.client'
import {
  getAllPodcastSlugs,
  getCategories,
  getHomeSettings,
  getPodcast,
  getTagRelatedContents,
  getTags,
  podcastSlugsQuery,
} from '~/lib/sanity.queries'
import { Podcasts } from '~/interfaces/post'
import Wrapper from '~/layout/Wrapper'
import { readToken } from '~/lib/sanity.api'
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor'
import Layout from '~/components/Layout'
import MainImageSection from '~/components/MainImageSection'
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection'
import { generateJSONLD } from '~/utils/generateJSONLD'
import SEOHead from '~/layout/SeoHead'
import { urlForImage } from '~/lib/sanity.image'
import AuthorInfo from '~/components/commonSections/AuthorInfo'
import ShareableLinks from '~/components/commonSections/ShareableLinks'
import PodcastNavigator from '~/contentUtils/PodcastNavigator'
import Section from '~/components/Section'
import { CustomHead, generateMetaData } from '~/utils/customHead'
import SidebarTitle from '~/components/typography/SidebarTitle'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'
import siteConfig from 'config/siteConfig'
import RelatedTag from '~/components/commonSections/RelatedTag'

interface Props {
  podcast: Podcasts
  draftMode: boolean
  token: string
  allSlugs?: any
  previous?: any
  next?: any
  totalPodcasts?: any
  currentNumber?: any
  relatedContents?: any
  tags?: any
  homeSettings?: any
  categories?: any
}

export const getStaticPaths: GetStaticPaths = async () => {  
  const client = getClient()

  const locales = siteConfig.locales
  const slugs = await Promise.all(
    locales.map(async (locale) => {
      const data = await client.fetch(podcastSlugsQuery, { locale });
      return data as string[]; 
    })
  );

  const paths = slugs.flat().map((item:any) => ({
    params: { slug:item.slug, locale:item.locale },
  }));

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({
  draftMode = false,
  params = {},
}) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const region = params.locale as string
  const podcast = await getPodcast(client, params.slug as string,region)
  if (!podcast) {
    return {
      notFound: true,
      revalidate: 60,
    }
  }
  const currentSlug: any = params?.slug
  const { current, totalPodcasts, previous, next } = await getAllPodcastSlugs(
    client,
    currentSlug,
    region
  )

  const tagIds = podcast.tags?.map((tag: any) => tag?._id) || []
  const relatedContents = await getTagRelatedContents(
    client,
    params.slug as string,
    tagIds,
    podcast.contentType,
    undefined,
    region
  )
  const tags = await getTags(client)
  const homeSettings = await getHomeSettings(client,region)
  const categories = await getCategories(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      podcast,
      previous,
      next,
      currentNumber: current.number,
      totalPodcasts,
      relatedContents,
      tags,
      homeSettings,
      categories
    },
  }
}

const PodcastPage = ({
  podcast,
  relatedContents,
  previous,
  next,
  currentNumber,
  homeSettings,
  totalPodcasts,
  draftMode,
  token,
  categories
}: Props) => {
  if (!podcast) {
    return <div>Podcast not found</div>
  }

  const prodUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'https://blog.carestack.com/'

  const seoTitle = podcast.seoTitle || podcast.title
  const seoDescription = podcast.seoDescription || podcast.excerpt
  const seoKeywords = podcast.seoKeywords || ''
  const seoRobots = podcast.seoRobots || 'index,follow'
  const seoCanonical =
    podcast.seoCanonical ||
    `${prodUrl}/${siteConfig.pageURLs.podcast}/${podcast.slug.current}`
  const jsonLD: any = generateJSONLD(podcast)

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
        contentType={podcast?.contentType}
      />
      {generateMetaData(podcast,seoCanonical)}
      <GlobalDataProvider data={categories} featuredTags={homeSettings?.featuredTags}>
        <Layout>
          <MainImageSection
            isAudio={true}
            enableDate={true}
            post={podcast}
            contentType={podcast?.contentType}
          />
          <PodcastNavigator
            currentNumber={currentNumber}
            totalPodcasts={totalPodcasts}
            nextSlug={next ? next : '/'}
            prevSlug={previous ? previous : '/'}
          />
          <Section className="justify-center">
            <Wrapper className={'flex-col'}>
              <div className="flex md:flex-row flex-col gap-6 md:gap-12 justify-between">
                <div className="md:mt-12 flex-1 flex md:flex-col flex-col-reverse md:w-2/3 w-full md:max-w-[710px]">
                  <div className="post__content w-full ">
                    {podcast.htmlCode && (
                      <div
                        dangerouslySetInnerHTML={{ __html: podcast.htmlCode }}
                      ></div>
                    )}
                    <SanityPortableText
                      content={podcast?.body}
                      draftMode={draftMode}
                      token={token}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-8 md:mt-12 bg-red relative md:w-1/3 md:max-w-[410px] w-full">
                  <div className="sticky top-24 flex flex-col gap-8">
                    {podcast.author && podcast.author?.length > 0 && (
                      <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                          {podcast.author &&
                            podcast.author?.length > 0 &&
                            podcast.author.map((author: any, i) => {
                              return (
                                <AuthorInfo
                                  key={author._id || i}
                                  author={[author]}
                                />
                              )
                            })}
                        </div>
                      </div>
                    )}
                    <ShareableLinks props={podcast?.title} />
                  </div>
                </div>
              </div>
              {podcast?.tags && <RelatedTag tags={podcast?.tags}/>}
            </Wrapper>
          </Section>
          {relatedContents.length > 0 && (
            <RelatedFeaturesSection
              contentType={podcast?.contentType}
              allPosts={relatedContents}
            />
          )}
        </Layout>
      </GlobalDataProvider>
    </>
  )
}

export default PodcastPage
