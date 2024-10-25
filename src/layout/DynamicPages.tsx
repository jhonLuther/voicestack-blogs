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
import siteConfig from "config/siteConfig";

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
	podcastData,
	latestPosts,
	ebooks,
	webinars,
	// ...rest
}: DynamicProps) => {

	const featuredBlog = homeSettings?.FeaturedBlog || posts[0];
	const customBrowseContent = homeSettings?.customBrowseContent || posts[0];
	const featuredBlogs = homeSettings?.popularBlogs || posts;
	
	const featuredContents = [...featuredBlogs,...posts].slice(0, 4);

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
			<FeaturedAndPopularBlogs featuredBlog={featuredBlog} popularBlogs={featuredContents} />
			<BannerSubscribeSection />
			<SliderSection items={carouselItems} />
			<TestimonialSection testimonials={testimonialList} />
			<AllcontentSection customBrowseContent={customBrowseContent} allContent={posts} itemsPerPage={siteConfig.pagination.itemsPerPage} hideSearch={true} redirect={true} />
			<ShortBannerSection />
		</>
	);
};

export default DynamicPages;
