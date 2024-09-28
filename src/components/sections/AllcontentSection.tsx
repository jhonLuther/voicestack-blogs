import React, { useState } from 'react';
import Card from '../Card';

interface LatestBlogsProps {
    allContent: any[];
}

const AllcontentSection: React.FC<LatestBlogsProps> = ({ allContent }) => {

    console.log(allContent, 'allcontent in allcontentsection');

    const [postsToShow, setPostsToShow] = useState(6);

    const handleShowMore = () => {
        setPostsToShow(postsToShow + 6);
    };

    return (
        <section className="mt-9">
            <div className="md:flex-row flex-col gap-8 flex items-center justify-between py-9">
                <h2 className="text-cs-black text-5xl font-manrope font-extrabold">{`Browse All`}</h2>
                <div className="relative max-w-xl flex-1">
                    <input
                        type="search"
                        id="default-search"
                        className="w-full p-4 pl-10 focus:outline-none text-sm text-gray-900 rounded-lg dark:border-gray-600 dark:placeholder-gray-400"
                        placeholder="Search..."
                        required
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 4.50003C6.93913 4.50003 5.92172 4.92146 5.17157 5.67161C4.42143 6.42175 4 7.43917 4 8.50003C4 9.5609 4.42143 10.5783 5.17157 11.3285C5.92172 12.0786 6.93913 12.5 8 12.5C9.06087 12.5 10.0783 12.0786 10.8284 11.3285C11.5786 10.5783 12 9.5609 12 8.50003C12 7.43917 11.5786 6.42175 10.8284 5.67161C10.0783 4.92146 9.06087 4.50003 8 4.50003ZM2 8.50003C1.99988 7.55574 2.22264 6.62475 2.65017 5.78278C3.0777 4.9408 3.69792 4.21163 4.4604 3.65456C5.22287 3.09749 6.10606 2.72825 7.03815 2.57687C7.97023 2.42549 8.92488 2.49625 9.82446 2.78338C10.724 3.07052 11.5432 3.56594 12.2152 4.22933C12.8872 4.89272 13.3931 5.70537 13.6919 6.60117C13.9906 7.49697 14.0737 8.45063 13.9343 9.38459C13.795 10.3185 13.4372 11.2064 12.89 11.976L17.707 16.793C17.8892 16.9816 17.99 17.2342 17.9877 17.4964C17.9854 17.7586 17.8802 18.0094 17.6948 18.1949C17.5094 18.3803 17.2586 18.4854 16.9964 18.4877C16.7342 18.49 16.4816 18.3892 16.293 18.207L11.477 13.391C10.5794 14.0293 9.52335 14.4082 8.42468 14.4862C7.326 14.5641 6.22707 14.3381 5.2483 13.833C4.26953 13.3279 3.44869 12.5631 2.87572 11.6224C2.30276 10.6817 1.99979 9.60147 2 8.50003Z"
                            fill="#3F3F46"
                        />
                    </svg>
                </div>

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