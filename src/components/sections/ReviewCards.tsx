import React from 'react';
import Card from '../Card';
import Wrapper from '~/layout/Wrapper';
import Section from '../Section';
import Link from 'next/link';
import { ArrowTopRightIcon } from '@sanity/icons';
import siteConfig from 'config/siteConfig';
import H2Large from '../typography/H2Large';

interface LatestBlogsProps {
    testimonials?: any[];
}

const ReviewsGrid: React.FC<LatestBlogsProps> = (testimonials) => {
    if(!testimonials) return null
    const allTestimonials =  testimonials?.testimonials

    return (
        <Section className='justify-center !bg-zinc-200'>
        <Wrapper className="w-full flex-col">
            <div className="flex justify-between items-center mb-8">
                <H2Large className='tracking-tighterText select-none'>
                    {`${'Reviews'} `}
                </H2Large>
                <Link href={siteConfig.externalLinks.reviews} target='_blank'>
                <div className='flex items-center gap-3 transform group duration-300 cursor-pointer'>
                    <span className='text-base font-medium'>{`More Reviews`}</span>
                    <span className="text-xl">
                    <ArrowTopRightIcon 
                        className='group-hover:translate-y-[-2px] transition-transform duration-300' 
                        height={20} 
                        width={20} 
                    />
                    </span>
                </div>
            </Link>
            </div>

            <div className="w-full overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {allTestimonials.map((blog, index) => (
                    <div key={index}
                    className={`
                      ${index === 1 || index === 4  ? 'md:transform md:translate-y-[]' : ''}
                    `}
                      >
                      <Card cardType="review-card" key={index} post={blog} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            </div>
        </Wrapper>
        </Section>
    );
};

export default ReviewsGrid;




// {reviews.map((review, index) => (
//     <div
//       key={index}
//       className={`p-6 bg-white shadow-md rounded-lg ${
//         index === 1 || index === 2 ? 'lg:col-span-2' : ''
//       }`}
//     >
//       <blockquote className="mb-4">
//         <p className="text-lg font-semibold">&ldquo;{review.title}&rdquo;</p>
//         <p className="text-gray-600 mt-2">{review.content}</p>
//       </blockquote>
//       <div className="flex items-center mt-4">
//         <div className="text-sm">
//           <p className="font-medium">{review.author}</p>
//           <p className="text-gray-500">{review.role}</p>
//         </div>
//         {review.hasPlayButton && (
//           <div className="ml-auto">
//             <PlayIcon />
//           </div>
//         )}
//       </div>
//     </div>
//   ))}