import { Fragment, useState } from 'react';

interface TagSelectProps {
  contentTypes: string[];
  tags: string[];
  onContentTypeChange: (contentType: string) => void;
  onTagChange: (tag: string) => void;
  selectedTags: string[];
  tagLimit: number;
}

export default function TagSelect({ contentTypes, tags, onContentTypeChange, onTagChange, selectedTags, tagLimit }: TagSelectProps) {
  const [visibleTagCount, setVisibleTagCount] = useState(tagLimit);

  const handleShowMore = () => {
    setVisibleTagCount(tags.length); 
  };

  const handleShowLess = () => {
    setVisibleTagCount(tagLimit); 
  };

  return (
    <Fragment>
      <select onChange={(e) => onContentTypeChange(e.target.value)} className="mb-4 p-2 border rounded">
        <option value="">All Content Types</option>
        {contentTypes && contentTypes.map((type, i) => (
          <option key={i} value={type}>
            {type}
          </option>
        ))}
      </select>

      <ul className="flex gap-2 m-5 flex-wrap">
        {tags && tags.slice(0, visibleTagCount).map((tag, i) => (
          <li
            key={i}
            onClick={() => onTagChange(tag)}
            className={`flex content-center items-center gap-4 text-xs p-1 border rounded-full text-center cursor-pointer ${
              selectedTags.includes(tag) ? 'bg-black text-white' : 'bg-gray-400 text-black'
            }`}
          >
            <span>{tag}</span>
          </li>
        ))}
        {(
          <li
            onClick={visibleTagCount < tags.length ?  handleShowMore : handleShowLess}
            className={` ${visibleTagCount < tags.length ? 'bg-black' :'text-white' }flex content-center items-center gap-4 text-xs p-1 border rounded-full text-center cursor-pointer bg-gray-400`}
          >
            <span>{`${visibleTagCount < tags.length ? 'More...' : 'Less...' }`}</span>
          </li>
        )}
      </ul>
    </Fragment>
  );
}
