import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '~/components/Layout'
import { getClient } from '~/lib/sanity.client'
import {
	getPosts,
	getPostsByLimit,
	getTags,
} from '~/lib/sanity.queries'
import AllcontentSection from '~/components/sections/AllcontentSection'
import Pagination from '~/components/commonSections/Pagination'
import siteConfig from 'config/siteConfig'
import TagSelect from '~/contentUtils/TagSelector'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { useRef } from 'react'
import { useRouter } from 'next/router'

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
	const router = useRouter();

	const { posts, totalPages, tags } = props;

	const baseUrl = useRef(`/${siteConfig.pageURLs.browse}`).current;
	const handlePageChange = (page: number) => {
	  if (page === 1) {
		router.push(baseUrl);
	  } else {
		router.push(`${baseUrl}/page/${page}`);
	  }
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
					baseUrl={baseUrl}
					onPageChange={handlePageChange}
					currentPage={0}
					enablePageSlug={true}
				/>
				<BannerSubscribeSection />
			</Layout>
		</>
	)
}

