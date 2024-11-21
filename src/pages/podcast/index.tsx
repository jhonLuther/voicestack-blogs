import { GetStaticProps } from 'next';
import { Podcasts } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getEbooks, getEbooksCount, getHomeSettings, getPodcasts, getPodcastsCount, getTags } from '~/lib/sanity.queries';
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
import { mergeAndRemoveDuplicates } from '~/utils/common';
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext';

export const getStaticProps: GetStaticProps<SharedPageProps & { podcasts: Podcasts[]; totalPages: number }> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;

  const podcasts: any = await getPodcasts(client, 0, itemsPerPage);
  const latestPodcasts: any = await getPodcasts(client, 0, 5);
  const totalPodcasts = await getPodcastsCount(client);
  const totalPages = Math.ceil(totalPodcasts / itemsPerPage);
  const tags = await getTags(client);
  const homeSettings = await getHomeSettings(client);


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      podcasts,
      latestPodcasts,
      totalPages,
      tags,
      homeSettings
    },
  };
};

const PodcastsPage = ({ podcasts,latestPodcasts, totalPages,tags,homeSettings }: { podcasts: Podcasts[];latestPodcasts: Podcasts[]; totalPages: number,tags: any,homeSettings: any }) => {
  const router = useRouter();
  const baseUrl = useRef(`/${siteConfig.pageURLs.podcast}`).current;
  if(!podcasts) return null

  const featuredPodcast = homeSettings?.featuredPodcast || [];
  const latestArticles = mergeAndRemoveDuplicates(featuredPodcast,latestPodcasts)
  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl);
    } else {
      router.push(`${baseUrl}/page/${page}`);
    }
  };

  return (
    <GlobalDataProvider data={tags} featuredTags={homeSettings.featuredTags}>
    <BaseUrlProvider baseUrl={baseUrl}>
    <Layout>
      <CustomHead props ={podcasts} type="podcast"/>
      <TagSelect
				tags={tags}
				tagLimit={7}
				showTags={true}
			/>
      {customMetaTag('podcast')}
      <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'} reverse={true} contents={latestArticles} />
        <AllcontentSection
          className={'pb-9'}
          allContent={podcasts}
          hideHeader={true}
          cardType="podcast-card"
          itemsPerPage={siteConfig.pagination.childItemsPerPage}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={1}
          onPageChange={handlePageChange}
          enablePageSlug={true}
          type ='custom'
        />
        <BannerSubscribeSection />
      </Layout>
    </BaseUrlProvider>
    </GlobalDataProvider>
  )
};

export default PodcastsPage;