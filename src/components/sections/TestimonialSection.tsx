import React from 'react';
import { Post } from '~/interfaces/post';
import Card from '../Card';
import { urlForImage } from '~/lib/sanity.image';
import Image from 'next/image';
import Wrapper from '../../layout/Wrapper';
import Link from 'next/link';
import useMediaQuery from '~/utils/useMediaQueryHook';



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
        <div className="  gap-0 bg-[#F5C6C6] p-11 relative flex content-center items-center" >
            <Wrapper removePadding={isMobile}>
                {testimonials && testimonials.length && testimonials.map((testimonialItem, i) => (
                    <div className='flex md:flex-row flex-col  content-center items-center' key={i}>
                        <div className='flex  md:px-14   px-0 py-9 flex-1 gap-8'>
                            <div>
                                <div className='flex justify-between'>
                                    <p className="text-sm max-w-max flex-1 text-white font-bold px-1 py-2 flex items-center rounded-sm bg-cs-darkBlack  uppercase">{testimonialItem.testimonialName}
                                    </p>
                                    <Link
                                        href={testimonialItem.slug.current && `/testimonial/${testimonialItem.slug.current}`}
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

                                <blockquote className="mt-6 line-clamp-4 overflow-hidden  md:text-5xl text-2xl font-extrabold font-manrope leading-tight">
                                    {`"${testimonialItem.excerpt ? testimonialItem.excerpt : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore fugiat nulla pariatur."}"`}
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
                {/* <div className="flex flex-col justify-between relative p-8">
          <div>
            <p className="text-sm font-bold uppercase">Case Study</p>
            <blockquote className="mt-4 text-4xl font-semibold leading-snug">
              "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore fugiat nulla pariatur."
            </blockquote>
          </div>
          <div className="mt-4">
            <p className="text-lg font-bold">Dr. John Doe</p>
            <p className="text-sm text-gray-600">Alpha Family Dental Group</p>
          </div>
        </div>
        <div className="relative">
        {testimonials.image && (
            <Image
              src={urlForImage(testimonials.image).width(800).height(400).url()}
              alt={testimonials.title}
              width={800}
              height={400}
              className="rounded-lg object-cover"
            />
          )}
        </div>
        <a
          href="#"
          className="absolute top-8 right-8 text-sm font-semibold flex items-center space-x-1"
        >
          <span>Read Now</span>
          <span className="text-xl">&#8599;</span>
        </a> */}
            </Wrapper>
        </div>
    );
};

export default TestimonialSection;