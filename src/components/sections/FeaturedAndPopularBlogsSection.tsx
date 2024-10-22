// FeaturedAndPopularBlogs.tsx
import { Post } from '~/interfaces/post';
import Image from 'next/image';
import { urlForImage } from '~/lib/sanity.image';
import Wrapper from '../../layout/Wrapper';
import Card from '../Card';
import Link from 'next/link';


interface FeaturedAndPopularBlogsProps {
    featuredBlog: Post;
    popularBlogs: Post[];
}

const FeaturedAndPopularBlogs = ({ featuredBlog, popularBlogs }: FeaturedAndPopularBlogsProps) => {

    console.log(popularBlogs,'popularBlogs');
    

    return (
        <section className="flex flex-wrap md:flex-row flex-col w-full gap-20 justify-between my-8">
            <div className="flex flex-col gap-9 md:max-w-[519px]  w-full flex-1">
                <div className="flex flex-col">
                    <div className="md:max-w-[519px]  w-full  overflow-hidden flex-1">
                        <Card cardType="top-image-smallCard" post={featuredBlog} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8 justify-between flex-1">
                <h2 className="text-5xl text-black font-extrabold">{`Most Popular`}</h2>
                {popularBlogs.map((blog, index) => (
                    <Card cardType="left-image-card" key={index} post={blog} />
                ))}
                <div className='flex items-center gap-3 hover:scale-95 transform duration-300 cursor-pointer'>
                    <Link href={'/browse'}>
                    <span className='text-4xl text-cs-black font-semibold'> {`Show More`}</span>
                    </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
                        <path d="M0 2.5H27M27 2.5V29.5M27 2.5L3.375 26.125" stroke="#151515" strokeWidth="4" />
                    </svg>
                </div>
            </div>
        </section>

    );
};

export default FeaturedAndPopularBlogs;
