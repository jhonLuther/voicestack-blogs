import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Layout from '~/components/Layout';
import AllcontentSection from '~/components/sections/AllcontentSection';
import { getClient } from '~/lib/sanity.client';
import { getArticles, getArticlesCount, getHomeSettings, getTags } from '~/lib/sanity.queries';
import { readToken } from '~/lib/sanity.api';
import { SharedPageProps } from '../../_app';
import { Articles } from '~/interfaces/post';
import siteConfig from '../../../../config/siteConfig';
import React, { useContext, useRef } from 'react';
import Pagination from '~/components/commonSections/Pagination';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';
import { BaseUrlProvider } from '~/components/Context/UrlContext';
import { CustomHead } from '~/utils/customHead';
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext';

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const allArticles: any = await getArticles(client);
  const totalPages = Math.ceil(allArticles.length / siteConfig.pagination.childItemsPerPage);

  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { pageNumber: (i + 2).toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  SharedPageProps & { articles: Articles[]; pageNumber: number; totalPages: number }
> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);


  const pageNumber = Number(context.params?.pageNumber) || 1;
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;
  const skip = (pageNumber - 1) * itemsPerPage;

  const articles: any = await getArticles(client, skip, itemsPerPage);
  const totalArticles = await getArticlesCount(client);
  const totalPages = Math.ceil(totalArticles / itemsPerPage);
  const tags = await getTags(client);
  const homeSettings = await getHomeSettings(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
      pageNumber,
      totalPages,
      tags,
      homeSettings
    },
  };
};

const PaginatedArticlesPage = ({ articles,tags,homeSettings, pageNumber, totalPages }: { articles: Articles[];tags: any;homeSettings: any; pageNumber: number; totalPages: number }) => {
  const router = useRouter();
  const baseUrl = useRef(`/${siteConfig.pageURLs.article}`).current;

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl);
    } else {
      router.push(`${baseUrl}/page/${page}`);
    }
  };

  return (
    <GlobalDataProvider data={tags} featuredTags={homeSettings.featuredTags} >
    <BaseUrlProvider baseUrl={baseUrl}>
      <Layout>
        {articles?.map((e,i) => {
          return <CustomHead props={e} key={i} type="articleExpanded" />
        })}
        <AllcontentSection
          className={'pb-9'}
          allContent={articles}
          cardType="left-image-card"
          itemsPerPage={siteConfig.pagination.childItemsPerPage}
          contentType='article'
          showCount={true}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={pageNumber}
          onPageChange={handlePageChange}
          enablePageSlug={true}
          content={articles}
          type='custom'
        />
        <BannerSubscribeSection />
      </Layout>
    </BaseUrlProvider>
    </GlobalDataProvider>
  )
};

export default PaginatedArticlesPage;