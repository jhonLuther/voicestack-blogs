import Image from 'next/image';
import { Post } from '~/interfaces/post';
import { urlForImage } from '~/lib/sanity.image';
import { formatDate } from '~/utils';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { getBasePath } from '~/utils/getBasePath';
import { formatDateShort } from '~/utils/formateDate';
import siteConfig from 'config/siteConfig';

interface CardProps {
  post: Post;
  cardType?: 'top-image-card' | 'text-only-card' | 'left-image-card' | 'ebook-card' | 'featured' | 'top-image-smallCard' | 'podcast-card' | 'top-image-contentType-card';
  className?: string;
  cardColor?: string
  showPlayIcon?: boolean
  isLast?: boolean;
}

export default function Card({ post, isLast, cardType, className, cardColor, showPlayIcon = false }: CardProps) {

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
          <div className="flex flex-col gap-1 group overflow-hidden">
            <div className='overflow-hidden'>
              {(post.mainImage || post.image) ? (
                <Image
                  className="w-auto rounded-b-md block min-h-[250px] object-center object-cover group-hover: scale-100 transition duration-500 "
                  src={urlForImage(post.mainImage || post.image).width(700).height(350).url()}
                  height={350}
                  width={700}
                  alt={post.title || 'Blog Image'}
                />
              ) :
                <div className='absolute w-48 h-48 md:w-48 md:h- top-0 left-0'>
                  <Image
                    className='object-cover  w-48 h-48'
                    src={siteConfig.placeHolder.podcastCover}
                    height={400}
                    width={300}
                    alt={post.title || 'Blog Image'}
                  />
                </div>
              }
            </div>
            <div className="flex pt-[42px] px-9 pb-[42px] rounded-t-md bg-bg-green flex-col items-start gap-10 flex-1">
              <div className="flex flex-col gap-3">
                {post.tags && post.tags[0] && (
                  <span className="uppercase text-white font-inter text-sm font-medium">
                    {post?.tags[0]?.tagName}
                  </span>

                )}
                <h2 className="card-content font-manrope md:text-5xl text-2xl text-white font-extrabold group-hover: group-hover:underline underline-offset-4">{post.title}</h2>
                <p className="text-white font-inter text-lg font-normal line-clamp-2 overflow-hidden">
                  {post.desc ? post.desc : post.excerpt}
                </p>
              </div>
              <span className="text-white font-inter text-lg font-semibold">
                {post.author?.name || ''}
              </span>
            </div>
          </div>
        </Link>
      ) :

        cardType === 'top-image-contentType-card' ? (
          <Link href={linkUrl}>
            <div className={`flex flex-col rounded-lg overflow-hidden ${className}`}>
              <div className="bg-purple-600 gap-2  text-white px-9 py-11 flex flex-col min-h-60">
                <span className="uppercase text-sm font-medium">{post.tags && post?.tags[0]?.tagName}</span>
                <h2 className="text-3xl font-bold my-2">{post.title}</h2>
                <p className="text-lg font-normal line-clamp-3 overflow-hidden">{post.desc || post.excerpt}</p>
              </div>

              <div className="relative w-full">
                {post.mainImage ? (
                  <Image
                    className="w-full h-auto object-cover"
                    src={urlForImage(post.mainImage).width(800).height(400).url()}
                    alt={post.title || 'Podcast Image'}
                    width={800}
                    height={400}
                  />
                ) :
                  <div className=' '>
                    <Image
                      className='w-full h-auto object-cover'
                      src={siteConfig.placeHolder.podcastHeroCover}
                      height={800}
                      width={400}
                      alt={post.title || 'Blog Image'}
                    />
                  </div>
                }
                {showPlayIcon && <div className="absolute gap-4 bottom-14 max-w-44 right-10 bg-white text-black p-3 rounded-full  shadow-md flex items-center">

                  <div className='flex flex-col pl-5'>
                    <span className='text-xs font-semibold'>{`Listen Now`}</span>
                    <span className="text-xs font-normal text-cs-gray-700">{`${post.duration || '0:00'} min`}</span>
                  </div>


                  <button className="flex items-center justify-center bg-black text-white p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M8 5v14l11-7L8 5z" />
                    </svg>
                  </button>
                </div>}
              </div>
            </div>
          </Link>
        )
          :
          cardType === 'left-image-card' ? (
            <Link href={linkUrl}>
              <div className={`flex flex-row gap-4 items-center group hover: transition duration-500 ${className}`}>
                {post.mainImage && (
                  <Image
                    className="w-1/3 rounded-md object-cover group-hover:scale-105 transition duration-500"
                    src={urlForImage(post.mainImage).width(400).height(300).url()}
                    height={300}
                    width={400}
                    alt={post.title || 'Blog Image'}
                  />
                )}
                <div className="flex flex-col flex-1">
                  {post.tags && post.tags[0] && (
                    <span className="uppercase text-sm font-medium text-gray-600">{post?.tags[0]?.tagName}</span>
                  )}
                  <h2 className="md:text-2xl  text-base font-semibold text-gray-900 group-hover: group-hover:underline line-clamp-2 overflow-hidden">
                    {post.title}
                  </h2>
                  <p className="text-gray-700">{post.desc || ''}</p>
                  <span className="text-gray-500 text-sm">{post.author[0]?.name || ''} · {`${post?.estimatedReadingTime} min read `}</span>
                </div>
              </div>
            </Link>
          )

            : cardType === 'text-only-card' ? (
              <div className={`flex flex-col flex-1 w-full group hover:scale-100 transform duration-300 ${className} `}>
                <Link href={linkUrl}>
                  <div className={`${!isLast && `border-b-2`} pb-6 flex flex-col gap-3 ${cardColor === 'white' ? 'border-white' : 'border-gray-900'} group-hover:border-gray-600`}>
                    {post.tags && post.tags[0] && (
                      <span className="uppercase font-inter text-sm font-medium">{post?.tags[0]?.tagName}</span>
                    )}
                    <h3 className={`text-4xl font-bold font-manrope ${cardColor === 'white' ? 'text-white' : 'text-gray-900'} w-full group-hover: group-hover:underline underline-offset-4`}>
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ) :
              cardType === 'top-image-smallCard' ? (
                <Link href={linkUrl}>
                  <div className="flex flex-col gap-1 group hover: transition duration-500 overflow-hidden">
                    <div className='overflow-hidden'>
                      {post.mainImage && (
                        <Image
                          className="w-full h-auto rounded-t-md min-h-[250px] object-center object-cover md:w-auto group-hover:scale-105 transition duration-500"
                          src={urlForImage(post.mainImage).width(519).height(537).url()}
                          height={537}
                          width={519}
                          alt={post.title || 'Blog Image'}
                        />
                      )}
                    </div>
                    <div className="flex py-10 px-9  rounded-b-md bg-cs-purple flex-col items-start gap-10 flex-1">
                      <div className="flex flex-col gap-3">
                        {post.tags && post.tags.map((tag, i) => (
                          i === 0 && <span key={i} className="uppercase text-white font-inter text-sm font-medium">
                            {tag?.tagName}
                          </span>
                        ))}
                        <h2 className="card-content md:text-5xl text-2xl font-manrope text-white font-extrabold group-hover: group-hover:underline underline-offset-4">{post.title}</h2>
                        <p className="text-white font-inter text-lg font-normal line-clamp-2 overflow-hidden">
                          {post.desc ? post.desc : post.excerpt}
                        </p>
                      </div>
                      <span className="text-white font-inter text-lg font-semibold">
                        {post.author?.name || ''}
                      </span>
                    </div>
                  </div>
                </Link>
              ) :



                cardType === 'featured' ? (
                  <div className="card featured-card">
                    {post.mainImage && (
                      <Image
                        src={urlForImage(post.mainImage).width(800).height(400).url()}
                        alt={post.title || 'Featured Blog Image'}
                        width={800}
                        height={400}
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
                      <div className={`flex gap-6 items-center justify-center transition-all duration-500 h-full  rounded-lg ${className}`}>
                        <div className="relative w-48 h-48">
                          {post.mainImage ? (
                            <Image
                              className=" object-cover w-48 h-48"
                              src={urlForImage(post.mainImage).width(400).height(300).url()}
                              alt={post.title || 'Podcast Image'}
                              layout="fill"
                              objectFit="cover"
                            />
                          ) :

                            <div className='absolute w-48 h-48 md:w-48 md:h- top-0 left-0'>
                              <Image
                                className='object-cover  w-48 h-48'
                                src={siteConfig.placeHolder.podcastCover}
                                height={400}
                                width={300}
                                alt={post.title || 'Blog Image'}
                              />
                            </div>

                          }
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="55" viewBox="0 0 56 55" fill="none">
                              <rect x="0.5" width="55" height="55" rx="27.5" fill="black" />
                              <path d="M21.2549 18.8935C21.2549 17.6708 22.5997 16.9255 23.6365 17.5735L37.8221 26.4395C38.7976 27.0492 38.7976 28.4698 37.8221 29.0795L23.6365 37.9455C22.5997 38.5935 21.2549 37.8481 21.2549 36.6255V18.8935Z" fill="white" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex flex-col h-full justify-center flex-1 gap-3">
                          {post.tags && post.tags[0] && (
                            <span className="uppercase text-sm font-medium text-cs-black">
                              {post?.tags[0]?.tagName}
                            </span>
                          )}
                          <h2 className="md:text-2xl font-manrope text-lg font-extrabold text-gray-900 group-hover:underline transition-all line-clamp-2">
                            {post.title}
                          </h2>
                          {post.author && post.author.length > 0 && (
                            <span className='text-[12px] font-medium'>{`by ${post.author[0].name ? post.author[0].name : ''}`}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  )

                    : (

                      // default card
                      <div className="flex flex-col w-full min-h-[250px] group">
                        <Link href={linkUrl}>
                          {(post.mainImage || post.image) ? (
                            <div className="overflow-hidden rounded-lg">
                              <Image
                                className="w-auto min-h-[250px] object-center object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                                src={
                                  post.mainImage
                                    ? urlForImage(post.mainImage).width(411).height(170).url()
                                    : urlForImage(post.image).width(411).height(170).url()
                                }
                                height={170}
                                width={411}
                                alt={post.title || 'Blog Image'}
                              />
                            </div>
                          ) :
                            <Image
                              src={'https://cdn.sanity.io/images/bbmnn1wc/production/9cb0d15a2b39b73dcb35b588b6aef6e9c50742c2-2500x2000.jpg'}
                              height={170}
                              width={411}
                              alt={post.title || 'Blog Image'}


                            />

                          }
                          <div className="mt-4">top-image-contentType-card
                            <h3 className="text-ellipsis h-auto line-clamp-1 overflow-hidden w-full">

                              <span className="text-gray-950 text-xl font-semibold group-hover:underline underline-offset-2">
                                {post.title}
                              </span>
                            </h3>
                            <div className="flex flex-col gap-1">
                              {post.tags && post.tags.map((tag, i) => (
                                <span key={tag?._id || i} className="text-violet-800">
                                  {tag?.tagName}
                                </span>
                              ))}
                              {post.contentType && (
                                <span className="text-sm uppercase text-cs-100">{post.contentType}</span>
                              )}
                              {post.author && (
                                <span>{`${post.author.name ? ` by ${post.author.name}` : ""}`}</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    )}
    </React.Fragment>
  );
}
