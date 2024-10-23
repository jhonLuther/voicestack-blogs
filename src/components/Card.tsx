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

interface CardProps {
	post: Post;
	cardType?: 'top-image-card' | 'text-only-card' | 'left-image-card' | 'ebook-card' | 'featured' | 'top-image-smallCard' | 'podcast-card' | 'top-image-contentType-card';
	className?: string;
	cardColor?: string
	showPlayIcon?: boolean
	isLast?: boolean;
	varyingIndex?: any
}

export default function Card({ post, isLast, cardType, className, cardColor, varyingIndex, showPlayIcon = false }: CardProps) {

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
						<div className='overflow-hidden rounded-t-lg'>
							{(post.mainImage) ? (
								<div className="w-auto  block min-h-[350px] h-[350px] object-center object-cover transform transition duration-500"
								>
									<ImageLoader
										className='transform  duration-300 group-hover:scale-105'
										image={post?.mainImage}
										useClientWidth={true}
									/>
								</div>
							) :
								<ImageLoader
									className="min-h-[350px]"
									image={siteConfig.placeHolder.podcastCover}
									useClientWidth={true}
								/>
							}
						</div>
						<div className="flex rounded-b-lg p-9 bg-bg-green flex-col items-start gap-10 flex-1">
							<div className="flex flex-col gap-3">
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
							</div>
							{post.author && post.author.length > 0 && (
								<AuthorInfo author={post.author} />
							)}
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
									<ImageLoader
										className="w-full h-auto object-cover"
										image={post?.mainImage}
										alt={post.title || 'Podcast Image'}
									/>
								) :
									<ImageLoader
										className='w-full h-auto object-cover'
										image={siteConfig.placeHolder.podcastHeroCover}
									/>
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
									<ImageLoader
										className="rounded-md object-cover group-hover:scale-105 transition duration-500"
										image={post.mainImage}
										height={173}
										width={240}
									/>
								)}
								<div className="flex flex-col flex-1">
									{post.contentType && (
										<SubText >
											{post.contentType}
										</SubText>
									)}
									<H4Large className={`group-hover: group-hover:underline underline-offset-4`}>
										{post.title}
									</H4Large>
									<p className="text-gray-700">{post.desc || ''}</p>
									<span className="text-gray-500 text-sm">{post.author[0]?.name || ''} · {`${post?.estimatedReadingTime} min read `}</span>
								</div>
							</div>
						</Link>
					)

						: cardType === 'text-only-card' ? (
							<div className={`flex flex-col flex-1 w-full group hover:scale-100 transform duration-300 ${className} `}>
								<Link href={linkUrl}>
									<div className={`${!isLast && `border-b-2`} pb-6 flex flex-col gap-3 border-b-2 border-gray-800`}>
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
										<div className='overflow-hidden'>
											{post.mainImage && (
												<ImageLoader
													className="w-full h-auto rounded-t-md min-h-[250px] object-center object-cover md:w-auto group-hover:scale-105 transition duration-500"
													image={post.mainImage}

												/>
											)}
										</div>
										<div className="flex py-10 px-9  rounded-b-md bg-cs-purple flex-col items-start gap-10 flex-1">
											<div className="flex flex-col gap-3">
												{post.contentType && (
													<SubText >
														{post.contentType}
													</SubText>
												)}
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
											<div className={`flex gap-6 items-center justify-center transition-all duration-500 h-full  rounded-lg ${className}`}>
												<div className="relative w-48 h-48">
													{post.mainImage && (
														<ImageLoader
															className=" object-cover w-48 h-48"
															image={post.mainImage}
														/>
													)

													}
													<div className="absolute inset-0 flex items-center justify-center">
														<svg xmlns="http://www.w3.org/2000/svg" width="56" height="55" viewBox="0 0 56 55" fill="none">
															<rect x="0.5" width="55" height="55" rx="27.5" fill="black" />
															<path d="M21.2549 18.8935C21.2549 17.6708 22.5997 16.9255 23.6365 17.5735L37.8221 26.4395C38.7976 27.0492 38.7976 28.4698 37.8221 29.0795L23.6365 37.9455C22.5997 38.5935 21.2549 37.8481 21.2549 36.6255V18.8935Z" fill="white" />
														</svg>
													</div>
												</div>
												<div className="flex flex-col h-full justify-center flex-1 gap-3">
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
										</Link>
									)

										: (

											// default card
											<div className={`flex flex-col w-full min-h-[250px] group  `}>
												<Link href={linkUrl}>
													{(post.mainImage || post.image) && (
														<div className="overflow-hidden ">
															<ImageLoader
																className=" object-center object-cover group-hover:scale-110 transition-transform duration-300"
																image={post?.mainImage}
																alt={post.title || 'Blog Image'}
																height={varyingIndex ? 553 : 173}
																width={411}
															/>
														</div>
													)
													}
													<div className="mt-4 flex flex-col gap-1">
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
												</Link>
											</div>
										)}
		</React.Fragment>
	);
}
