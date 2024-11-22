
import Layout from '~/components/Layout';
import Wrapper from '~/layout/Wrapper';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import ImageLoader from './commonSections/ImageLoader';
import Section from './Section';

const EventCarousel = ({ allEventCards }: { allEventCards?: any; homeSettings?: any }) => {
  const swiperRef = useRef(null);
  
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.navigation.update();
    }
  }, [swiperRef]);

  const router = useRouter();
  console.log(allEventCards, 'allEventCards');

  return (
    <Section className='justify-center bg-zinc-900'>
      <Wrapper className='w-full relative h-[200px]'> 
        <Swiper
          className='w-full h-full' 
          modules={[Navigation, Pagination, EffectFade]}
          effect={'fade'}
          direction={'vertical'}
          fadeEffect={{
            crossFade: true
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
          }}
          speed={800} 
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {allEventCards && allEventCards.map((events) => (
            <SwiperSlide 
              key={events._id} 
              className='!flex items-center justify-center px-2 md:px-3'
            >
              <div className="w-full h-full relative">
                <div className="absolute inset-0 z-10">
                  <ImageLoader 
                    image={events?.mainImage}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 z-20" /> 
                <div className="relative z-30 flex items-center justify-center h-full">
                  <span className='text-white text-4xl font-bold'>
                    {events.eventName}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="swiper-pagination absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4 z-50">
          {allEventCards && allEventCards.map((_, index) => (
            <button
              key={index}
              onClick={() => swiperRef.current?.slideTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300
                ${swiperRef.current?.realIndex === index 
                  ? 'bg-white h-4' 
                  : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </Wrapper>
    </Section>
  );
};

export default EventCarousel;