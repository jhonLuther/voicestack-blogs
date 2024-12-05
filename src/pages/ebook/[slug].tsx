import { GetStaticProps, GetStaticPaths } from 'next'
import { getClient } from '~/lib/sanity.client'
import {
  ebookSlugsQuery,
  getEbook,
  getHomeSettings,
  getTagRelatedContents,
  getTags,
} from '~/lib/sanity.queries'
import { Ebooks } from '~/interfaces/post'
import Wrapper from '~/layout/Wrapper'
import { readToken } from '~/lib/sanity.api'
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor'
import Layout from '~/components/Layout'
import MainImageSection from '~/components/MainImageSection'
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection'
import DownloadEbook from '~/contentUtils/EbookDownloader'
import SEOHead from '~/layout/SeoHead'
import { generateJSONLD } from '~/utils/generateJSONLD'
import EbookCard from '~/components/uiBlocks/EbookCard'
import Section from '~/components/Section'
import { CustomHead, generateMetaData } from '~/utils/customHead'
import SidebarTitle from '~/components/typography/SidebarTitle'
import ShareableLinks from '~/components/commonSections/ShareableLinks'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'
import siteConfig from 'config/siteConfig'

interface Props {
  ebook: Ebooks
  limitedEbooks?: any
  draftMode: boolean
  token: string
  relatedContents: any
  tags: any
  homeSettings: any
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(ebookSlugsQuery)
  const paths =
    slugs?.map((slug: string) => {
      return { params: { slug } }
    }) || []

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
  const ebook = await getEbook(client, params.slug as string);
  if (!ebook) {
    return {
      notFound: true,
      revalidate: 60,
    }
  }
  const tagIds = ebook.tags?.map((tag: any) => tag?._id) || []
  const relatedContents = await getTagRelatedContents(
    client,
    params.slug as string,
    tagIds,
    ebook?.contentType,
  )
  const tags = await getTags(client)
  const homeSettings = await getHomeSettings(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      ebook,
      relatedContents,
      tags,
      homeSettings,
    },
  }
}

const EbookPage = ({
  ebook,
  relatedContents,
  tags,
  homeSettings,
  draftMode,
  token,
}: Props) => {
  if(!ebook) return null
  const prodUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'https://blog.carestack.com'

  const seoTitle = ebook.seoTitle || ebook.title
  const seoDescription = ebook.seoDescription || ebook.excerpt
  const seoKeywords = ebook.seoKeywords || ''
  const seoRobots = ebook.seoRobots || 'index,follow'
  const seoCanonical =
    ebook.seoCanonical ||
    `${prodUrl}/${siteConfig.pageURLs.ebook}/${ebook.slug.current}`
  const jsonLD: any = generateJSONLD(ebook)

  return (
    <>
      <GlobalDataProvider data={tags} featuredTags={homeSettings.featuredTags}>
        <SEOHead
          title={seoTitle}
          description={seoDescription}
          keywords={seoKeywords}
          robots={seoRobots}
          canonical={seoCanonical}
          jsonLD={jsonLD}
          contentType={ebook?.contentType}
        />
        
        <CustomHead props={ebook} type="articleExpanded" />
        {generateMetaData(ebook,seoCanonical)}
        <Layout>
          <MainImageSection post={ebook} enableDate={true} />
          <Section className="flex justify-center">
            <Wrapper className="flex-col">
              <div className="flex md:flex-row flex-col gap-6 md:gap-12 justify-between">
                <div className="md:mt-12 flex-1 flex md:flex-col flex-col-reverse md:w-2/3 w-full md:max-w-[710px]">
                  <div className="post__content w-full ">
                    <SanityPortableText
                      content={ebook?.body}
                      draftMode={draftMode}
                      token={token}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-8 md:mt-12 bg-red relative md:w-1/3 md:max-w-[410px] w-full">
                  <div className="sticky top-24 flex flex-col gap-8">
                    <>
                      <SidebarTitle className="border-b border-zinc-200 pb-3">{`To Know More About`}</SidebarTitle>
                      <div className="flex flex-col gap-6">
                        <DownloadEbook ebook={ebook} />
                      </div>
                    </>
                    <ShareableLinks props={ebook?.title} />
                  </div>
                </div>
              </div>
            </Wrapper>
          </Section>
          {relatedContents && relatedContents.length > 0 && (
            <RelatedFeaturesSection
              contentType={ebook?.contentType}
              allPosts={relatedContents}
            />
          )}
        </Layout>
      </GlobalDataProvider>
    </>
  )
}

export default EbookPage
