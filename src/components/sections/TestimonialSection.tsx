import React from 'react';
import { Post } from '~/interfaces/post';
import Card from '../Card';
import { urlForImage } from '~/lib/sanity.image';
import Image from 'next/image';
import Wrapper from '../../layout/Wrapper';
import Link from 'next/link';
import useMediaQuery from '~/utils/useMediaQueryHook';
import Section from '../Section';



interface TestimonialSectionProps {
  testimonials: {
    map(arg0: (testimonialItem: any, i: any) => React.JSX.Element): React.ReactNode;
    length: { image?: any; title?: string; };
    image?: any;
    title?: string;


  };
}

const TestimonialSection = ({ testimonials }: TestimonialSectionProps) => {
  const isMobile: any = useMediaQuery(767);

  return (
    <Section className='md:!p-0 justify-center'>

      <div className="  gap-0 bg-[#F5C6C6] p-11 relative flex content-center items-center" >
        <Wrapper className="flex-col items-center">
          {testimonials && testimonials.length && testimonials.map((testimonialItem, i) => (
            <div className='flex md:flex-row flex-col  content-center items-center' key={i}>
              <div className='flex  md:px-14   px-0 py-9 flex-1 gap-8'>
                <div>
                  <div className='flex justify-between'>
                    <p className="text-sm max-w-max flex-1 text-white font-bold px-1 py-2 flex items-center rounded-sm bg-cs-darkBlack  uppercase">{testimonialItem.testimonialName}
                    </p>
                    <Link
                      href={'/'}
                      // href={testimonialItem.slug.current && `/testimonial/${testimonialItem.slug.current}`}
                      className="text-sm font-semibold flex items-center space-x-1 hover:scale-90 transition duration-300 ease-in-out"
                    >
                      <span className='text-xs font-medium'>{`Read Now`}</span>
                      <span className="text-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M0 0.5H9M9 0.5V9.5M9 0.5L1.125 8.375" stroke="#151515" />
                        </svg>
                      </span>
                    </Link>
                  </div>

                  <blockquote className="mt-6 line-clamp-4 overflow-hidden  md:text-5xl text-2xl font-extrabold font-manrope leading-[1.2] md:leading-[1.2]">
                    {`${testimonialItem.excerpt ? testimonialItem.excerpt : "Duis aute irure dolor in reprehenderit in voluptate pariatur."}`}
                  </blockquote>

                  <div className='flex flex-col my-8'>
                    <p className='text-cs-black text-xl font-bold'>{testimonialItem.customer?.name}</p>
                    <span className='text-cs-black text-sm font-medium'>{testimonialItem.customer?.role}</span>
                  </div>

                </div>
              </div>

              <div>
                {testimonialItem.customer && testimonialItem.customer.picture && (
                  <Image
                    src={testimonialItem.customer.picture}
                    alt={testimonialItem.customer.picture.alt || ''}
                    width={411}
                    height={414}
                    className="rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          ))
          }
        </Wrapper>
      </div>
    </Section>
  );
};

export default TestimonialSection;