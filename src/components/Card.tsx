import { Post } from '~/interfaces/post';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { getBasePath } from '~/utils/getBasePath';
import siteConfig from 'config/siteConfig';
import H3Large from './typography/H3Large';
import SubText from './typography/SubText';
import ImageLoader from './commonSections/ImageLoader';
import H4Large from './typography/H4Large';
import H3XL from './typography/H3XL';
import AuthorInfo from './commonSections/AuthorInfo';
import DescriptionText from './typography/DescriptionText';
import Image from 'next/image';

import SoundIcon from '../assets/speakerIcon.svg';
import PlayIcon from '../assets/playButton.svg';

import { ArrowTopRightIcon } from '@sanity/icons'
import { formatDateShort } from '~/utils/formateDate';
import DurationSection from './commonSections/DurationSection';
interface CardProps {
  post: Post;
  cardType?: 'top-image-card' | 'text-only-card' | 'left-image-card' | 'ebook-card' | 'featured' | 'top-image-smallCard' | 'podcast-card' | 'top-image-contentType-card';
  className?: string;
  cardColor?: string
  showPlayIcon?: boolean
  isLast?: boolean;
  varyingIndex?: any
  reverse?: boolean
}

export default function Card({ post, isLast, cardType, reverse, className, cardColor, varyingIndex, showPlayIcon = false }: CardProps) {

  const [linkUrl, setLinkUrl] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady && post?.slug) {
      const contentTypePath = getBasePath(router, post.contentType);
      setLinkUrl(`/${contentTypePath}/${post.slug.current}`);
    }
  }, [post?.contentType, post?.slug]);

  if (!post || !linkUrl) {
    return null;
  }


  return (
    <React.Fragment>
      {cardType === 'top-image-card' ? (
        <Link href={linkUrl}>
          <div className={`flex flex-col gap-1 ${reverse ? 'flex-col-reverse' : ''} group overflow-hidden text-white`}>
            <div className={`overflow-hidden ${reverse ? 'rounded-b-lg' : 'rounded-t-lg'}`}>
              {(post.mainImage) ? (
                <div className="w-auto transform transition duration-500"
                >
                  <ImageLoader
                    className='transform   duration-300 group-hover:scale-105'
                    image={post?.mainImage}
                    useClientWidth={true}
                  />
                </div>
              ) :
                <ImageLoader
                  // className="min-h-[350px]"
                  image={siteConfig.placeHolder.podcastCover}
                  useClientWidth={true}
                />
              }
            </div>
            <div className={`flex ${reverse ? 'rounded-t-lg' : 'rounded-b-lg'} p-9 ${cardColor ? cardColor : 'bg-orange-700'} flex-col items-start gap-10 flex-1`}>
              <div className="flex flex-col gap-3">
                {post.contentType && (
                  <SubText className='text-white' >
                    {post.contentType}
                  </SubText>
                )}
                <H3XL className='group-hover:underline underline-offset-4'>
                  {post.title}
                </H3XL>
                <DescriptionText className='text-opacity-70 line-clamp-3 overflow-hidden text-ellipsis'>
                  {post.desc ? post.desc : post.excerpt}
                </DescriptionText>
              </div>
              {post.author && post.author.length > 0 && (
                <AuthorInfo author={post.author} showNameOnly={true} />
              )}
            </div>
          </div>
        </Link>
      ) :

        cardType === 'left-image-card' ? (
          <Link href={linkUrl}>
            <div className={`flex flex-row gap-6 relative items-center group hover: transition duration-500 ${className}`}>
              {post.mainImage && (
                <div className="w-auto rounded-lg transform transition duration-500 overflow-hidden"
                >
                  <ImageLoader
                    className='transform   duration-300 group-hover:scale-105'
                    image={post?.mainImage}
                    width={200}
                    height={154}
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 gap-2">
                {post.contentType && (
                  <SubText >
                    {post.contentType}
                  </SubText>
                )}
                <H4Large className={`group-hover: group-hover:underline underline-offset-4 line-clamp-3 text-ellipsis overflow-hidden`}>
                  {post.title}
                </H4Large>
                <DurationSection className={'!text-zinc-500'} contentType={post.contentType} duration={post?.estimatedReadingTime ? post.estimatedReadingTime : post.duration} date={post?.date ? post?.date : ""}></DurationSection>
              </div>

              {
                post.contentType === 'podcast' ? (
                  <div className='absolute bottom-3 left-3 flex items-center gap-2'>
                    <Image src={SoundIcon} alt="soundIcon" />
                    <span className='text-white text-sm font-medium'> {`Listen Now`}</span>
                  </div>) :
                  post.contentType === 'webinar' ? (
                    <div className='absolute bottom-3 left-3 flex items-center gap-2'>
                      <Image src={PlayIcon} alt="playIcon" />
                      <span className='text-white text-sm font-medium'>{`Watch`}</span>
                    </div>
                  ) : ""
              }
            </div>
          </Link>
        )

          : cardType === 'text-only-card' ? (
            <div className={`flex flex-col flex-1 w-full group hover:scale-100 transform duration-300 ${className} `}>
              <Link href={linkUrl}>
                <div className={`${!isLast && `border-b-2`} pb-6 flex flex-col gap-3  border-gray-800`}>
                  {post.contentType && (
                    <SubText >
                      {post.contentType}
                    </SubText>
                  )}
                  <H3Large className={`group-hover: group-hover:underline underline-offset-4`}>
                    {post.title}
                  </H3Large>
                </div>
              </Link>
            </div>
          ) :
            cardType === 'top-image-smallCard' ? (
              <Link href={linkUrl}>
                <div className="flex flex-col gap-1 group hover: transition duration-500 overflow-hidden">
                  <div className='overflow-hidden '>
                    {post.mainImage && (
                      <ImageLoader
                        className="w-full  object-cover transform  duration-300 group-hover:scale-105"
                        image={post.mainImage}
                      />
                    )}
                  </div>
                  <div className="flex  p-9  bg-cs-purple flex-col items-start gap-10 flex-1">
                    <div className="flex flex-col gap-2 text-white">
                      {post.contentType && (
                        <SubText className='text-white' >
                          {post.contentType}
                        </SubText>
                      )}
                      <H3XL >
                        {post.title}
                      </H3XL>
                      <DescriptionText className='text-opacity-70 line-clamp-3 overflow-hidden text-ellipsis'>
                        {post.desc ? post.desc : post.excerpt}
                      </DescriptionText>
                      {post.author && post.author.length > 0 && (
                        <AuthorInfo author={post.author} />
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ) :

              cardType === 'featured' ? (
                <div className="card featured-card">
                  {post.mainImage && (
                    <ImageLoader
                      image={post.mainImage}
                      className="rounded-lg object-cover w-full"
                    />
                  )}
                  <div className="mt-6">
                    <h3 className="font-semibold text-2xl">{post.title}</h3>
                    <p className="text-gray-700 mt-2">{post.excerpt || ''}</p>
                  </div>
                </div>
              ) :

                cardType === 'podcast-card' ? (
                  <Link href={linkUrl}>
                    <div className={`flex flex-col h-full flex-1  relative items-center group hover: transition duration-500 ${className}`}>
                      {post.mainImage && (
                        <div className="w-auto rounded-t-lg transform transition duration-500 overflow-hidden"
                        >
                          <ImageLoader
                            className='transform  rounded-lg  duration-300 group-hover:scale-105'
                            image={post?.mainImage}
                            width={290}
                            height={220}
                          />
                          {
                            post.contentType === 'podcast' ? (
                              <div className='absolute bottom-6 left-6 flex items-center gap-2'>
                                <Image src={SoundIcon} alt="soundIcon" />
                                <span className='text-white text-sm font-medium'> {`Listen Now`}</span>
                              </div>) :
                              post.contentType === 'webinar' ? (
                                <div className='absolute bottom-6 left-6 flex items-center gap-2'>
                                  <Image src={PlayIcon} alt="playIcon" />
                                  <span className='text-white text-sm font-medium'>{`Watch`}</span>
                                </div>
                              ) : ""
                          }
                        </div>
                      )}
                      <div className='flex p-6 bg-gray-100 w-full justify-center'>
                        <span className="text-zinc-900, text-sm font-medium text-center">by {post.author[0]?.name || ''}</span>
                      </div>
                      <div className='flex gap-3 flex-col '>
                        <div className="flex flex-col flex-1 gap-2 pt-6">
                          {post.contentType && (
                            <SubText >
                              {post.contentType}
                            </SubText>
                          )}
                          <H4Large className={`group-hover: group-hover:underline underline-offset-4 line-clamp-3 text-ellipsis overflow-hidden`}>
                            {post.title}
                          </H4Large>
                        </div>
                        <span className="text-gray-500 text-sm "> {`${post?.estimatedReadingTime ? post.estimatedReadingTime : post.duration} ${post.contentType === 'article' || post.contentType === 'press-release' ? 'min read' : ''}   `}</span>
                      </div>
                    </div>
                  </Link>
                ) : cardType === 'ebook-card' ? (
                  <div className={`flex flex-col w-full min-h-[250px] h-full group`}>
                    <Link href={linkUrl} className='flex-1 flex'>
                      <div className='relative flex flex-col'>
                        {(post.mainImage || post.image) && (
                          <div className="overflow-hidden absolute left-0 right-0 top-0 bottom-0 rounded-lg">
                            <ImageLoader
                              className="object-center object-cover group-hover:scale-110 transition-transform duration-300"
                              image={post?.mainImage}
                              alt={post.title || 'Blog Image'}
                              height={varyingIndex ? 553 : 173}
                              width={411}
                              useClientWidth={true}
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-1 relative p-8 flex-1">
                          <div className="bg-white rounded p-5 h-full">
                            {post.contentType && (
                              <SubText >
                                {post.contentType}
                              </SubText>
                            )}
                            <H4Large className={`group-hover: group-hover:underline underline-offset-4`}>
                              {post.title}
                            </H4Large>
                            {post.author && post.author.length > 0 && (
                              <span className='text-[12px] font-medium'>{`by ${post.author[0].name ? post.author[0].name : ''}`}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )

                  : (

                    // default card
                    <div className={`flex flex-col group relative h-full`}>
                      <Link href={linkUrl} className='flex flex-col h-full'>
                        {(post.mainImage || post.image) && (
                          <div className={`overflow-hidden ${varyingIndex ? 'rounded-t-lg  flex-1' : 'rounded-lg'} relative  w-full`}>
                            <ImageLoader
                              className="h-full"
															imageClassName='group-hover:scale-105 transition-transform duration-300 w-full h-full inline'
                              image={post?.mainImage}
                              alt={post.title || 'Blog Image'}
                              // height={varyingIndex ? 553 : 173}
                              // width={411}	
                            />
                            {
                              post.contentType === 'podcast' ? (
                                <div className='absolute bottom-6 left-6 flex items-center gap-2'>
                                  <Image src={SoundIcon} alt="soundIcon" />
                                  <span className='text-white text-sm font-medium'> {`Listen Now`}</span>
                                </div>) :
                                post.contentType === 'webinar' ? (
                                  <div className='absolute bottom-6 left-6 flex items-center gap-2'>
                                    <Image src={PlayIcon} alt="playIcon" />
                                    <span className='text-white text-sm font-medium'>{`Watch`}</span>
                                  </div>
                                ) : ""
                            }
                          </div>
                        )}
                        {

                          <div className={`${varyingIndex ? 'p-8 bg-indigo-900 text-white rounded-b-lg mt-1' : 'mt-6'} flex flex-col gap-1 min-h-[154px]`}>
                            <div className='flex flex-col flex-grow'>
                              {post.contentType && (
                                <SubText className={varyingIndex ? 'text-white' : ''}>
                                  {post.contentType}
                                </SubText>
                              )}
                              <H4Large className='group-hover:group-hover:underline underline-offset-4'>
                                {post.title}
                              </H4Large>
                            </div>

                            {varyingIndex ? (
                              <div className='flex items-center gap-2 pt-8'>
                                <span className='text-base font-medium'>{`${post.contentType === "podcast" ? "Listen Now" :
                                  post.contentType === "webinar" ? "Watch" : "Read Now"}`}</span>
                                <ArrowTopRightIcon className='group-hover:translate-y-[-2px] transition-transform duration-300' height={20} width={20} />
                              </div>
                            ) : (
                              <DurationSection className={'!text-zinc-500'} contentType={post.contentType} duration={post?.estimatedReadingTime ? post.estimatedReadingTime : post.duration} date={post?.date ? post?.date : ""}></DurationSection>
                            )}
                          </div>
                        }
                      </Link>
                    </div>
                  )}
    </React.Fragment>
  );
}
