import React from 'react';
import { Post } from '~/interfaces/post';
import Card from '../Card';
import Wrapper from '../commonSections/Wrapper';
import Link from 'next/link';


interface LatestBlogsProps {
  blogs: any;
  revamp?: boolean;
  className?: string;
}

const LatestBlogs: React.FC<LatestBlogsProps> = ({ blogs, revamp ,className }) => {
  console.log(blogs, 'data in latest blog section');

  return (
    <React.Fragment>
      {revamp ?
        (
          <div className={`bg-cs-black text-white ${className}`}>
            <Wrapper>
            <section className='flex w-full gap-20 justify-between md:flex-row flex-col'>
              <div className='flex flex-col gap-9 md:max-w-[519px] w-full  justify-between flex-1'>
                <div className="flex flex-col w-full overflow-hidden ">
                  <Card cardType='top-image-card' key={blogs[0]._id} cardColor='white' post={blogs[0]} />
                </div>
              </div>
              <div className='flex-grow flex-1 flex flex-col gap-8'>
                <h2 className='text-5xl text-white font-extrabold'>Podcasts</h2>
                <div className='flex flex-col gap-8 last-child text-white'>
                  {blogs.slice(1).map((blog, i) => (
                    <Card key={i + 1 || blog._id} cardType='text-only-card' cardColor='white' post={blog} />
                  ))}
                </div>

              </div>
            </section>
            </Wrapper>
          </div>

        ) :
        (<section className='flex w-full gap-20 justify-between md:flex-row flex-col'>
          <div className='flex flex-col gap-9 md:max-w-[519px] w-full  justify-between flex-1'>
            <h2 className='text-5xl text-black font-extrabold'>Latest</h2>
            <div className='flex flex-col gap-8 last-child'>
              {blogs.slice(1).map((blog, i) => (
                <Card key={i + 1 || blog._id} cardType='text-only-card' post={blog} />
              ))}
            </div>
          </div>

          <div className='flex-grow flex-1'>
            <div className="flex flex-col w-full overflow-hidden ">
              <Card cardType='top-image-card' key={blogs[0]._id} post={blogs[0]} />
            </div>
          </div>
        </section>)

      }
    </React.Fragment>
  );
};

export default LatestBlogs;
