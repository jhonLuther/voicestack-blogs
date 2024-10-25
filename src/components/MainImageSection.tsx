import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'
import Breadcrumb from './commonSections/BreadCrumb'
import { formatDate } from '~/utils'
import ImageLoader from './commonSections/ImageLoader'
import { getClient } from '~/lib/sanity.client'
import Layout from './Layout'
import Wrapper from '../layout/Wrapper'
import useMediaQuery from '~/utils/useMediaQueryHook'
import AuthorInfo from './commonSections/AuthorInfo'
import DurationSection from './commonSections/DurationSection'
import siteConfig from 'config/siteConfig'
import Section from './Section'

interface Props {
	post?: any
	isAuthor?: any
	enableDate?: boolean
	isAudio?: boolean
}

const MainImageSection = ({ post, isAuthor, enableDate = false, isAudio = false }: Props) => {
	console.log(post);


	const isMobile: any = useMediaQuery(767);
	const client = getClient()

	if (!post) {
		return null
	}

	return (
		<div className='w-full flex gap-1 items-center bg-zinc-900 relative overflow-hidden'>
			<Section className={`justify-center w-full `}>
				<Wrapper className="z-10 flex h-auto">
					<div className='flex flex-col items-start gap-32 text-white md:max-w-[46%] max-w-lg h-full justify-center py-8 md:py-24'>
						<div className='flex flex-col items-start '>
							<Breadcrumb />
							<h1 className="text-white font-manrope leading-tight lg:text-5xl text-2xl font-bold  mb-[10px]">
								{post.title ? post.title : 'Post Title'}
							</h1>
							<p className="text-zinc-400 font-inter text-base font-normal leading-120 line-clamp-2 overflow-hidden">
								{post.excerpt ? post.excerpt : 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur except.'}
							</p>
							{isAuthor && <AuthorInfo className={"mt-8"} contentType={post.contentType} author={post?.author} />}
							{
								enableDate && <DurationSection isAudio={isAudio} duration={post?.estimatedReadingTime ? post.estimatedReadingTime : post.duration} date={post?.date ? post?.date : ""} />
							}
						</div>
					</div>
					<div className='absolute left-1/2 right-0 top-0 bottom-0 w-auto'>
							<ImageLoader
								image={post.mainImage || post.image}
								priority={true}
								useClientWidth={true}
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
