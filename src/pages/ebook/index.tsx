import { GetStaticProps } from 'next';
import { CaseStudies, Ebooks } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getEbooks, getEbooksCount } from '~/lib/sanity.queries';
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

export const getStaticProps: GetStaticProps<SharedPageProps & { ebooks: Ebooks[]; totalPages: number }> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;

  const ebooks: any = await getEbooks(client, 0, itemsPerPage);
  const latestEbooks: any = await getEbooks(client, 0, 3);
  const totalEbooks = await getEbooksCount(client);
  const totalPages = Math.ceil(totalEbooks / itemsPerPage);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      ebooks,
      latestEbooks,
      totalPages,
    },
  };
};

const EbooksPage = ({ ebooks,latestEbooks, totalPages }: { ebooks: Ebooks[];latestEbooks: Ebooks[]; totalPages: number }) => {
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
      {ebooks?.map((e,i) => {
        return <CustomHead prpos ={e} type="eBook" key={i} />
      })}

      <LatestBlogs
        className={'pt-11 pr-9 pb-16 pl-9'}
        reverse={true}
        contents={latestEbooks}
      />
        <AllcontentSection
          baseUrl={baseUrl}
          className={'pb-9'}
          allContent={ebooks}
          hideHeader={true}
          cardType="left-image-card"
          itemsPerPage={siteConfig.pagination.childItemsPerPage}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={1}
          baseUrl={baseUrl}
          onPageChange={handlePageChange}
          enablePageSlug={true}
        />
       <BannerSubscribeSection   />
    </Layout>
  );
};

export default EbooksPage;