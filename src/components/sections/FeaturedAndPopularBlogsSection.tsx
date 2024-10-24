// FeaturedAndPopularBlogs.tsx
import { Post } from '~/interfaces/post';
import Image from 'next/image';
import { urlForImage } from '~/lib/sanity.image';
import Wrapper from '../../layout/Wrapper';
import Card from '../Card';
import Link from 'next/link';
import H2Large from '../typography/H2Large';
import Section from '../Section';


interface FeaturedAndPopularBlogsProps {
  featuredBlog: Post;
  popularBlogs: Post[];
}

const FeaturedAndPopularBlogs = ({ featuredBlog, popularBlogs }: FeaturedAndPopularBlogsProps) => {

  console.log(popularBlogs, 'popularBlogs');


  return (
    <Section className="justify-center py-9">
      <Wrapper className={`justify-between md:flex-row flex-col gap-24`}>
        <div className="flex flex-col gap-9 md:w-5/12 w-full flex-1">
          <div className="flex flex-col">
            <div className=" w-full  overflow-hidden flex-1">
              <Card cardType="top-image-card" post={featuredBlog} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 justify-between md:w-6/12 w-full">
          <H2Large>
            Most Popular
          </H2Large>
          {popularBlogs.map((blog, index) => (
            <Card cardType="left-image-card" key={index} post={blog} />
          ))}
        </div>
      </Wrapper>
    </Section>

  );
};

export default FeaturedAndPopularBlogs;
