import React from 'react';
import { Post } from '~/interfaces/post';
import Card from '../Card';
import Wrapper from '../commonSections/Wrapper';
import Link from 'next/link';


interface LatestBlogsProps {
    blogs: Post[];
}

const LatestBlogs: React.FC<LatestBlogsProps> = ({ blogs }) => {
    console.log(blogs, 'blogs in latest blog section');

    return (
        <section className='flex w-full gap-20 justify-between md:flex-row flex-col'>
            <div  className='flex flex-col gap-9 max-w-[519px]  justify-between flex-1'>
                <h2 className='text-5xl text-black font-extrabold'>Latest</h2>
                <div className='flex flex-col gap-8 last-child'>
                    {blogs.slice(1).map(blog => (
                        <Card cardType='text-only-card' key={blog._id} post={blog} />
                    ))}
                </div>
            </div>

            <div className='flex-grow flex-1'>
                <div className="flex flex-col w-full overflow-hidden ">
                    <Card cardType='top-image-card' key={blogs[0]._id} post={blogs[0]} />
                </div>
            </div>
        </section>
    );
};

export default LatestBlogs;
