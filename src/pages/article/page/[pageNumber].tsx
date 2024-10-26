import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Layout from '~/components/Layout';
import Wrapper from '~/layout/Wrapper';
import AllcontentSection from '~/components/sections/AllcontentSection';
import { getClient } from '~/lib/sanity.client';
import { getArticles, getArticlesCount } from '~/lib/sanity.queries';
import { readToken } from '~/lib/sanity.api';
import { SharedPageProps } from '../../_app';
import { Articles } from '~/interfaces/post';
import siteConfig from '../../../../config/siteConfig';
import React, { useRef } from 'react';
import Pagination from '~/components/commonSections/Pagination';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';
import { BaseUrlProvider } from '~/components/Context/UrlContext';

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
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
      pageNumber,
      totalPages,
    },
  };
};

const PaginatedArticlesPage = ({ articles, pageNumber, totalPages }: { articles: Articles[]; pageNumber: number; totalPages: number }) => {
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
    <BaseUrlProvider baseUrl={baseUrl}>
    <Layout>
        <AllcontentSection
          className={'pb-9'}
          allContent={articles}
          hideHeader={true}
          cardType="left-image-card"
          itemsPerPage={siteConfig.pagination.childItemsPerPage}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={pageNumber}
          onPageChange={handlePageChange}
          enablePageSlug={true}
          content={articles}
        />
        <BannerSubscribeSection />
    </Layout>
    </BaseUrlProvider>
  );
};

export default PaginatedArticlesPage;