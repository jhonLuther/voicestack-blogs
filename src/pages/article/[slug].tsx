import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { getClient } from '~/lib/sanity.client'
import {
  articleSlugsQuery,
  getArticle,
  getArticles,
  getHomeSettings,
  getTagRelatedContents,
  getTags,
} from '~/lib/sanity.queries'
import { Articles } from '~/interfaces/post'
import Wrapper from '~/layout/Wrapper'
import { readToken } from '~/lib/sanity.api'
import { urlForImage } from '~/lib/sanity.image'
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor'
import Layout from '~/components/Layout'
import MainImageSection from '~/components/MainImageSection'
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection'
import { Toc } from '~/contentUtils/sanity-toc'
import AuthorInfo from '~/components/commonSections/AuthorInfo'
import ShareableLinks from '~/components/commonSections/ShareableLinks'
import { CustomHead, generateMetaData } from '~/utils/customHead'
import Section from '~/components/Section'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'
import { generateJSONLD } from '~/utils/generateJSONLD'
import SEOHead from '~/layout/SeoHead'
import siteConfig from 'config/siteConfig'

interface Props {
  articles: Articles
  draftMode: boolean
  token: string
  relatedContents: any
  tags: any
  homeSettings: any
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(articleSlugsQuery)

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
  const articles = await getArticle(client, params.slug as string);
  if (!articles) {
    return {
      notFound: true, // Triggers 404
    };
  }
  const tagIds = articles?.tags?.map((tag: any) => tag?._id) || []
  const relatedContents = await getTagRelatedContents(
    client,
    params.slug as string,
    tagIds,
    articles.contentType,
  )
  const tags = await getTags(client)
  const homeSettings = await getHomeSettings(client)

  

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
      relatedContents,
      tags,
      homeSettings,
    },
  }
}

const ArticlePage = ({
  articles,
  relatedContents,
  tags,
  homeSettings,
  draftMode,
  token,
}: Props) => {
  if (!articles) {
    return
  }
  const prodUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'https://blog.carestack.com'
  const seoTitle = articles.seoTitle || articles.title
  const seoDescription = articles.seoDescription || articles.excerpt
  const seoKeywords = articles.seoKeywords || ''
  const seoRobots = articles.seoRobots || 'index,follow'
  const seoCanonical =
    articles.seoCanonical ||
    `${prodUrl}/${siteConfig.pageURLs.article}/${articles.slug.current}`
  const jsonLD: any = generateJSONLD(articles)

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
          contentType={articles?.contentType}
        />
        <CustomHead props={articles} type="articleExpanded" />
        {generateMetaData(articles)}

        <Layout>
          <MainImageSection enableDate={true} post={articles} />
          <Section className="justify-center">
            <Wrapper className={`flex-col`}>
              <div className="flex md:flex-row flex-col-reverse gap-6 md:gap-12 justify-between">
                <div className="md:mt-12 flex-1 flex md:flex-col flex-col-reverse md:w-2/3 w-full md:max-w-[710px] ">
                  <div className="post__content w-full ">
                    <SanityPortableText
                      content={articles?.body}
                      draftMode={draftMode}
                      token={token}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-8 md:mt-12 bg-red relative md:w-1/3 md:max-w-[410px] w-full">
                  <div className="sticky top-24 flex flex-col-reverse md:flex-col gap-8 md:overflow-auto md:max-h-[83vh]">
                    <Toc headings={articles?.headings} title="Contents" />
                    <div className='flex-col gap-8 flex'>
                      {articles?.author && (
                        <div>
                          <AuthorInfo author={articles?.author} />
                        </div>
                      )}
                      <ShareableLinks props={articles?.title} />
                    </div>
                  </div>
                </div>
              </div>
            </Wrapper>
          </Section>
          {relatedContents.length > 0 && (
            <RelatedFeaturesSection
              contentType={articles?.contentType}
              allPosts={relatedContents}
            />
          )}
          <BannerSubscribeSection />
        </Layout>
      </GlobalDataProvider>
    </>
  )
}

export default ArticlePage
