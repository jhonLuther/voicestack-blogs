import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Post, Testimonial } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getTestiMonials } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';
import Layout from '~/components/Layout';
import Wrapper from '~/layout/Wrapper';
import LatestBlogs from '~/components/sections/LatestBlogSection';
import AllcontentSection from '~/components/sections/AllcontentSection';



export const getStaticProps: GetStaticProps<
  SharedPageProps & { testimonials: Testimonial[] }
> = async (context) => {
  const draftMode = context.preview || false; 
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const testimonials: any = await getTestiMonials(client,4);
  const allTestimonials: any = await getTestiMonials(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      testimonials,
    } as SharedPageProps & { testimonials: Testimonial[] },
  };
};

const TestimonialsPage = ({ testimonials,allTestimonials }: { testimonials: Testimonial[],allTestimonials:Testimonial[] }) => {
  console.log(testimonials, 'testimonials');

  
  
  return (
    <Layout>
        <Wrapper>
        </Wrapper>
        <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'}  revamp={true} contents={testimonials} />
        <Wrapper>
          <AllcontentSection className={'pb-9'}  allContent={allTestimonials} hideSearch={true} cardType={'podcast-card'}/>
        </Wrapper>
    </Layout>
  );
};

export default TestimonialsPage;

