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
    <Section className='md:!p-0 bg-zinc-100 justify-center'>
      <Wrapper>
        <div className="w-full gap-0 py-16 relative" >
            {testimonials && testimonials.length && testimonials.map((testimonialItem, i) => (
              <div className='flex flex-col md:flex-row gap-4 md:gap-12 content-center items-center justify-between' key={i}>
                <div className='flex md:px-0 px-0 flex-1 gap-8 max-w-[731px]'>
                  <div className='flex flex-col gap-y-8'>
                    <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32 0.272443L31.1753 5.99065C29.4891 5.84403 28.1512 6.13728 27.1615 6.87038C26.1718 7.56683 25.4937 8.57485 25.1271 9.89444C24.7973 11.1774 24.7423 12.6436 24.9622 14.2931H32V28.4236H18.4192V13.7432C18.4192 8.9414 19.5556 5.31253 21.8282 2.85664C24.1008 0.364081 27.4914 -0.497317 32 0.272443ZM13.5808 0.272443L12.756 5.99065C11.0699 5.84403 9.73196 6.13728 8.74227 6.87038C7.75258 7.56683 7.07446 8.57485 6.7079 9.89444C6.37801 11.1774 6.32302 12.6436 6.54296 14.2931H13.5808V28.4236H0V13.7432C0 8.9414 1.13631 5.31253 3.40893 2.85664C5.68156 0.364081 9.07216 -0.497317 13.5808 0.272443Z" fill="#18181B"/>
                    </svg>
                    <div>
                      <p className="text-zinc-900 text-4xl font-bold leading-[1.1] tracking-[-0.72px] font-manrope">{testimonialItem.testimonialName}</p>
                      <p className="mt-6 text-zinc-700 text-xl md:text-2xl leading-[1.3] md:leading-[1.4]">
                      {`${testimonialItem.excerpt ? testimonialItem.excerpt : "Duis aute irure dolor in reprehenderit in voluptate pariatur."}`}
                      </p>
                    </div>
                    <div className='flex flex-col gap-y-1'>
                      <p className='text-zinc-900 text-[18px] font-manrope font-bold leading-[1.6]'>{testimonialItem.customer?.name}</p>
                      <span className='text-zinc-700 text-base font-medium'>{testimonialItem.customer?.role}</span>
                    </div>
                    {/* <div className='flex justify-between'>
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
                    </div> */}

                    {/* <blockquote className="mt-6 line-clamp-4 overflow-hidden  md:text-5xl text-2xl font-extrabold font-manrope leading-[1.2] md:leading-[1.2]">
                      {`${testimonialItem.excerpt ? testimonialItem.excerpt : "Duis aute irure dolor in reprehenderit in voluptate pariatur."}`}
                    </blockquote> */}

                    

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
        </div>
      </Wrapper>
    </Section>
  );
};

export default TestimonialSection;