import { GetStaticProps } from 'next';
import { Articles } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getArticles, getArticlesCount, getHomeSettings, getTags } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';
import Layout from '~/components/Layout';
import Wrapper from '~/layout/Wrapper';
import LatestBlogs from '~/components/sections/LatestBlogSection';
import AllcontentSection from '~/components/sections/AllcontentSection';
import { useRouter } from 'next/router';
import siteConfig from '../../../config/siteConfig';
import React, { useRef } from 'react';
import Pagination from '~/components/commonSections/Pagination';
import {customMetaTag, CustomHead} from '~/utils/customHead';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';
import { BaseUrlProvider } from '~/components/Context/UrlContext';
import TagSelect from '~/contentUtils/TagSelector';
import { mergeAndRemoveDuplicates } from '~/utils/common';

export const getStaticProps: GetStaticProps<SharedPageProps & { articles: Articles[]; totalPages: number }> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;

  const articles: any = await getArticles(client, 0, itemsPerPage);
  const latestArticles: any = await getArticles(client, 0, 5);
  const totalArticles = await getArticlesCount(client);
  const totalPages = Math.ceil(totalArticles / itemsPerPage);
  const tags = await getTags(client);
  const homeSettings = await getHomeSettings(client);


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
      latestArticles,
      totalPages,
      tags,
      homeSettings
    },
  };
};

const ArticlesPage = ({ articles,latestArticles, totalPages,tags,homeSettings }: { articles: Articles[];latestArticles: Articles[]; totalPages: number,tags: any,homeSettings?: any }) => {
  const router = useRouter();
  const baseUrl = useRef(`/${siteConfig.pageURLs.article}`).current;

  const featuredArticles = homeSettings?.featuredArticle || [];

  const latestContents = mergeAndRemoveDuplicates(featuredArticles,latestArticles);
  
  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl);
    } else {
      router.push(`${baseUrl}/page/${page}`);
    }
  };

  return (
    <BaseUrlProvider baseUrl={baseUrl}>
    <Layout>
      <CustomHead props={articles} type="articleExpanded"/>
    <TagSelect
				tags={tags}
				tagLimit={7}
				showTags={true}
			/>
      {customMetaTag('article')}
      <LatestBlogs  className={'pt-11 pr-9 pb-16 pl-9'} reverse={true} contents={latestContents} />
      {articles?.length
        ? articles.map((e, i) => {
            return (<CustomHead props={e} type="caseStudy" key={i} />)
          })
        : null}
        <AllcontentSection
          className={'pb-9'}
          allContent={articles}
          hideHeader={true}
          cardType="left-image-card"
          itemsPerPage={siteConfig.pagination.childItemsPerPage}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={1}
          onPageChange={handlePageChange}
          enablePageSlug={true}
          content={articles}
        />
        <BannerSubscribeSection />
    </Layout>
    </BaseUrlProvider>
  )
};

export default ArticlesPage;