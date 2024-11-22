import Layout from '~/components/Layout';
import Wrapper from '~/layout/Wrapper';
import { useRouter } from 'next/router';
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

const EventCarousel = ({ allEventCards }: { allEventCards?: any; homeSettings?: any }) => {
  if(!allEventCards) return null
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.navigation.update();
    }
  }, [swiperRef]);

  const router = useRouter();
  console.log(allEventCards);


  return (
    <Section className='justify-center bg-zinc-900 !p-0'>
      <Wrapper className='w-full relative h-[200px] '>
        <Swiper
          className='w-full h-full'
          modules={[Navigation, Pagination, EffectFade]}
          effect={'fade'}
          direction={'vertical'}
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
              <div className='w-full bg-zinc-900  '>
                <div
                  style={{ backgroundColor: `${events.bgColor ? events.bgColor : '#000000'}` }}
                  className={`flex flex-col md:flex-row gap-6 relative group hover:transition duration-500 rounded-lg overflow-hidden`}
                >
                  {events && events?.mainImage && (
                    <div className="w-full md:max-w-[393px] transform transition duration-500 overflow-hidden flex-1">
                      <ImageLoader
                        className='transform h-full w-full duration-300  min-h-[156px] md:min-h-[156px]'
                        image={events?.mainImage}
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 gap-4 self-center w-full">
                    <div className='border-b border-[#33333333] pb-4'>
                      <H4Large className={`group-hover: group-hover: line-clamp-3 text-ellipsis overflow-hidden`}>
                        {events.eventDescription}
                      </H4Large>
                    </div>
                    <div className='flex  justify-between items-center '>
                      <div className='flex items-center gap-6'>
                      <div className='flex pt-[7px] pb-[7px] pl-[10px] pr-[10px] justify-center items-center gap-3 rounded-full bg-gray-900 bg-opacity-20 '>
                        <SubText className='!text-white'>
                          {events.evenTtype == "Online Event" ? "Live Event" : events.evenTtype}
                        </SubText>
                      </div>
                      <div className='flex items-center'>
                      <span className=''>
                      {`${formatDateShort(events.eventStartDate, true)} - ${formatDateShort(events.eventEndDate)} `}</span>
                      <span>
                      <span className='pt-0 pl-3 pr-3'>/</span>
                      {events.eventLocation}
                      </span>
                      </div>
             
                      </div>
                      <div>
                        <div className='self-start md:self-center flex justify-center'>
                          <Button className='bg-zinc-900 !px-12 hover:bg-zinc-700 !no-underline ' link={events?.registrationLink ? events?.registrationLink : 'https://carestack.com/demo'}>
                            <span className='text-base font-medium'>{events.registerBtnTxt ? events.registerBtnTxt : 'Register Now'}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4 z-50 p-6 pt-0 pb-0">
                    {allEventCards && allEventCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => swiperRef.current?.slideTo(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300
                            ${activeIndex === index
                            ? 'bg-white h-4'
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