import { GetStaticProps } from 'next';
import {Testimonial } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getTestiMonials, getTestiMonialsCount } from '~/lib/sanity.queries';
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

export const getStaticProps: GetStaticProps<SharedPageProps & { testimonials: Testimonial[]; totalPages: number }> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const itemsPerPage = siteConfig.pagination.childItemsPerPage;

  const testimonials: any = await getTestiMonials(client, 0, itemsPerPage);
  const latestTestimonials: any = await getTestiMonials(client, 0, 3);
  const totalTestimonials = await getTestiMonialsCount(client);
  const totalPages = Math.ceil(totalTestimonials / itemsPerPage);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      testimonials,
      latestTestimonials,
      totalPages,
    },
  };
};

const TestimonialsPage = ({ testimonials,latestTestimonials, totalPages }: { testimonials: Testimonial[];latestTestimonials: Testimonial[]; totalPages: number }) => {
  const router = useRouter();
  const baseUrl = useRef(`/${siteConfig.pageURLs.testimonial}`).current;

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl);
    } else {
      router.push(`${baseUrl}/page/${page}`);
    }
  };

  return (
    <Layout>
      <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'} reverse={true} contents={latestTestimonials} />
      <Wrapper>
        {/* <AllcontentSection
          baseUrl={baseUrl}
          className={'pb-9'}
          allContent={testimonials}
          hideSearch={true}
          cardType={'left-image-card'}
          itemsPerPage={siteConfig.pagination.childItemsPerPage}
        /> */}
        <Pagination
          totalPages={totalPages}
          currentPage={1}
          baseUrl={baseUrl}
          onPageChange={handlePageChange}
          enablePageSlug={true}
        />
        <BannerSubscribeSection />
      </Wrapper>
    </Layout>
  );
};

export default TestimonialsPage;