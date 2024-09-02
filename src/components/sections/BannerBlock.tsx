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
      className="flex justify-center items-center lg:max-w-[127rem] border-red-100"
      style={{ backgroundColor: bannerBlock?.backgroundColor }}
    >
      <div>
        <h2>
          {bannerBlock?.title} {bannerBlock?.backgroundColor}
        </h2>
        <p>{bannerBlock?.description}</p>
      </div>
      <a
        href={bannerBlock?.buttonLink}
        className="bg-green-500 text-white py-4 px-8 text-center no-underline inline-block text-lg my-1 mx-0.5 cursor-pointer rounded"
      >
        {bannerBlock?.buttonText}
      </a>
    </div>
  );
};

export default BannerBlock;
