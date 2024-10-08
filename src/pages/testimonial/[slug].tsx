// pages/testimonial/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { getRelatedContents, getTestimonial, testimonialSlugsQuery } from '~/lib/sanity.queries';
import { Testimonial } from '~/interfaces/post';
import Wrapper from '~/components/commonSections/Wrapper';
import Image from 'next/image';
import { readToken } from '~/lib/sanity.api';
import Container from '~/components/Container';
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
  relatedContents?: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(testimonialSlugsQuery);

  console.log(slugs, 'slugs testimonials');

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
  const relatedContents = await getRelatedContents(client, params.slug as string, 3 as number);


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
const TestimonialPage = ({ testimonial,draftMode,token ,relatedContents}: Props) => {
  const router = useRouter();


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (

    <Container >
      <MainImageSection isAuthor={true} post={testimonial} />
      <Wrapper>
        <div className="flex  md:flex-row flex-col">
          <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
            <div className='post__content w-full '>
              {podcast && testimonial?.practiceName ? <PracticeProfile contents={testimonial}/> : ""}
              <SanityPortableText
                content={testimonial?.body}
                draftMode={draftMode}
                token={token}
              />
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
            <div className='sticky top-12 flex flex-col gap-12'>
              <RelatedFeaturesSection title={testimonial?.title} allPosts={relatedContents} />
            </div>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
};

export default TestimonialPage;
