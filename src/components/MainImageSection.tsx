import Breadcrumb from './commonSections/BreadCrumb'
import ImageLoader from './commonSections/ImageLoader'
import { getClient } from '~/lib/sanity.client'
import Wrapper from '../layout/Wrapper'
import useMediaQuery from '~/utils/useMediaQueryHook'
import DurationSection from './commonSections/DurationSection'
import Section from './Section'
import {useMemo } from 'react'
import SubText from './typography/SubText'
import React from 'react'

interface Props {
	post?: any
	isAuthor?: any
	enableDate?: boolean
	isAudio?: boolean
	contentType?: string
	landing?: boolean
}

const MainImageSection = ({ post, isAuthor, enableDate = false, isAudio = false, contentType, landing = false }: Props) => {

	const tag = useMemo(() => post?.tags?.find((tag) => tag) || null, [post?.tags]);

	const isMobile: any = useMediaQuery(767);
	const client = getClient()

	if (!post) {
		return null
	}

	return (
		<div className='w-full flex gap-1 items-center bg-zinc-900 relative overflow-hidden' >
			<Section className={`justify-center w-full !py-0`}>
				<Wrapper className="z-10 flex h-auto flex-col md:flex-row">
					<div className='flex flex-col items-start  gap-32 text-white md:max-w-[46%] max-w-lg h-full justify-center py-8 md:py-12 md:min-h-[550px]'>
						<div className={`flex flex-col items-start ${landing ? 'justify-center' : 'justify-between'} h-full gap-6 md:gap-24`}>
							{!landing && <Breadcrumb />}
							<div>
								{!landing ? (
									<SubText className='!text-sky-500 mb-3 block'>{tag?.tagName ? tag?.tagName : ''}</SubText>
								):(
									<SubText className='!text-yellow-500 mb-3 block'>{post?.tagName ? post?.tagName : ''}</SubText>
								)}
								<h1 className="text-white font-manrope leading-tight lg:text-5xl text-2xl font-bold  mb-[10px]">
									{post.title ? post.title : 'Post Title'}
								</h1>
								{
									enableDate && <DurationSection isAudio={isAudio} duration={post?.estimatedReadingTime ? post.estimatedReadingTime : post.duration} contentType={contentType} date={post?.date ? post?.date : ""} />
								}
								{landing && post.description &&(
									<p className='text-base font-medium text-white opacity-50 leading-[1.5] pt-4'>{post.description}</p>
								)}
							</div>
						</div>
					</div>
					<div className='md:absolute left-1/2 right-0 top-0 bottom-0 w-full md:w-auto pb-8 md:pb-0 min-h-[250px]'>
						<ImageLoader
							image={post.mainImage}
							priority={true}
							useClientWidth={true}
							// useDefaultSize={true}
							alt={post.title || "Post image"}
							client={client}
							imageClassName='w-full h-full object-cover'
						/>
					</div>
				</Wrapper>
			</Section>
		</div>
	)
}

export default MainImageSection
