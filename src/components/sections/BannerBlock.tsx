import Link from 'next/link';
import React from 'react';

interface BannerBlockProps {
  bannerBlock?: {
    backgroundColor?: string;
    title?: string;
    buttonLink?: string;
    buttonText?: string;
    description?: string;
  };
}

const BannerBlock: React.FC<BannerBlockProps> = ({ bannerBlock }) => {

  return (
    <div
      className="flex flex-1 md:flex-row flex-col md:items-center rounded-[10px] p-8 my-8 md:gap-20 gap-4 justify-between "
      style={{ backgroundColor: bannerBlock?.backgroundColor }}
    >
      <div className='flex flex-col justify-center'>
        <h2 className='!text-white !text-3xl !font-semibold leading-[110%] block'>
          {bannerBlock?.title}
        </h2>
        <p className='!text-gray-100 !text-opacity-70 !text-lg !m-0'>{bannerBlock?.description}</p>
      </div>


      <div>
      <div
        className="bg-green-700 hover:bg-green-600 px-4 py-3 flex min-w-[200px] cursor-pointer rounded"
      >
        <Link
          href={bannerBlock?.buttonLink}
          target="_blank"
          rel="noreferrer"
          title="linkedin"
          className="text-center w-full wh text-white font-inter text-lg font-medium leading-6"
        >
          {bannerBlock?.buttonText}
        </Link>
      </div>
      </div>
    </div>
  );
};

export default BannerBlock;
