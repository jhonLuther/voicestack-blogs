import React from 'react';
import AuthorInfo from '../commonSections/AuthorInfo';

interface TestimonialCardProps {
    testimonial: any;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ ...props }:any) => {
    const customerDetails = props.testimonialCard?.testimonial?.customerDetails
    
  return (
    <div className="w-full p-8 flex flex-col gap-2 border-2 rounded-2xl border-zinc-300">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h4 className="text-3xl !m-0 !text-bg-green font-medium">
            {props?.testimonialCard?.testimonial.testimonialName}
          </h4>
          <p className="text-lg font-normal !m-0 text-zinc-200 line-clamp-2 overflow-hidden">
            {props?.testimonialCard?.testimonial.excerpt}
          </p>
        </div>
        <div>
          <AuthorInfo contentType={'article'} author={customerDetails} />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
