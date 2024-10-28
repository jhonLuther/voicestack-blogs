import Link from 'next/link';
import React from 'react';
import Button from '../commonSections/Button';
import H3Medium from '../typography/H3Medium';
import DescriptionText from '../typography/DescriptionText';

interface BannerBlockProps {
  bannerBlock?: {
    title?: string;
    buttonLink?: string;
    buttonText?: string;
    description?: string;
  };
}

const BannerBlock: React.FC<BannerBlockProps> = ({ bannerBlock }) => {

  return (
    <div
      className="flex flex-1 bg-zinc-800 md:flex-row flex-col md:items-center rounded-lg p-8 my-8 md:gap-20 gap-4 justify-between "
      
    >
      <div className='flex flex-col justify-center'>
        <H3Medium className='!text-white !m-0 !text-3xl !font-semibold leading-[110%] block'>
          {bannerBlock?.title ? bannerBlock?.title : 'Book a demo with us!'}
        </H3Medium>
        <DescriptionText className='!text-zinc-100 !text-opacity-70 !text-lg !m-0'>{bannerBlock?.description ? bannerBlock?.description  : 'Learn how we can help you reduce claim rejections and denials.'}</DescriptionText>
      </div>
      <div>
      <Button className='!bg-white   hover:bg-zinc-800' link={bannerBlock?.buttonLink ? bannerBlock?.buttonLink : 'https://carestack.com/demo'}>
        <span className='text-base font-medium !underline'>{bannerBlock.buttonText ? bannerBlock.buttonText : 'Book Free Demo'}</span>
      </Button>
      </div>
    </div>
  );
};

export default BannerBlock;
