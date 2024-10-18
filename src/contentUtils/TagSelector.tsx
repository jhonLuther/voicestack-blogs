import Link from 'next/link';
import { Fragment, useState } from 'react';

interface TagSelectProps {
  tags: any[];
  tagLimit?: number;
  showTags?: boolean;
  showHeading?: boolean;
  className?: string;
  onTagChange?: (tag: any) => void;
}

export default function TagSelect({
  tags,
  tagLimit,
  showTags = false,
  showHeading = false,
  className,
  onTagChange,
}: TagSelectProps) {
  const [visibleTagCount, setVisibleTagCount] = useState(tagLimit);
  
  const [selectedTag, setSelectedTag] = useState(tags[0]?.slug?.current || '');

  const onTagChanges = (tag: any) => {
    setSelectedTag(tag.slug.current); 
    if (onTagChange) {
      onTagChange(tag);
    }
  };

  const handleShowMore = () => {
    setVisibleTagCount(tags.length);
  };

  const handleShowLess = () => {
    setVisibleTagCount(tagLimit);
  };

  return (
    <Fragment>
      {showTags && (
        <div className='flex flex-col gap-9'>
          {showHeading && selectedTag && (
            <h2 className='md:text-5xl text-xl text-center font-manrope font-extrabold text-cs-gray-900'>
              {`"${tags.find(tag => tag.slug.current === selectedTag)?.tagName || ''}"`}
            </h2>
          )}
          <ul className={`flex gap-2 pb-8 flex-wrap border-b-2 border-gray-900 ${className}`}>
            {tags &&
              tags.slice(0, visibleTagCount).map((tag, i) => (
                <Link key={i} href={`/browse/${tag.slug.current ? tag.slug.current : ''}`}>
                  <li
                    key={i}
                    onClick={() => onTagChanges(tag)}
                    className={`flex group hover:transition duration-500 content-center items-center gap-4 text px-2 py-3 text-lg font-medium 
                      border rounded text-center cursor-pointer hover:underline underline-offset-4
                      ${
                        selectedTag === tag.slug.current
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-300 text-black'
                      }`}
                  >
                    <span className='text-lg font-medium'>{tag.tagName}</span>
                  </li>
                </Link>
              ))}
            {tags.length > tagLimit && (
              <li
                onClick={visibleTagCount < tags.length ? handleShowMore : handleShowLess}
                className={`bg-black flex content-center items-center gap-4 px-2 py-3 text-xs p-1 border rounded text-center cursor-pointer bg-gray-300`}
              >
                <span className='text-lg font-medium'>
                  {visibleTagCount < tags.length ? 'More...' : 'Less...'}
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </Fragment>
  );
}
