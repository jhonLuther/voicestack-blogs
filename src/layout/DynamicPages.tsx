import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import TagSelect from "~/contentUtils/TagSelector";
import { Post, Tag } from "~/interfaces/post";
import Card from "~/components/Card";
import LatestBlogs from "~/components/sections/LatestBlogSection";
import FeaturedAndPopularBlogs from "~/components/sections/FeaturedAndPopularBlogsSection";
import EbooksAndWebinarsSection from "~/components/sections/EbooksAndWebinarsSection";
import Carousel from "~/components/sections/Carousel";
import TestimonialSection from "~/components/sections/TestimonialSection";
import AllcontentSection from "~/components/sections/AllcontentSection";
import { formatDate } from "~/utils";
import ShortBannerSection from "~/components/sections/ShortBannerSection";
import BannerSubscribeSection from "~/components/sections/BannerSubscribeSection";
import Wrapper from "~/components/commonSections/Wrapper";
import SliderSection from "~/components/sections/SliderSection";

interface DynamicProps {
	children?: React.ReactNode;
	body?: any;
	isPage?: Boolean;
	full_slug?: any;
	tags?: Tag[];
	[x: string]: any;
	testimonials?: any;
	homeSettings?: any;
	popularBlogs?: any;
	FeaturedContents?: any;
	podcastData?: any;
}

const DynamicPages = ({
	children,
	props,
	posts,
	tags,
	testimonials,
	homeSettings,
	popularBlogs,
	featuredContents,
	podcastData,
	latestPosts,
	...rest
}: DynamicProps) => {

	const router = useRouter();

	const [currentPage, setCurrentPage] = useState(1);
	const [selectedContentType, setSelectedContentType] = useState<string>('');
	const [selectedTags, setSelectedTags] = useState<any>('');
	const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('');
	const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

	const contentTypes = posts
		.map(type => type?.contentType)
		.filter((name, index, self) => name && self.indexOf(name) === index);

	const segmentSize = 9;// defines Content per page 
	const segments = [];
	for (let i = 0; i < filteredPosts.length; i += segmentSize) {
		segments.push(filteredPosts.slice(i, i + segmentSize));
	}

	const currentSegment = segments[currentPage - 1] || [];

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleTagChange = (tag: string) => {
		setSelectedTags(prevTags =>
			prevTags.includes(tag)
				? prevTags.filter(t => t !== tag)
				: [...prevTags, tag]
		);
		setCurrentPage(1);
	};

	const handleContentTypeChange = (contentType: string) => {
		setSelectedContentType(contentType);
		setCurrentPage(1);
	};

	const handleTimeFilterChange = (filter: string) => {
		setSelectedTimeFilter(filter);
		setCurrentPage(1);
	};

	const featuredBlog = homeSettings?.FeaturedBlog || posts[0];

	const popularBlogList = popularBlogs
		? homeSettings?.popularBlogs
		: posts.slice(1, 5);

	const ebooks = posts.filter(post => post.contentType === 'ebook');
	const webinars = posts.filter(post => post.contentType === 'webinar');
	const featuredContent = homeSettings?.FeaturedContents || [];

	const firstCarouselItem = featuredContent.find(fc =>
		fc.contentType === 'ebook' || fc.contentType === 'webinar'
	);

	const remainingEbooksWebinars = [...ebooks, ...webinars].filter(item => {
		const isFeatured = featuredContent.some(fc => fc._id === item._id);
		return !isFeatured && (item.contentType === 'ebook' || item.contentType === 'webinar');
	});

	const carouselItems = firstCarouselItem ? [firstCarouselItem, ...remainingEbooksWebinars] : remainingEbooksWebinars;

	const testimonialList = homeSettings?.testimonials ? homeSettings?.testimonials : testimonials.slice(0, 1);

	return (
		<>
			<Wrapper >
				<LatestBlogs contents={latestPosts} />
				<ShortBannerSection />
				<TagSelect
					contentTypes={contentTypes}
					tags={tags}
					onTagChange={handleTagChange}
					onTimeFilterChange={handleTimeFilterChange}
					selectedTags={selectedTags}
					tagLimit={5}
					showTags={true}
				/>
				<FeaturedAndPopularBlogs featuredBlog={featuredBlog} popularBlogs={popularBlogList} />
				<BannerSubscribeSection />
				<SliderSection items={carouselItems} />
			</Wrapper>
			<TestimonialSection testimonials={testimonialList} />
			<Wrapper>
				<AllcontentSection allContent={posts} redirect={true} />
			</Wrapper>

		</>
	);
};

export default DynamicPages;
