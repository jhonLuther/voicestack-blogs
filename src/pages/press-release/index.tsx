import { GetStaticProps } from 'next';
import { Podcasts, PressRelease } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getPressReleases, getPressReleasesCount, getTags } from '~/lib/sanity.queries';
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
import {commonMetaData, CustomHead} from '~/utils/customHead';
import TagSelect from '~/contentUtils/TagSelector';

export const getStaticProps: GetStaticProps<SharedPageProps & { pressReleases: PressRelease[]; totalPages: number }> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;

  const pressReleases: any = await getPressReleases(client, 0, itemsPerPage);
  const latestPressReleases: any = await getPressReleases(client, 0, 4);
  const totalPressReleases = await getPressReleasesCount(client);
  const totalPages = Math.ceil(totalPressReleases / itemsPerPage);
  const tags = await getTags(client);


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      pressReleases,
      latestPressReleases,
      totalPages,
      tags
    },
  };
};

const PressReleasePage = ({ pressReleases,latestPressReleases, totalPages,tags }: { pressReleases: Podcasts[];latestPressReleases: Podcasts[]; totalPages: number,tags : any }) => {
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
    <BaseUrlProvider baseUrl={baseUrl}>
      {pressReleases?.map((e,i)=>{
        return (<CustomHead props={e} type="pressRelease"key={i}/>)
      })}
    <Layout>
    <TagSelect
				tags={tags}
				tagLimit={7}
				showTags={true}
			/>
      {commonMetaData('pressRelease')}
      <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'} reverse={true} contents={latestPressReleases} />
        <AllcontentSection
          className={'pb-9'}
          allContent={pressReleases}
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

export default PressReleasePage;