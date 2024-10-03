// pages/testimonial/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { getTestimonial, testimonialSlugsQuery } from '~/lib/sanity.queries';
import { Testimonial } from '~/interfaces/post';
import Wrapper from '~/components/commonSections/Wrapper';
import Image from 'next/image';
import { readToken } from '~/lib/sanity.api';

interface Props {
  testimonial: Testimonial; 
  relatedTestimonials: Testimonial[]; 
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

  console.log(testimonial, 'testimonialSlug', params);

  if (!testimonial) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const relatedTestimonials = []; 

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      testimonial,
      relatedTestimonials, 
    },
  };
}

// Testimonial page component
const TestimonialPage = ({ testimonial, relatedTestimonials }: Props) => {
  const router = useRouter();

  console.log(testimonial, 'slugxx ');

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <section className="flex flex-col mx-auto w-full h-full items-center">
        <div className="flex flex-col items-center gap-4">
          {testimonial.image && (
            <Image
              src={testimonial.image}
              alt={testimonial.testimonialName}
              width={150}
              height={150}
              className="rounded-full"
            />
          )}
          <h1 className="text-2xl font-semibold">{testimonial.testimonialName}</h1> 
          <p className="text-lg font-normal">{testimonial.excerpt}</p> 
        </div>
      </section>
    </Wrapper>
  );
};

export default TestimonialPage;
