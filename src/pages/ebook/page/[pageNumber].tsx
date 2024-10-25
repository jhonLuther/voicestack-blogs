import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Layout from '~/components/Layout';
import Wrapper from '~/layout/Wrapper';
import AllcontentSection from '~/components/sections/AllcontentSection';
import { getClient } from '~/lib/sanity.client';
import { getArticles, getArticlesCount, getCaseStudies, getCaseStudiesCount, getEbooks, getEbooksCount } from '~/lib/sanity.queries';
import { readToken } from '~/lib/sanity.api';
import { SharedPageProps } from '../../_app';
import { Articles, CaseStudies, Ebooks } from '~/interfaces/post';
import siteConfig from '../../../../config/siteConfig';
import React, { useRef } from 'react';
import Pagination from '~/components/commonSections/Pagination';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const allEbooks: any = await getEbooks(client);
  const totalPages = Math.ceil(allEbooks.length / siteConfig.pagination.childItemsPerPage);

  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { pageNumber: (i + 2).toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  SharedPageProps & { ebooks: Ebooks[]; pageNumber: number; totalPages: number }
> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);


  const pageNumber = Number(context.params?.pageNumber) || 1;
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;
  const skip = (pageNumber - 1) * itemsPerPage;

  const ebooks: any = await getEbooks(client, skip, itemsPerPage);
  const totalEbooks = await getEbooksCount(client);
  const totalPages = Math.ceil(totalEbooks / itemsPerPage);
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      ebooks,
      pageNumber,
      totalPages,
    },
  };
};

const PaginatedEbookPage = ({ ebooks, pageNumber, totalPages }: { ebooks: Ebooks[]; pageNumber: number; totalPages: number }) => {
  const router = useRouter();
  const baseUrl = useRef(`/${siteConfig.pageURLs.ebook}`).current;

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl);
    } else {
      router.push(`${baseUrl}/page/${page}`);
    }
  };

  return (
    <Layout>
        <AllcontentSection
          baseUrl={baseUrl}
          className={'pb-9'}
          allContent={ebooks}
          cardType="left-image-card"
          itemsPerPage={siteConfig.pagination.childItemsPerPage}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={pageNumber}
          baseUrl={baseUrl}
          onPageChange={handlePageChange}
          enablePageSlug={true}
          content={ebooks}
        />
        <BannerSubscribeSection />
    </Layout>
  );
};

export default PaginatedEbookPage;