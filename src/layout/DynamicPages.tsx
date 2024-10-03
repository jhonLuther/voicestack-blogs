import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import TagSelect from "~/common/TagSelector";
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
    ...rest
}: DynamicProps) => {


    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedContentType, setSelectedContentType] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<any>('');
    const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);


    useEffect(() => {
        let filtered = posts;

        if (selectedContentType) {
            filtered = filtered.filter(post => post.contentType === selectedContentType);
        }
        if (selectedTimeFilter) {
            const now = new Date();
            filtered = filtered.filter(post => {
                const createdAt = new Date(post._createdAt);
                switch (selectedTimeFilter) {
                    case 'day':
                        return now.getTime() - createdAt.getTime() < 24 * 60 * 60 * 1000;
                    case 'week':
                        return now.getTime() - createdAt.getTime() < 7 * 24 * 60 * 60 * 1000;
                    case 'month':
                        return now.getTime() - createdAt.getTime() < 30 * 24 * 60 * 60 * 1000;
                    case 'year':
                        return now.getTime() - createdAt.getTime() < 365 * 24 * 60 * 60 * 1000;
                    default:
                        return true;
                }
            });
        }

        if (filtered.length === 0) {
            console.log('No matching posts found');
        }

        setFilteredPosts(filtered);
    }, [selectedContentType, selectedTimeFilter, posts]);


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


    const latestBlogs = homeSettings.latestBlogs


    const featuredBlog = homeSettings.FeaturedBlog || posts[0];

    const popularBlogList = popularBlogs
        ? homeSettings.popularBlogs
        : posts.slice(1, 5);


    // const ebooks =featuredContents.filter(content => content.contentType === 'ebook');
    // const webinars = featuredContents.filter(content => content.contentType === 'webinar');

    // const allEbooksAndWebinars = posts.filter(post => post.contentType !== 'ebook' && post.contentType !== 'webinar');

    const ebooks = posts.filter(post => post.contentType === 'ebook');
    const webinars = posts.filter(post => post.contentType === 'webinar');
    const featuredContent = homeSettings.FeaturedContents || [];

    const firstCarouselItem = featuredContent.find(fc =>
        fc.contentType === 'ebook' || fc.contentType === 'webinar'
    );

    const remainingEbooksWebinars = [...ebooks, ...webinars].filter(item => {
        const isFeatured = featuredContent.some(fc => fc._id === item._id);
        return !isFeatured && (item.contentType === 'ebook' || item.contentType === 'webinar');
    });

    const carouselItems = firstCarouselItem ? [firstCarouselItem, ...remainingEbooksWebinars] : remainingEbooksWebinars;


    const testimonialList = homeSettings?.testimonials ? homeSettings?.testimonials : testimonials.slice(0, 1);

    // console.log(testimonialList, 'testimonialList');


    const swiperRef = useRef<any>(null);

    const handleNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext(); // Slide to next
        }
    };

    const handlePrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev(); // Slide to previous
        }
    };


    return (
        <>
            <Wrapper >
                <LatestBlogs blogs={latestBlogs ? latestBlogs : posts} />
                <ShortBannerSection />
                <TagSelect
                    contentTypes={contentTypes}
                    tags={tags}
                    onContentTypeChange={handleContentTypeChange}
                    onTagChange={handleTagChange}
                    onTimeFilterChange={handleTimeFilterChange}
                    selectedTags={selectedTags}
                    tagLimit={5}
                    showTags={true}
                />
                <FeaturedAndPopularBlogs featuredBlog={featuredBlog} popularBlogs={popularBlogList} />
                <BannerSubscribeSection />

                <section className="my-9">
                    <div className="flex justify-between pb-9">
                        <h2 className="text-2xl font-bold mb-4">{`Ebooks and Webinars`}</h2>
                        <div className="flex gap-9">
                            <button onClick={handlePrevSlide}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="39" viewBox="0 0 35 39" fill="none">
                                <path d="M21.0854 2.19507L3.78061 19.4999M3.78061 19.4999L21.0854 36.8048M3.78061 19.4999H34.0641" stroke="#151515" strokeWidth="4" />
                            </svg></button>
                            <button onClick={handleNextSlide}><svg xmlns="http://www.w3.org/2000/svg" width="34" height="39" viewBox="0 0 34 39" fill="none">
                                <path d="M13.6953 2.19507L31.0002 19.4999M31.0002 19.4999L13.6953 36.8048M31.0002 19.4999H0.71668" stroke="#151515" strokeWidth="4" />
                            </svg></button>
                        </div>
                    </div>
                    <Carousel items={carouselItems} swiperRef={swiperRef} />
                </section>

            </Wrapper>
            <TestimonialSection testimonials={testimonialList} />
            <Wrapper>

                <AllcontentSection allContent={posts} />


                {/* <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
                {currentSegment && currentSegment.length > 0 ? (
                    currentSegment.map(post => <Card key={post._id} post={post} />)
                ) : (
                    <div className="text-center py-10">
                        <p>No matching posts found.</p>
                    </div>
                )}
            </div> */}

                {/* <div className="flex justify-center mt-8">
                {segments.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-2 rounded ${currentPage === index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div> */}

            </Wrapper>

        </>
    );
};

export default DynamicPages;
