import { GetStaticProps } from 'next';
import { CaseStudies } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import {getCaseStudies, getCaseStudiesCount, getHomeSettings, getTags, getTestiMonials } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';
import Layout from '~/components/Layout';
import Wrapper from '~/layout/Wrapper';
import LatestBlogs from '~/components/sections/LatestBlogSection';
import AllcontentSection from '~/components/sections/AllcontentSection';
import { useRouter } from 'next/router';
import siteConfig from '../../../config/siteConfig';
import React, { useRef } from 'react';
import Pagination from '~/components/commonSections/Pagination';
import {customMetaTag, CustomHead, generateMetaData} from '~/utils/customHead' 
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';
import { BaseUrlProvider } from '~/components/Context/UrlContext';
import ReviewsGrid from '~/components/sections/ReviewCards';
import TagSelect from '~/contentUtils/TagSelector';
import { mergeAndRemoveDuplicates, mergeReviews } from '~/utils/common';

export const getStaticProps: GetStaticProps<SharedPageProps & { caseStudies: CaseStudies[]; totalPages: number }> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;

  const caseStudies: any = await getCaseStudies(client, 0, itemsPerPage);
  const latestCaseStudies: any = await getCaseStudies(client, 0, 5);
  const totalCaseStudies = await getCaseStudiesCount(client);
  const totalPages = Math.ceil(totalCaseStudies / itemsPerPage);
  const testimonials = await getTestiMonials(client,0,6);
  const tags = await getTags(client);
  const homeSettings = await getHomeSettings(client);


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      caseStudies,
      latestCaseStudies,
      totalPages,
      testimonials,
      tags,
      homeSettings
    },
  };
};

const CaseStudiesPage = ({ caseStudies,latestCaseStudies,homeSettings, totalPages,testimonials,tags }: { caseStudies: CaseStudies[];latestCaseStudies: CaseStudies[]; totalPages: number;testimonials:any,tags: any,homeSettings: any }) => {
  const router = useRouter();
  const baseUrl = useRef(`/${siteConfig.pageURLs.caseStudy}`).current;


  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl);
    } else {
      router.push(`${baseUrl}/page/${page}`);
    }
  };

  const featuredReviews = homeSettings?.featuredReviews || [];
  const reviews  = mergeReviews(featuredReviews,testimonials).slice(0,6) || [];
  const featuredCaseStudy = homeSettings?.featuredCasestudy || [];

  const latestContents = mergeAndRemoveDuplicates(featuredCaseStudy,latestCaseStudies)
  

  return (
    <BaseUrlProvider baseUrl={baseUrl}>
    <Layout>
    <TagSelect
				tags={tags}
				tagLimit={7}
				showTags={true}
			/>
      {customMetaTag('caseStudy')}
      <CustomHead props={caseStudies} />
      <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'} reverse={true} contents={latestContents} />
      {caseStudies?.map((e,i) => {
        return <CustomHead props={e} type="caseStudy"  key={i}/>
      })}
        <AllcontentSection
          className={'!pb-12'}
          allContent={caseStudies}
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
        <ReviewsGrid testimonials={reviews}/>
        <BannerSubscribeSection />
    </Layout>
    </BaseUrlProvider>

    
  )
};

export default CaseStudiesPage;