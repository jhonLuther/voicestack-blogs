import Link from 'next/link';
import React, { useRef } from 'react';
import Carousel from './Carousel';
import Wrapper from '~/layout/Wrapper';

interface BannerBlockProps {
  items?: any;
}

const SliderSection: React.FC<BannerBlockProps> = ({ items }) => {
  const swiperRef = useRef<any>(null);

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  if (!items) {
    return null
  }

  return (
    <div className={` flex w-full justify-center`} >
      <section className="my-9 max-w-7xl">
        <div className="flex justify-between pb-9">
          <h2 className="text-2xl font-bold mb-4">{`Ebooks and Webinars`}</h2>
          <div className="flex gap-9">
            <button onClick={handlePrevSlide}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="39" viewBox="0 0 35 39" fill="none">
              <path d="M21.0854 2.19507L3.78061 19.4999M3.78061 19.4999L21.0854 36.8048M3.78061 19.4999H34.0641" stroke="#151515" strokeWidth="4" />
            </svg></button>
            <button onClick={handleNextSlide}><svg xmlns="http://www.w3.org/2000/svg" width="34" height="39" viewBox="0 0 34 39" fill="none">
              <path d="M13.6953 2.19507L31.0002 19.4999M31.0002 19.4999L13.6953 36.8048M31.0002 19.4999H0.71668" stroke="#151515" strokeWidth="4" />
            </svg></button>
          </div>
        </div>
        <Carousel items={items} swiperRef={swiperRef} />
      </section>
    </div>

  );
};

export default SliderSection;
