import TagSelect from "~/contentUtils/TagSelector";
import { Tag } from "~/interfaces/post";
import LatestBlogs from "~/components/sections/LatestBlogSection";
import FeaturedAndPopularBlogs from "~/components/sections/FeaturedAndPopularBlogsSection";
import TestimonialSection from "~/components/sections/TestimonialSection";
import AllcontentSection from "~/components/sections/AllcontentSection";
import ShortBannerSection from "~/components/sections/ShortBannerSection";
import BannerSubscribeSection from "~/components/sections/BannerSubscribeSection";
import Wrapper from "~/layout/Wrapper";
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
	webinars?: any;
	ebooks?: any;
}

const DynamicPages = ({
	posts,
	tags,
	testimonials,
	homeSettings,
	popularBlogs,
	featuredContents,
	podcastData,
	latestPosts,
	ebooks,
	webinars,
	// ...rest
}: DynamicProps) => {

	const featuredBlog = homeSettings?.FeaturedBlog || posts[0];

	const popularBlogList = popularBlogs.concat(posts.slice(1, 5 - popularBlogs.length));

	// const latestContents = featuredContents?.concat(latestPosts?.slice(1, 5 - featuredContents.length));

	const carouselItems = [...ebooks, ...webinars]

	const testimonialList = homeSettings?.testimonials ? homeSettings?.testimonials : testimonials.slice(0, 1);

	return (
		<>
			<TagSelect
				tags={tags}
				tagLimit={7}
				showTags={true}
			/>
			<LatestBlogs contents={latestPosts} />
			<FeaturedAndPopularBlogs featuredBlog={featuredBlog} popularBlogs={popularBlogList} />
			<BannerSubscribeSection />
			<SliderSection items={carouselItems} />
			<TestimonialSection testimonials={testimonialList} />
			<AllcontentSection allContent={posts} hideSearch={true} redirect={true} />
			<ShortBannerSection />
		</>
	);
};

export default DynamicPages;
