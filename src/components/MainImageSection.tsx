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

interface Props {
	post?: any
	isAuthor?: any
}

const MainImageSection = ({ post, isAuthor }: Props) => {

	const isMobile: any = useMediaQuery(767);
	const client = getClient()

	if (!post) {
		return null
	}

	return (
		<div className='w-full flex gap-1 min-h-[423px] items-center bg-black relative '>

			<Wrapper className="z-10 flex min-h-full h-auto">
				<div className='flex flex-col items-start gap-32 bg-black text-white md:max-w-xl max-w-lg h-full justify-center pr-8'>
					<div className='flex flex-col items-start '>
						<Breadcrumb />
						<h1 className="text-white font-manrope leading-tight md:text-5xl text-2xl font-bold  mb-[10px]">
							{post.title ? post.title : 'Post Title'}
						</h1>
						<p className="text-gray-400 font-inter text-base font-normal leading-120 line-clamp-2 overflow-hidden">
							{post.excerpt ? post.excerpt : 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur except.'}
						</p>
						{isAuthor && <AuthorInfo className={"mt-8"} contentType={post.contentType} author={post?.author} />}
					</div>
				</div>
			</Wrapper>
			<div className='w-full md:flex hidden absolute h-full justify-end'>
				<div className='md:w-1/2 w-1/3'>
					<ImageLoader
						image={post.mainImage || post.image}
						priority={true}
						alt={post.title || "Post image"}
						client={client}
					/>
				</div>
			</div>
		</div>
	)
}

export default MainImageSection
