import { GetStaticProps } from 'next';
import { Webinars } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getTags, getWebinars, getWebinarsCount } from '~/lib/sanity.queries';
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
import { BaseUrlProvider } from '~/components/Context/UrlContext';
import TagSelect from '~/contentUtils/TagSelector';

export const getStaticProps: GetStaticProps<SharedPageProps & { webinars: Webinars[]; totalPages: number }> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;

  const webinars: any = await getWebinars(client, 0, itemsPerPage);
  const latestWebinars: any = await getWebinars(client, 0, 4);
  const totalWebinars = await getWebinarsCount(client);
  const totalPages = Math.ceil(totalWebinars / itemsPerPage);
  const tags = await getTags(client);


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      webinars,
      latestWebinars,
      totalPages,
      tags
    },
  };
};

const WebinarsPage = ({ webinars,latestWebinars, totalPages,tags }: { webinars: Webinars[];latestWebinars: Webinars[]; totalPages: number,tags: any }) => {
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
    <BaseUrlProvider baseUrl={baseUrl}>
    <Layout>
    <TagSelect
				tags={tags}
				tagLimit={7}
				showTags={true}
			/>
      <LatestBlogs contentType="webinar" className={'pt-11 pr-9 pb-16 pl-9'} reverse={true} contents={latestWebinars} />
        <AllcontentSection
          className={'pb-9'}
          allContent={webinars}
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

export default WebinarsPage;