import React from 'react';
import { Post } from '~/interfaces/post';
import Card from '../Card';
import Wrapper from '../../layout/Wrapper';
import { capitalizeFirstLetter } from '~/utils/common';

interface LatestBlogsProps {
  contents: any[]; 
  revamp?: boolean;
  className?: string;
  cardLayout?: 'ebook' 
  showPlayIcon?: boolean
}


const LatestBlogs: React.FC<LatestBlogsProps> = ({ contents, revamp, className,showPlayIcon }) => {

  console.log(contents, 'contents');
  

  if(!contents) {
    return null
  }

  const types ={
    'ebook': 'Ebooks',
    'article': 'Articles',
    'podcast': 'Podcasts',
    'webinar': 'Webinars',
    'case-study': 'Case Studies',
    'press-release': 'Press Releases',
  }

  const contentType = contents &&  contents.find(c => c.contentType)?.contentType;
  const displayName = types[contentType];  
  const [firstBlog, ...otherBlogs] =  contents && contents;
  
  return (
    <React.Fragment>
      {revamp ? (
        <div className={`bg-cs-gray-900 text-white ${className}`}>
          <Wrapper>
            <section className='flex w-full gap-20 md:flex-row flex-col'>
              <div className='flex flex-col gap-9 md:max-w-[519px] w-full flex-1'>
                <div className="flex flex-col w-full overflow-hidden">
                  <Card  showPlayIcon={showPlayIcon} cardType='top-image-contentType-card' key={firstBlog?._id || 1} cardColor='white' post={firstBlog} />
                </div>
              </div>
              <div className='flex-grow flex-1 flex flex-col gap-8'>
                <h2 className='text-5xl text-white font-extrabold'>{displayName}</h2>
                <div className='flex flex-col gap-8 last-child text-white'>
                  {otherBlogs.map((blog, i) => (
                    <Card key={i + 1 || blog._id} cardType='text-only-card' cardColor='white' post={blog} />
                  ))}
                </div>
              </div>
            </section>
          </Wrapper>
        </div>
      ) : (
        <section className='flex w-full gap-20 justify-between md:flex-row flex-col'>
          <div className='flex flex-col gap-9 md:max-w-[519px] w-full justify-between flex-1'>
            <h2 className='text-5xl text-black font-extrabold'>Latest</h2>
            <div className='flex flex-col gap-8  '>
              {otherBlogs.map((blog, i) => (
                <Card key={i + 1 || blog._id} cardType='text-only-card' isLast={i === otherBlogs.length - 1} post={blog} />
              ))}
            </div>
          </div>
          <div className='flex-grow flex-1'>
            <div className="flex flex-col w-full overflow-hidden">
              <Card cardType='top-image-card' key={firstBlog?._id} post={firstBlog} />
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default LatestBlogs;
