import React, { useState } from 'react';
import Card from '../Card';

interface LatestBlogsProps {
  allContent: any[];
}

const AllcontentSection: React.FC<LatestBlogsProps> = ({ allContent }) => {

    console.log(allContent,'allcontent in allcontentsection');
    
  const [postsToShow, setPostsToShow] = useState(6); 

  const handleShowMore = () => {
    setPostsToShow(postsToShow + 6); 
  };

  return (
    <section className="mt-9">
      <div className="flex justify-between py-9">
        <h2 className="text-cs-black text-5xl font-manrope font-extrabold">{`Browse All`}</h2>
        <input
          type="search"
          id="default-search"
          className="max-w-xl flex-1 p-4 ps-10 text-sm text-gray-900 rounded-lg dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search..."
          required
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-y-9 gap-4">
        {allContent && allContent.length > 0 ? (
          allContent.slice(0, postsToShow).map((post) => (
            <Card key={post._id} post={post} />
          ))
        ) : (
          <div className="text-center py-10">
            <p>No matching posts found.</p>
          </div>
        )}
      </div>
      {allContent.length > postsToShow && (
        <div className="flex justify-center cursor-pointer">
          <span
            className="text-base hover:bg-cs-gray-800 max-w-40 font-medium rounded-sm px-2 py-4 flex items-center text-white bg-cs-gray-900"
            onClick={handleShowMore}
          >
            {`Show More`}
          </span>
        </div>
      )}
    </section>
  );
};

export default AllcontentSection;