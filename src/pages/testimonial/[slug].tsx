// pages/testimonial/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { getRelatedContents, getTestimonial, testimonialSlugsQuery } from '~/lib/sanity.queries';
import { Testimonial } from '~/interfaces/post';
import Wrapper from '~/layout/Wrapper';
import Image from 'next/image';
import { readToken } from '~/lib/sanity.api';
import Layout from '~/components/Layout';
import { draftMode } from 'next/headers';
import SanityPortableText from '~/components/Editor/sanityBlockEditor';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import PracticeProfile from '~/contentUtils/PracticeProfile';
import podcast from '../podcast';

interface Props {
  testimonial: Testimonial; 
  draftMode: boolean;
  token: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(testimonialSlugsQuery);

  const paths = slugs?.map((slug: string) => {
    return { params: { slug } }; 
  }) || [];

  return {
    paths,
    fallback: 'blocking',
  };
}

// Fetch testimonial data based on the slug
export const getStaticProps: GetStaticProps<Props> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const testimonial = await getTestimonial(client, params.slug as string);

  if (!testimonial) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      testimonial,
    },
  };
}

// Testimonial page component
const TestimonialPage = ({ testimonial,draftMode,token }: Props) => {
  console.log(testimonial);
  
  const router = useRouter();


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (

    <Layout >
      <MainImageSection isAuthor={true} post={testimonial} />
      <Wrapper>
        <div className="flex  md:flex-row flex-col">
          <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
            <div className='post__content w-full '>
              <SanityPortableText
                content={testimonial?.body}
                draftMode={draftMode}
                token={token}
              />
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
            <div className='sticky top-12 flex flex-col gap-12'>
              {testimonial?.relatedTestimonials?.length > 0 && <RelatedFeaturesSection title={testimonial?.title} allPosts={testimonial?.relatedTestimonials} />}
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default TestimonialPage;
