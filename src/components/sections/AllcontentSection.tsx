import React from 'react';
import Card from '../Card';
import SearchBar from '../widgets/SearchBar';
import Link from 'next/link';
import siteConfig from 'config/siteConfig';
import Wrapper from '~/layout/Wrapper';
import Section from '../Section';

interface LatestBlogsProps {
  allContent: any[];
  hideSearch?: boolean;
  className?: string;
  cardType?: 'podcast-card' | 'ebook-card' | 'featured' | 'top-image-smallCard';
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
  const postsToShow = itemsPerPage || siteConfig.pagination.itemsPerPage // Fixed to 4

  if (!allContent) {
    return null;
  }

  return (
    <Section className={` justify-center py-24 ${className}`}>
      <Wrapper className={`flex-col`}>
      <div className="md:flex-row flex-col gap-8 flex items-center justify-between py-9">
        <h2 className="text-cs-black text-5xl font-manrope font-extrabold">{`Browse All`}</h2>
        {!hideSearch && (
          <div className="relative max-w-xl flex-1">
            <SearchBar />
          </div>
        )}
      </div>
      <div className={`grid 
        ${cardType === 'podcast-card' ? 'lg:grid-cols-2 md:grid-cols-1' : 'lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'} 
        gap-y-9 
        ${cardType === 'podcast-card' ? 'gap-x-12' : 'gap-4'} 
        pb-16`}>
        {allContent && allContent.length > 0 ? (
          allContent.slice(0, postsToShow).map((post, index) => (
            <div id={index.toString()} key={post._id || index} className={`${(index >= 3 && (index - 3) % 9 === 0) ? 'row-span-2' : ''}` } >
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
      {allContent.length > postsToShow && redirect && (
        <div className="flex justify-center cursor-pointer">
          <Link href={siteConfig.paginationBaseUrls.base}>
            <span className="text-base hover:bg-cs-gray-800 max-w-40 font-medium rounded-sm px-2 py-4 flex items-center text-white bg-cs-gray-900">
              {`View All`}
            </span>
          </Link>
        </div>
      )}
      </Wrapper>
    </Section>
  );
};

export default AllcontentSection;
