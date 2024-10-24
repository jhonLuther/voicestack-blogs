import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
	getPosts,
	getPostsByLimit,
	getTag,
	getTags,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { Post } from '~/interfaces/post'
import Wrapper from '~/layout/Wrapper'
import AllcontentSection from '~/components/sections/AllcontentSection'
import Pagination from '~/components/commonSections/Pagination'
import siteConfig from 'config/siteConfig'
import TagSelect from '~/contentUtils/TagSelector'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'

interface Query {
	[key: string]: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const client = getClient();
	const pageNumber = params?.pageNumber ? parseInt(params.pageNumber as string, 10) : 1;

	const cardsPerPage = siteConfig.pagination.itemsPerPage || 5;
	const startLimit = (pageNumber - 1) * cardsPerPage;

	const tags = await getTags(client);

	const endLimit = startLimit + cardsPerPage;

	const posts = await getPostsByLimit(client, startLimit, cardsPerPage);
	const totalPosts = await getPosts(client);

	const totalPages = Math.ceil(totalPosts.length / cardsPerPage);

	return {
		props: {
			posts,
			tags,
			totalPages,
			currentPage: pageNumber,
		},
	};
};


export default function ProjectSlugRoute(
	props: InferGetStaticPropsType<typeof getStaticProps> & { posts: any, totalPages: any, tags: any },
) {

	const { posts, totalPages, tags } = props;

	const handlePageChange = (page: number) => {
		console.log(`Navigating to page: ${page}`);
	};

	return (
		<>
			<Layout >
				<TagSelect
					tags={tags}
					tagLimit={5}
					showTags={true}
				/>
				<AllcontentSection hideSearch={true} allContent={posts} />
				<Pagination
					totalPages={totalPages}
					baseUrl="/browse"
					onPageChange={handlePageChange}
					currentPage={0}
					enablePageSlug={true}
				/>
				<BannerSubscribeSection />
			</Layout>
		</>
	)
}

