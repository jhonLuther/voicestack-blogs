import React, { useRef, useEffect } from 'react';
import { Post } from '~/interfaces/post';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from '../Card';

interface CarouselProps {
  items: Post[];
  swiperRef: React.MutableRefObject<any>; 
}

const Carousel: React.FC<CarouselProps> = ({ items, swiperRef }) => {
  const prevRef = useRef<HTMLSpanElement>(null);
  const nextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.update();
    }
  }, [swiperRef]);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        // pagination={{ clickable: true }}
        
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        
        onSwiper={(swiper) => {
          swiperRef.current = swiper; 
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item._id}>
            <Card cardType='ebook-card' post={item} />
          </SwiperSlide>
        ))}
        {/* {items.map((item) => (
          <SwiperSlide key={item._id}>
            <Card cardType='ebook-card' post={item} />
          </SwiperSlide>
        ))} */}

        
      </Swiper>

    </>
  );
};

export default Carousel;
