import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Carousel from './Carousel';
import H3XL from '../typography/H3XL';
import { ArrowRightIcon } from '@sanity/icons';
import { ArrowLeftIcon } from '@sanity/icons';

interface BannerBlockProps {
  items?: any;
}

const SliderSection: React.FC<BannerBlockProps> = ({ items }) => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = items ? items.length : 0;

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === totalSlides - 1;

  const handleNextSlide = () => {
    if (swiperRef.current && currentIndex < totalSlides - 1) {
      swiperRef.current.slideNext();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current && currentIndex > 0) {
      swiperRef.current.slidePrev();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (!items) {
    return null;
  }


  return (
    <div className={` flex w-full justify-center`} >
      <section className="my-9 max-w-7xl">
        <div className="flex justify-between pb-9">
          <H3XL >
            {`Ebooks and Webinars`}
          </H3XL>
          <div className="flex gap-9">
            <button className={` ${isAtStart ? 'text-gray-300' : 'text-black'}`} disabled={isAtStart} onClick={handlePrevSlide}>
              <ArrowLeftIcon height={48} width={48} /></button>
            <button className={` ${isAtEnd ? 'text-gray-300' : 'text-black'}`} disabled={isAtEnd} onClick={handleNextSlide}>
              <ArrowRightIcon height={48} width={48} /></button>
          </div>
        </div>
        <Carousel items={items} swiperRef={swiperRef} />
      </section>
    </div>

  );
};

export default SliderSection;
