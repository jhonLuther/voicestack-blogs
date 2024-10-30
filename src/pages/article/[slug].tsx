import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { articleSlugsQuery, getArticle, getArticles, getTagRelatedContents } from '~/lib/sanity.queries';
import { Articles } from '~/interfaces/post';
import Wrapper from '~/layout/Wrapper';
import { readToken } from '~/lib/sanity.api';
import { urlForImage } from '~/lib/sanity.image';
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor';
import Layout from '~/components/Layout';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import SEOHead from '~/layout/SeoHead';
import { generateJSONLD } from '~/utils/generateJSONLD';
import { Toc } from '~/contentUtils/sanity-toc';
import AuthorInfo from '~/components/commonSections/AuthorInfo';
import ShareableLinks from '~/components/commonSections/ShareableLinks';
import {CustomHead,generateMetaData} from '~/utils/customHead';
import Section from '~/components/Section';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';

interface Props {
  articles: Articles;
  draftMode: boolean;
  token: string;
  relatedContents: any
}


export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(articleSlugsQuery);

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
  const articles = await getArticle(client, params.slug as string);
  const limitedArticles: any = await getArticles(client, 0, 4);
  const tagIds = articles.tags?.map((tag: any) => tag?._id) || []
  const relatedContents = await getTagRelatedContents(client, tagIds,articles.contentType);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
      relatedContents
      
    },
  };
};

const ArticlePage = ({ articles,relatedContents, draftMode, token }: Props) => {

  if (!articles) {
    return
  }
 
  const seoTitle = articles?.seoTitle || articles?.title;
  const seoDescription = articles.seoDescription || articles?.excerpt;
  const seoKeywords = articles.seoKeywords || '';
  const seoRobots = articles.seoRobots || 'index,follow';
  const seoCanonical = articles.seoCanonical || `https://carestack.com/articles/${articles.slug.current}`;
  const jsonLD: any = generateJSONLD(articles);

  

  return (
    <>
      <CustomHead props={articles} type="articleExpanded" />
      { generateMetaData(articles)}
      
      <Layout >
        <MainImageSection enableDate={true} post={articles} />
        <Section className='justify-center'>
          <Wrapper className={`flex-col`} >
            <div className="flex  md:flex-row flex-col">
              <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
                <div className='post__content w-full '>
                  <SanityPortableText
                    content={articles?.body}
                    draftMode={draftMode}
                    token={token}
                  />
                </div>
              </div>
              <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
                <div className='sticky top-12 flex flex-col gap-12'>
                  <Toc headings={articles?.headings} title="Contents" />
                  {articles?.author &&
                    <div className=''>
                      <AuthorInfo contentType={articles?.contentType} author={articles?.author} />
                    </div>
                  }
                  <ShareableLinks props={articles?.title} />
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
    </>
  );
};

export default ArticlePage;
