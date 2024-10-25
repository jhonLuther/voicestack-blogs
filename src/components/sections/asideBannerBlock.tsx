import Link from 'next/link';
import React from 'react';

interface AsidebannerBlockProps {
  contents?:any

}

const AsideBannerBlock: React.FC<AsidebannerBlockProps> = ({ contents }) => {

  return (
    <div className='flex flex-col px-9 pt-16 pb-9 gap-9 bg-cs-green rounded-s '>
      {contents && contents?.asideBookFreeDemoBanner?.map((item, i) => {
        let isLast = i === contents.asideBookFreeDemoBanner.length - 1
        return (
          <div className='flex flex-col gap-4' key={item._id || i}>
            <h4 className='text-white leading-tight  font-bold text-[48px] tracking-tight'>{item.number}</h4>
            <p className={`text-zinc-300 pb-4 text-sm font-normal leading-relaxed tracking-wide ${ !isLast &&` border-b-2`} border-zinc-50 ${i === contents.asideBookFreeDemoBanner.length - 1 ? 'border-b-0' : ''}`}>{item.text}</p>
          </div>
        )
      })}
      <div
        className="bg-cs-green-200 hover:bg-green-600 px-4 py-3 flex min-w-[200px] cursor-pointer rounded"
      >
        <Link
          href={contents?.buttonLink ? contents?.buttonLink : 'https://carestack.com/demo'}
          target="_blank"
          rel="noreferrer"
          className="text-center w-full wh !text-white font-inter text-lg font-medium leading-6 !no-underline"
        >
          {contents?.buttonText ? contents?.buttonText : 'Book Free Demo'}
        </Link>
      </div>
    </div>
  );
};

export default AsideBannerBlock;
