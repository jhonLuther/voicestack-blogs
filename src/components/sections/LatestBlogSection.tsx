import React from 'react';
import { Post } from '~/interfaces/post';
import Card from '../Card';
import Wrapper from '../../layout/Wrapper';
import { capitalizeFirstLetter } from '~/utils/common';
import H2Large from '../typography/H2Large';
import Section from '../Section';

interface LatestBlogsProps {
  contents: any[];
  reverse?: boolean;
  className?: string;
  cardLayout?: 'ebook'
  showPlayIcon?: boolean
  page?: string
}


const LatestBlogs: React.FC<LatestBlogsProps> = ({ contents, reverse, className, showPlayIcon }) => {

  // console.log(contents, 'contents');


  if (!contents) {
    return null
  }

  const types = {
    'ebook': 'Ebooks',
    'article': 'Articles',
    'podcast': 'Podcasts',
    'webinar': 'Webinars',
    'case-study': 'Case Studies',
    'press-release': 'Press Releases',
  }

  const contentType = contents && contents?.find(c => c.contentType)?.contentType;
  const displayName = types[contentType];
  const [firstBlog, ...otherBlogs] = contents && contents;

  return (
    <React.Fragment>
        <Section className='justify-center py-24 bg-gray-900 text-white' >
          <Wrapper className={`md:flex-row flex-col ${reverse ? 'md:flex-row-reverse' : ''} md:gap-36 gap-12`}>
            <div className='flex flex-col gap-9 md:w-5/12 w-full'>
              <H2Large >
                {reverse ? displayName :`Latest`}
              </H2Large>
              <div className='flex flex-col gap-8  '>
                {otherBlogs.map((blog, i) => (
                  <Card key={i + 1 || blog._id} cardType='text-only-card' isLast={i === otherBlogs.length - 1} post={blog} />
                ))}
              </div>
            </div>
            <div className=' md:w-6/12 w-full'>
              <div className="flex flex-col w-full overflow-hidden ">
                <Card reverse={reverse} cardType='top-image-card'  key={firstBlog?._id} post={firstBlog} />
              </div>
            </div>
          </Wrapper>
        </Section>
    </React.Fragment>
  );
};

export default LatestBlogs;
