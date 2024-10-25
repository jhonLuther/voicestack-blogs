import { GetStaticProps } from 'next';
import { Podcasts, PressRelease } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getPressReleases, getPressReleasesCount } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';
import Layout from '~/components/Layout';
import Wrapper from '~/layout/Wrapper';
import LatestBlogs from '~/components/sections/LatestBlogSection';
import AllcontentSection from '~/components/sections/AllcontentSection';
import { useRouter } from 'next/router';
import siteConfig from '../../../config/siteConfig';
import React, { useRef } from 'react';
import Pagination from '~/components/commonSections/Pagination';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';

export const getStaticProps: GetStaticProps<SharedPageProps & { pressReleases: PressRelease[]; totalPages: number }> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;

  const pressReleases: any = await getPressReleases(client, 0, itemsPerPage);
  const latestPressReleases: any = await getPressReleases(client, 0, 3);
  const totalPressReleases = await getPressReleasesCount(client);
  const totalPages = Math.ceil(totalPressReleases / itemsPerPage);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      pressReleases,
      latestPressReleases,
      totalPages,
    },
  };
};

const PressReleasePage = ({ pressReleases,latestPressReleases, totalPages }: { pressReleases: Podcasts[];latestPressReleases: Podcasts[]; totalPages: number }) => {
  const router = useRouter();
  const baseUrl = useRef(`/${siteConfig.pageURLs.pressRelease}`).current;

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl);
    } else {
      router.push(`${baseUrl}/page/${page}`);
    }
  };

  return (
    <Layout>
      <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'} reverse={true} contents={latestPressReleases} />
        <AllcontentSection
          baseUrl={baseUrl}
          className={'pb-9'}
          allContent={pressReleases}
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
        <BannerSubscribeSection />
      </Layout>
  );
};

export default PressReleasePage;