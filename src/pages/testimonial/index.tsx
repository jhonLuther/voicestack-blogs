import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Post, Testimonial } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getTestiMonials } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';



export const getStaticProps: GetStaticProps<
  SharedPageProps & { testimonials: Testimonial[] }
> = async (context) => {
  const draftMode = context.preview || false; 
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const testimonials: any = await getTestiMonials(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      testimonials,
    } as SharedPageProps & { testimonials: Testimonial[] },
  };
};

const TestimonialsPage = ({ testimonials }: { testimonials: Testimonial[] }) => {
  // console.log(testimonials, 'testimonials');
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">{`Testimonials`}</h1>
      <div className="max-w-3xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {testimonials.map((testimonial,i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800">{testimonial.title || testimonial.testimonialName}</h2>
            <p className="text-gray-600 mt-2">{testimonial.summary}</p>
            <Link className="mt-4 inline-block text-blue-600 hover:text-blue-800 transition-colors" href={`/testimonial/${testimonial.slug.current}`}>
                Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsPage;

