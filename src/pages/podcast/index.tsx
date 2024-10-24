import { GetStaticProps } from 'next';
import { Podcasts } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getEbooks, getEbooksCount, getPodcasts, getPodcastsCount } from '~/lib/sanity.queries';
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

export const getStaticProps: GetStaticProps<SharedPageProps & { podcasts: Podcasts[]; totalPages: number }> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;

  const podcasts: any = await getPodcasts(client, 0, itemsPerPage);
  const latestPodcasts: any = await getPodcasts(client, 0, 3);
  const totalPodcasts = await getPodcastsCount(client);
  const totalPages = Math.ceil(totalPodcasts / itemsPerPage);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      podcasts,
      latestPodcasts,
      totalPages,
    },
  };
};

const PodcastsPage = ({ podcasts,latestPodcasts, totalPages }: { podcasts: Podcasts[];latestPodcasts: Podcasts[]; totalPages: number }) => {
  const router = useRouter();
  const baseUrl = useRef(`/${siteConfig.pageURLs.podcast}`).current;

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl);
    } else {
      router.push(`${baseUrl}/page/${page}`);
    }
  };

  return (
    <Layout>
      <CustomHead props ={podcasts} type="podcast"/>
      <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'} reverse={true} contents={latestPodcasts} />
      <Wrapper>
        <AllcontentSection
          baseUrl={baseUrl}
          className={'pb-9'}
          allContent={podcasts}
          hideSearch={true}
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
        </Wrapper>
    </Layout>
  );
};

export default PodcastsPage;