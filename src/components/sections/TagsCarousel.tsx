import React, { useRef, useEffect } from 'react'
import { Post } from '~/interfaces/post'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import { ChevronLeftIcon } from '@sanity/icons'
import { ChevronRightIcon } from '@sanity/icons'

interface TagsCarouselProps {
  tags: Array<any>
  selectedTag: string
  onTagChanges: (tag: any) => void
}

const TagsCarousel: React.FC<TagsCarouselProps> = ({
  tags,
  selectedTag,
  onTagChanges,
}) => {
  const swiperRef = useRef(null)
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.navigation.update()
    }
  }, [swiperRef])

  if (!tags) return null

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        // spaceBetween={30}
        slidesPerView="auto"
        loop={true}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        }}
        // pagination={{ clickable: true }}

        breakpoints={{
          640: {
            slidesPerView: 'auto',
          },
          768: {
            slidesPerView: 'auto',
          },
          1200: {
            slidesPerView: 'auto',
            slidesPerGroup: 2,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        <></>
        {tags.map((tag) => (
          <SwiperSlide
            key={tag._id}
            className="!flex items-center justify-center px-2 md:px-3"
          >
            <span
              onClick={() => onTagChanges(tag)}
              className={`flex py-1 text-[14px] font-medium leading-[1.5] text-center cursor-pointer justify-center
                ${
                  selectedTag === tag?.slug?.current
                    ? 'text-zinc-300'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
            >
              <Link href={`/browse/${tag?.slug?.current}`} scroll={false}>
                <span>{tag?.tagName}</span>
              </Link>
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-prev absolute left-0 cursor-pointer top-[50%] translate-y-[-50%] select-none">
        <ChevronLeftIcon className="text-zinc-200 w-6 h-6 hover:text-white" />
      </div>
      <div className="swiper-next absolute right-0 cursor-pointer top-[50%] translate-y-[-50%] select-none">
        <ChevronRightIcon className="text-zinc-200 w-6 h-6 hover:text-white" />
      </div>
    </>
  )
}

export default TagsCarousel
