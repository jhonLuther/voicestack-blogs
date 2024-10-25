import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Carousel from './Carousel';
import H3XL from '../typography/H3XL';
import { ArrowRightIcon } from '@sanity/icons';
import { ArrowLeftIcon } from '@sanity/icons';
import H2Large from '../typography/H2Large';

interface BannerBlockProps {
  items?: any;
}

const SliderSection: React.FC<BannerBlockProps> = ({ items }) => {
  if (!items) {
    return null;
  }
  return (
    <div className={` flex w-full justify-center px-4 `} >
      <section className="my-9 max-w-7xl w-full">
        <div className="flex justify-between pb-9">
          <H2Large >
            {`Ebooks and Webinars`}
          </H2Large>
          <div className="flex gap-9">
            <div className="flex gap-9">
              <button className='text-zinc-900 ebook-prev disabled:opacity-30'><ArrowLeftIcon height={48} width={48} /></button>
              <button className='text-zinc-900 ebook-next disabled:opacity-30'><ArrowRightIcon height={48} width={48} /></button>
            </div>
          </div>
        </div>
        <Carousel items={items}/>
      </section>
    </div>

  );
};

export default SliderSection;
