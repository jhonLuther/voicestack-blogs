import React, { useState } from 'react';
import Card from '../Card';
import SearchBar from '../widgets/SearchBar';
import Link from 'next/link';

interface LatestBlogsProps {
  allContent: any[];
  hideSearch?: boolean
  className?: string;
  cardType?: 'podcast-card' | 'ebook-card' | 'featured' | 'top-image-smallCard';
  redirect?: boolean;
}

const AllcontentSection: React.FC<LatestBlogsProps> = ({ allContent, hideSearch = false, className, cardType, redirect = false }) => {
  const [postsToShow, setPostsToShow] = useState(6);

  if (!allContent) {
    return null;
  }

  const handleShowMore = () => {
    setPostsToShow(prevPostsToShow => prevPostsToShow === 9 ? allContent.length : 9);
  };

  return (
    <section className={`mt-9 ${className}`}>
      {!hideSearch && <div className="md:flex-row flex-col gap-8 flex items-center justify-between py-9">
        <h2 className="text-cs-black text-5xl font-manrope font-extrabold">{`Browse All`}</h2>
        <div className="relative max-w-xl flex-1">
          <SearchBar />
        </div>
      </div>}
      <div className={`
        grid 
        ${cardType === 'podcast-card' ? 'lg:grid-cols-2 md:grid-cols-1' : 'lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'} 
        gap-y-9 
        ${cardType === 'podcast-card' ? 'gap-x-12' : 'gap-4'} 
        pb-16
      `}>
        {allContent && allContent.length > 0 ? (
        allContent.slice(0, postsToShow).map((post, index) => (
            <div id={index.toString()} key={post._id} className={`${(index >= 3 && (index - 3) % 9 === 0) ? 'lg:row-span-2' : ''}`}>
            <Card cardType={cardType} cardColor='white' post={post} />
            </div>
        ))
        ) : (
        <div className="text-center py-10">
            <p>No matching posts found.</p>
        </div>
        )}
      </div>
      {allContent.length > postsToShow && (
        <div className="flex justify-center cursor-pointer">
          {redirect ? (
            <Link href={'/all/1'}>
                <span
                  className="text-base hover:bg-cs-gray-800 max-w-40 font-medium rounded-sm px-2 py-4 flex items-center text-white bg-cs-gray-900"
                >
                  {`View All`}
                </span>
            </Link>
          ) : (
            <span
              className="text-base hover:bg-cs-gray-800 max-w-40 font-medium rounded-sm px-2 py-4 flex items-center text-white bg-cs-gray-900"
              onClick={handleShowMore}
            >
              {`Show More`}
            </span>
          )}
        </div>
      )}
    </section>
  );
};

export default AllcontentSection;