import { GetStaticProps } from 'next';
import { Articles } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getArticles, getArticlesCount } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';
import Layout from '~/components/Layout';
import Wrapper from '~/layout/Wrapper';
import LatestBlogs from '~/components/sections/LatestBlogSection';
import AllcontentSection from '~/components/sections/AllcontentSection';
import { useRouter } from 'next/router';
import siteConfig from '../../../config/siteConfig';
import React, { useRef } from 'react';
import Pagination from '~/components/commonSections/Pagination';
import CustomHead from '~/utils/customHead';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';
import { BaseUrlProvider } from '~/components/Context/UrlContext';

export const getStaticProps: GetStaticProps<SharedPageProps & { articles: Articles[]; totalPages: number }> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;

  const articles: any = await getArticles(client, 0, itemsPerPage);
  const latestArticles: any = await getArticles(client, 0, 3);
  const totalArticles = await getArticlesCount(client);
  const totalPages = Math.ceil(totalArticles / itemsPerPage);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
      latestArticles,
      totalPages,
    },
  };
};

const ArticlesPage = ({ articles,latestArticles, totalPages }: { articles: Articles[];latestArticles: Articles[]; totalPages: number }) => {
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
      <LatestBlogs  className={'pt-11 pr-9 pb-16 pl-9'} reverse={true} contents={latestArticles} />
      {articles?.length
        ? articles.map((e, i) => {
            return <CustomHead props={e} type="caseStudy" key={i} />
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