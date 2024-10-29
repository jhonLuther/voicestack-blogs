import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Layout from '~/components/Layout';
import Wrapper from '~/layout/Wrapper';
import AllcontentSection from '~/components/sections/AllcontentSection';
import { getClient } from '~/lib/sanity.client';
import { getArticles, getArticlesCount, getCaseStudies, getCaseStudiesCount } from '~/lib/sanity.queries';
import { readToken } from '~/lib/sanity.api';
import { SharedPageProps } from '../../_app';
import { Articles, CaseStudies } from '~/interfaces/post';
import siteConfig from '../../../../config/siteConfig';
import React, { useRef } from 'react';
import Pagination from '~/components/commonSections/Pagination';
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection';
import { BaseUrlProvider } from '~/components/Context/UrlContext';
import { CustomHead } from '~/utils/customHead';

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const allArticles: any = await getCaseStudies(client);
  const totalPages = Math.ceil(allArticles.length / siteConfig.pagination.childItemsPerPage);

  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { pageNumber: (i + 2).toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  SharedPageProps & { caseStudies: CaseStudies[]; pageNumber: number; totalPages: number }
> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);


  const pageNumber = Number(context.params?.pageNumber) || 1;
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;
  const skip = (pageNumber - 1) * itemsPerPage;

  const caseStudies: any = await getCaseStudies(client, skip, itemsPerPage);
  const totalCaseStudies = await getCaseStudiesCount(client);
  const totalPages = Math.ceil(totalCaseStudies / itemsPerPage);
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      caseStudies,
      pageNumber,
      totalPages,
    },
  };
};

const PaginatedCaseStudyPage = ({ caseStudies, pageNumber, totalPages }: { caseStudies: CaseStudies[]; pageNumber: number; totalPages: number }) => {
  const router = useRouter();
  const baseUrl = useRef(`/${siteConfig.pageURLs.caseStudy}`).current;

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
        {caseStudies?.map((e) => {
          return <CustomHead props={e} type="caseStudy" />
        })}
        <AllcontentSection
          className={'pb-9'}
          allContent={caseStudies}
          cardType="left-image-card"
          hideHeader={true}
          itemsPerPage={siteConfig.pagination.childItemsPerPage}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={pageNumber}
          onPageChange={handlePageChange}
          enablePageSlug={true}
          content={caseStudies}
        />
        <BannerSubscribeSection />
      </Layout>
    </BaseUrlProvider>
  )
};

export default PaginatedCaseStudyPage;