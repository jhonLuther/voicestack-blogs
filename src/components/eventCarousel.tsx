import Wrapper from '~/layout/Wrapper';
import React, { useEffect, useRef, useState } from 'react'; // Added useState
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import ImageLoader from './commonSections/ImageLoader';
import Section from './Section';
import SubText from './typography/SubText';
import H4Large from './typography/H4Large';
import { formatDateShort } from '~/utils/formateDate';
import Button from './commonSections/Button';

const EventCarousel = ({ allEventCards,bgColor }: { allEventCards?: any; homeSettings?: any, bgColor?: string }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.navigation.update();
    }
  }, [swiperRef]);

  if(!allEventCards) return null

  return (
    <Section className={`justify-center ${bgColor ? bgColor : 'bg-zinc-900 '}  px-4`}>
      <Wrapper className='w-full relative '>
        <Swiper
          className='w-full h-full'
          modules={[Navigation, Pagination, EffectFade]}
          effect={'fade'}
          // direction={'vertical'}
          fadeEffect={{
            crossFade: true
          }}
          speed={800}
          slidesPerView={1}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {allEventCards && allEventCards.map((events) => (
            <SwiperSlide
              key={events._id}
              className='!flex items-center justify-center '
            >
              <div className={`w-full ${bgColor ? bgColor : 'bg-zinc-900 '} `}>
                <div
                  style={{ backgroundColor: `${events.bgColor ? events.bgColor : '#000000'}` }}
                  className={`flex flex-col md:flex-row gap-3 xl:gap-6 relative group hover:transition duration-500 rounded-lg overflow-hidden`}
                >
                  {events && events?.mainImage && (
                    <div className="w-full md:max-w-[31%] transform transition duration-500 overflow-hidden flex-1 flex xl:flex">
                      <ImageLoader
                        className='transform h-full w-full duration-300  min-h-[156px] md:min-h-[156px]'
                        image={events?.mainImage}
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 gap-4 self-center w-full p-4 md:p-0 md:py-5">
                    <div className='border-b border-[#33333333] pb-4'>
                      <H4Large className={`group-hover: group-hover: line-clamp-3 text-ellipsis overflow-hidden  xl:!text-xl`}>
                        {events.eventDescription}
                      </H4Large>
                    </div>
                    <div className=' flex xl:flex-row gap-x-6 gap-y-3 flex-col justify-between items-start xl:items-center '>
                      <div className='flex items-start md:items-center gap-3 xl:gap-6 flex-col md:flex-row '>
                        <div className={`!bg-[#18181B33] flex flex-shrink-0 pt-[7px] pb-[7px] pl-[10px] pr-[10px] justify-center items-center gap-3 rounded-full  bg-opacity-20 `}>
                          <SubText className='!text-white'>
                            {events.evenTtype == "Online Event" ? "Live Event" : events.evenTtype}
                          </SubText>
                        </div>
                        <div className='flex items-center'>
                          <span className='text-sm xl:text-base'>{`${formatDateShort(events.eventStartDate, true)} - ${formatDateShort(events.eventEndDate)} `}</span>
                          <span className='text-sm xl:text-base pt-0 pl-3 pr-3'>/</span>
                          <span className='text-sm xl:text-base'>{events.eventLocation}</span>
                        </div>
                      </div>
                      <div className='self-auto'>
                        <div className='self-start md:self-center flex justify-center'>
                          <Button className='bg-zinc-900  hover:bg-zinc-700 !no-underline ' link={events?.registrationLink ? events?.registrationLink : 'https://carestack.com/demo'}>
                            <span className='text-base font-medium'>{events.registerBtnTxt ? events.registerBtnTxt : 'Register Now'}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-4 z-50 p-6 pt-0 md:pb-0">
                    {allEventCards && allEventCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => swiperRef.current?.slideTo(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300
                            ${activeIndex === index
                            ? 'bg-white w-4 md:w-2 md:h-4'
                            : 'bg-white/50 hover:bg-white/70'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>
    </Section>
  );
};

export default EventCarousel;