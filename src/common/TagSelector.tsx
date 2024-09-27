import Link from 'next/link';
import { Fragment, useState } from 'react';
import { usePostContext } from '~/components/Context/postContext';
import { Tag } from '~/interfaces/post';

interface TagSelectProps {
  contentTypes: string[];
  tags: any[];
  onContentTypeChange: (contentType: string) => void;
  onTagChange: (tag: string) => void;
  onTimeFilterChange: (filter: string) => void;
  selectedTags: string[];
  tagLimit: number;
  showFilter?: boolean;
  showTags?: boolean;
}

export default function TagSelect({ 
  contentTypes, 
  tags, 
  onContentTypeChange, 
  onTagChange, 
  onTimeFilterChange,
  tagLimit,
  showFilter = false,
  showTags = false,
}: TagSelectProps) {
  const [visibleTagCount, setVisibleTagCount] = useState(tagLimit);

  const [selectedTag, setSelectedTag] = useState(null);

  const onTagChanges = (tag) => {
      setSelectedTag(tag);
      
    };


  const handleShowMore = () => {
    setVisibleTagCount(tags.length); 
  };

  const handleShowLess = () => {
    setVisibleTagCount(tagLimit); 
  };

  return (
    <Fragment>
      {showFilter && <div className='flex gap-3 justify-between'>
        <select onChange={(e) => onContentTypeChange(e.target.value)} className="w-3/12 mb-4 p-2 border rounded">
          <option value="">All Content Types</option>
          {contentTypes && contentTypes.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input className='w-3/12 mb-4 p-2 border rounded' type="text" placeholder="Search.."></input>

        <select onChange={(e) => onTimeFilterChange(e.target.value)} className="w-3/12 mb-4 p-2 border rounded">
          <option value="">All Time</option>
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>}

      {showTags && <ul  className="flex gap-2 pb-8 flex-wrap border-b-2  border-gray-900">
        {tags && tags.slice(0, visibleTagCount).map((tag, i) => (
          <Link key={i} href={`/tag/${tag.slug.current ? tag.slug.current : ''}`}>
          <li
            key={i}
            onClick={() => onTagChanges(tag)}
            className={`flex group hover: transition duration-500 content-center items-center gap-4 text px-2 py-3 text-lg font-medium 
              border rounded text-center cursor-pointer  hover:underline underline-offset-4
              ${selectedTag === tag ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'}`}
          >
            <span>{tag.tagName}</span>
          </li>
          </Link>
        ))}
        {tags.length > tagLimit && (
          <li
            onClick={visibleTagCount < tags.length ? handleShowMore : handleShowLess}
            className={`${ 'bg-black' } hover:underline underline-offset-4 flex content-center items-center gap-4  px-2 py-3 text-xs p-1 border rounded text-center cursor-pointer bg-gray-300`}
          >
            <span className='text-lg font-medium '>{visibleTagCount < tags.length ? 'More...' : 'Less...'}</span>
          </li>
        )}
      </ul>}
    </Fragment>
  );
}