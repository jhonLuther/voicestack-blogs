import React from 'react';
import Card from '../Card';
import SearchBar from '../widgets/SearchBar';
import Link from 'next/link';
import siteConfig from 'config/siteConfig';
import Wrapper from '~/layout/Wrapper';
import Section from '../Section';
import { ArrowTopRightIcon } from '@sanity/icons'


interface LatestBlogsProps {
  allContent: any[];
  hideSearch?: boolean;
  className?: string;
  cardType?: 'podcast-card' | 'ebook-card' | 'featured' | 'top-image-smallCard' | "left-image-card";
  redirect?: boolean;
  baseUrl?: string;
  itemsPerPage?: number;
}

const AllcontentSection: React.FC<LatestBlogsProps> = ({
  allContent,
  hideSearch = false,
  className,
  cardType,
  itemsPerPage,
  redirect = false,
}) => {
  const postsToShow = itemsPerPage || siteConfig.pagination.itemsPerPage;

  if (!allContent) {
    return null;
  }

  return (
    <Section className={` justify-center py-24 ${className}`}>
      <Wrapper className={`flex-col`}>
        <div className="md:flex-row flex-col gap-8 flex items-center justify-between py-9">
          <h2 className="text-cs-black text-5xl font-manrope font-extrabold">{`Explore All`}</h2>
          {!hideSearch && (
            <div className="relative max-w-xl flex-1">
              <SearchBar />
            </div>
          )}

          {redirect &&<Link href={siteConfig.paginationBaseUrls.base}>
          <div className='flex items-center gap-3  transform duration-300 cursor-pointer'>

            <span className='text-xs font-medium'>{`Browse All`}</span>
            <span className="text-xl">
            <ArrowTopRightIcon className='group-hover:translate-y-[-2px] transition-transform duration-300' height={20} width={20} />
            </span>
          </div>
          </Link>}

        </div>
        <div className={`grid 
        ${cardType === 'left-image-card' ? 'lg:grid-cols-2 md:grid-cols-1 gap-x-16 gap-y-12' : 'lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-9 gap-y-8'} 
        pb-16`}>
          {allContent && allContent.length > 0 ? (
            allContent.slice(0, postsToShow).map((post, index) => (
              <div id={index.toString()} key={post._id || index} className={`${(index >= 3 && (index - 3) % 9 === 0) && cardType !== 'left-image-card' ? 'row-span-2' : ''}`} >
                <Card
                  varyingIndex={(index >= 3 && (index - 3) % 9 === 0) ? true : false} cardType={cardType} cardColor='white' post={post} />
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p>No matching posts found.</p>
            </div>
          )}
        </div>

      </Wrapper>
    </Section>
  );
};

export default AllcontentSection;
