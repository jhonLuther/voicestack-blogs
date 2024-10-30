import { GetStaticProps } from 'next';
import { CaseStudies, Ebooks } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getEbooks, getEbooksCount, getTags } from '~/lib/sanity.queries';
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

export const getStaticProps: GetStaticProps<SharedPageProps & { ebooks: Ebooks[]; totalPages: number }> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;

  const ebooks: any = await getEbooks(client, 0, itemsPerPage);
  const latestEbooks: any = await getEbooks(client, 0, 4);
  const totalEbooks = await getEbooksCount(client);
  const totalPages = Math.ceil(totalEbooks / itemsPerPage);
  const tags = await getTags(client);


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      ebooks,
      latestEbooks,
      totalPages,
      tags
    },
  };
};

const EbooksPage = ({ ebooks, latestEbooks, totalPages,tags }: { ebooks: Ebooks[]; latestEbooks: Ebooks[]; totalPages: number,tags: any }) => {
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
    <BaseUrlProvider baseUrl={baseUrl}>
      <Layout>
        {ebooks?.map((e, i) => {
          return <CustomHead prpos={e} type="eBook" key={i} />
        })}
        <TagSelect
          tags={tags}
          tagLimit={7}
          showTags={true}
        />
        {customMetaTag('ebook')}
        <LatestBlogs
          className={'pt-11 pr-9 pb-16 pl-9'}
          reverse={true}
          contents={latestEbooks}
        />
        <AllcontentSection
          className={'pb-9'}
          allContent={ebooks}
          hideHeader={true}
          cardType="left-image-card"
          itemsPerPage={siteConfig.pagination.childItemsPerPage}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={1}
          onPageChange={handlePageChange}
          enablePageSlug={true}
        />
        <BannerSubscribeSection />
      </Layout>
    </BaseUrlProvider>
  );
};

export default EbooksPage;