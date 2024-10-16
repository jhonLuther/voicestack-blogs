import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { articleSlugsQuery, getArticle, getPodcast, getPodcasts, getRelatedContents, podcastSlugsQuery } from '~/lib/sanity.queries';
import { Articles, Podcasts } from '~/interfaces/post';
import Wrapper from '~/layout/Wrapper';
import Image from 'next/image';
import { readToken } from '~/lib/sanity.api';
import { urlForImage } from '~/lib/sanity.image';
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor';
import Layout from '~/components/Layout';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import AllcontentSection from '~/components/sections/AllcontentSection';
import PracticeProfile from '~/contentUtils/PracticeProfile';
import SEOHead from '~/layout/SeoHead';
import { generateJSONLD } from '~/utils/generateJSONLD';

interface Props {
  articles: Articles;
  draftMode: boolean;
  token: string;
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
  

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
    },
  };
};

const ArticlePage = ({ articles, draftMode, token }: Props) => {
  
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const seoTitle = articles?.seoTitle || articles.title;
  const seoDescription = articles.seoDescription || articles.excerpt;
  const seoKeywords = articles.seoKeywords || '';
  const seoRobots = articles.seoRobots || 'index,follow';
  const seoCanonical = articles.seoCanonical || `https://carestack.com/articles/${articles.slug.current}`;
  const jsonLD: any = generateJSONLD(articles);


  return (
    <>
    <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        robots={seoRobots}
        canonical={seoCanonical}
        jsonLD={jsonLD}
        ogImage={urlForImage(articles?.mainImage)}
        contentType={articles?.contentType} />
    <Layout >
      <MainImageSection isAuthor={true} post={articles?.article} />
      <Wrapper>
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
              {articles?.relatedArticles?.length > 0 && <RelatedFeaturesSection title={articles?.title} allPosts={articles?.relatedArticles} />}
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
    </>
  );
};

export default ArticlePage;
