import React, { useState } from 'react';
import Card from '../Card';
import SearchBar from '../widgets/SearchBar';

interface LatestBlogsProps {
    allContent: any[];
    hideSearch?: boolean
    className?: string;
    cardType?: 'podcast-card' | 'ebook-card' | 'featured' | 'top-image-smallCard';
}

const AllcontentSection: React.FC<LatestBlogsProps> = ({ allContent, hideSearch = false, className, cardType }) => {
    const [postsToShow, setPostsToShow] = useState(6);

    if (!allContent) {
        return null;
    }

    console.log(allContent, 'allcontent in allcontentsection');


    const handleShowMore = () => {
        setPostsToShow(postsToShow + 6);
    };

    return (
        <section className={`mt-9 ${className}`}>
            {!hideSearch && <div className="md:flex-row flex-col gap-8 flex items-center justify-between py-9">
                <h2 className="text-cs-black text-5xl font-manrope font-extrabold">{`Browse All`}</h2>
                <div className="relative max-w-xl flex-1">
                    <SearchBar />
                </div>

            </div>}
            <div className=
                {`
                grid 
                ${cardType === 'podcast-card' ? 'lg:grid-cols-2 md:grid-cols-1' : 'lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'} 
                gap-y-9 
                ${cardType === 'podcast-card' ? 'gap-x-12' : 'gap-4'} 
                pb-16
              `}>
                {allContent && allContent.length > 0 ? (
                    allContent.slice(0, postsToShow).map((post) => (
                        <Card cardType={cardType} cardColor='white' key={post._id} post={post} />
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