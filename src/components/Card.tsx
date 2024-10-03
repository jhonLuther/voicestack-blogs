import Image from 'next/image';
import { Post } from '~/interfaces/post';
import { urlForImage } from '~/lib/sanity.image';
import { formatDate } from '~/utils';
import React from 'react';
import Link from 'next/link';

interface CardProps {
  post: Post;
  cardType?: 'top-image-card' | 'text-only-card' | 'left-image-card' | 'ebook-card' | 'featured' | 'top-image-smallCard';
  className?: string;
  cardColor?: string
}

export default function Card({ post, cardType, className,cardColor }: CardProps) {


  return (
    <React.Fragment>
      {cardType === 'top-image-card' ? (
        <Link href={`/post/${post.slug && post.slug.current}`}>
          <div className="flex flex-col gap-1 group overflow-hidden">
            <div className='overflow-hidden'>
              {post.mainImage && (
                <Image
                  className="w-auto rounded-b-md block min-h-[250px] object-center object-cover group-hover: scale-100 transition duration-500 "
                  src={urlForImage(post.mainImage).width(700).height(350).url()}
                  height={350}
                  width={700}
                  alt={post.title || 'Blog Image'}
                />
              )}
            </div>
            <div className="flex pt-[42px] px-9 pb-[42px] rounded-t-md bg-bg-green flex-col items-start gap-10 flex-1">
              <div className="flex flex-col gap-3">
                {post.tags && post.tags[0] && (
                  <span className="uppercase text-white font-inter text-sm font-medium">
                    {post.tags[0].tagName}
                  </span>
                )}
                <h2 className="card-content font-manrope md:text-5xl text-2xl text-white font-extrabold group-hover: group-hover:underline underline-offset-4">{post.title}</h2>
                <p className="text-white font-inter text-lg font-normal line-clamp-2 overflow-hidden">
                  {post.desc? post.desc :  post.excerpt}
                </p>
              </div>
              <span className="text-white font-inter text-lg font-semibold">
                {post.author?.name || ''}
              </span>
            </div>
          </div>
        </Link>
      ) :

        cardType === 'left-image-card' ? (
        <Link href={`/post/${post.slug && post.slug.current}`}>
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
                <span className="uppercase text-sm font-medium text-gray-600">{post.tags[0].tagName}</span>
              )}
              <h2 className="md:text-2xl  text-base font-semibold text-gray-900 group-hover: group-hover:underline line-clamp-2 overflow-hidden">
                {post.title}
              </h2>
              <p className="text-gray-700">{post.desc || ''}</p>
              <span className="text-gray-500 text-sm">{post.author?.name || ''} · {formatDate(post._createdAt)}</span>
            </div>
          </div>
        </Link>
        )



          : cardType === 'text-only-card' ? (
            <div className={`flex flex-col flex-1 w-full group hover:scale-100 transform duration-300 ${className} `}>
              <Link href={`/${cardColor === 'white' ? 'podcasts' : 'post'}/${post.slug && post.slug.current}`}>
                <div className={`border-b-2 pb-6 flex flex-col gap-3 ${cardColor === 'white' ? 'border-white' : 'border-gray-900'  } group-hover:border-gray-600`}>
                  {post.tags && post.tags[0] && (
                    <span className="uppercase font-inter text-sm font-medium">{post.tags[0].tagName}</span>
                  )}
                  <h3 className={`text-4xl font-bold font-manrope ${cardColor === 'white' ? 'text-white' : 'text-gray-900'  } w-full group-hover: group-hover:underline underline-offset-4`}>
                    {post.title}
                  </h3>
                </div>
              </Link>
            </div>
          ) :
            cardType === 'top-image-smallCard' ? (
              <Link href={`/post/${post.slug && post.slug.current}`}>
                <div className="flex flex-col gap-1 group hover: transition duration-500 overflow-hidden">
                  <div className='group-hover:scale-105 transition duration-500 overflow-hidden'>
                    {post.mainImage && (
                      <Image
                        className="w-full h-auto rounded-t-md min-h-[250px] object-center object-cover md:w-auto"
                        src={urlForImage(post.mainImage).width(519).height(537).url()}
                        height={537}
                        width={519}
                        alt={post.title || 'Blog Image'}
                      />
                    )}
                  </div>
                  <div className="flex py-10 px-9  rounded-b-md bg-cs-purple flex-col items-start gap-10 flex-1">
                    <div className="flex flex-col gap-3">
                      {post.tags && post.tags.map((tag,i) => (
                        i === 0 && <span key={i} className="uppercase text-white font-inter text-sm font-medium">
                          {tag.tagName}
                        </span>
                      ))}
                      <h2 className="card-content md:text-5xl text-2xl font-manrope text-white font-extrabold group-hover: group-hover:underline underline-offset-4">{post.title}</h2>
                      <p className="text-white font-inter text-lg font-normal line-clamp-2 overflow-hidden">
                      {post.desc? post.desc :  post.excerpt}
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
              ) : (

                // default card
                <div className="flex flex-col w-full min-h-[250px] group hover:scale-105 transform duration-300">
                  {(post.mainImage || post.image) && (
                    <Image
                      className="w-auto min-h-[250px] object-center object-cover rounded-lg"
                      src={
                        post.mainImage
                          ? urlForImage(post.mainImage).width(411).height(170).url()
                          : urlForImage(post.image).width(411).height(170).url()
                      }
                      height={170}
                      width={411}
                      alt={post.title || 'Blog Image'}
                    />
                  )}
                  <div className="mt-4">
                    <h3 className="text-ellipsis h-auto line-clamp-1 overflow-hidden w-full">
                      <Link href={`/post/${post.slug && post.slug.current}`}>
                        <span className="text-gray-950 text-xl font-semibold group-hover:underline underline-offset-2">
                          {post.title}
                        </span>
                      </Link>
                    </h3>
                    <div className="flex flex-col gap-1">
                      {post.tags && post.tags.map((tag,i) => (
                        <span key={tag._id || i} className="text-violet-800">
                          {tag.tagName}
                        </span>
                      ))}
                      {post.contentType && (
                        <span className="text-sm uppercase text-cs-100">{post.contentType}</span>
                      )}
                      {post.author && (
                        <span>{`${post.author.name  ?` by ${post.author.name}`: ""}`}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
    </React.Fragment>
  );
}
