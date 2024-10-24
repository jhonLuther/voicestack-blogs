import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Layout from '~/components/Layout';
import Wrapper from '~/layout/Wrapper';
import AllcontentSection from '~/components/sections/AllcontentSection';
import { getClient } from '~/lib/sanity.client';
import { readToken } from '~/lib/sanity.api';
import { SharedPageProps } from '../../_app';
import { Webinars } from '~/interfaces/post';
import siteConfig from '../../../../config/siteConfig';
import React, { useRef } from 'react';
import Pagination from '~/components/commonSections/Pagination';
import {getWebinars, getWebinarsCount} from '~/lib/sanity.queries';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const allWebinars: any = await getWebinars(client);
  const totalPages = Math.ceil(allWebinars.length / siteConfig.pagination.childItemsPerPage);

  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { pageNumber: (i + 2).toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  SharedPageProps & { webinars: Webinars[]; pageNumber: number; totalPages: number }
> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);


  const pageNumber = Number(context.params?.pageNumber) || 1;
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;
  const skip = (pageNumber - 1) * itemsPerPage;

  const webinars: any = await getWebinars(client, skip, itemsPerPage);
  const totalWebinars = await getWebinarsCount(client);
  const totalPages = Math.ceil(totalWebinars / itemsPerPage);
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      webinars,
      pageNumber,
      totalPages,
    },
  };
};

const PaginatedWebinarsPage = ({ webinars, pageNumber, totalPages }: { webinars: Webinars[]; pageNumber: number; totalPages: number }) => {
  const router = useRouter();
  const baseUrl = useRef(`/${siteConfig.pageURLs.webinar}`).current;

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
          allContent={webinars}
          hideSearch={true}
          cardType="left-image-card"
          itemsPerPage={siteConfig.pagination.childItemsPerPage}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={pageNumber}
          baseUrl={baseUrl}
          onPageChange={handlePageChange}
          enablePageSlug={true}
          content={webinars}
        />
        <BannerSubscribeSection />
    </Layout>
  );
};

export default PaginatedWebinarsPage;