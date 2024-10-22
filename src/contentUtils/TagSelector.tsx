import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

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
  const [selectedTag, setSelectedTag] = useState('');
  const router = useRouter();

  useEffect(() => {
    const slug = router.query.slug as string || tags[0]?.slug?.current || '';
    setSelectedTag(slug);
    localStorage.setItem('selectedTag', slug); 
  }, [router.query.slug, tags]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedTag]);

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
        <div className="flex flex-col gap-6 pb-8 md:pb-12 pt-8 md:pt-16 border-b-2 border-gray-900">
          {showHeading && selectedTag && (
            <h2 className="md:text-5xl text-xl text-center font-manrope font-extrabold text-cs-gray-900">
              {`"${tags.find(tag => tag.slug.current === selectedTag)?.tagName || ''}"`}
            </h2>
          )}

          <h2 className='text-[18px] font-medium leading-[1.6]'>Recommended Topics</h2>
          <ul className={`flex gap-2 flex-wrap ${className}`}>
            {tags &&
              tags.slice(0, visibleTagCount).map((tag, i) => (
                <Link key={i} href={`/browse/${tag.slug.current}`} scroll={false}>
                  <li
                    onClick={() => onTagChanges(tag)}
                    className={`flex group hover:transition duration-500 content-center items-center gap-4 py-2 px-[18px] text-base font-normal 
                      border border-gray-200 rounded-lg text-center cursor-pointer 
                      ${
                        selectedTag === tag.slug.current
                          ? 'bg-zinc-500 text-zinc-200'
                          : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-500 hover:text-zinc-200'
                      }`}
                  >
                    <span className="text-lg font-medium">{tag.tagName}</span>
                  </li>
                </Link>
              ))}
            {tags.length > tagLimit && (
              <li
                onClick={visibleTagCount < tags.length ? handleShowMore : handleShowLess}
                className={`bg-zinc-100 text-zinc-900 hover:bg-zinc-500 hover:text-zinc-200 flex content-center items-center gap-4 py-2 px-[18px] text-xs p-1 border border-gray-200 rounded-lg text-center cursor-pointer`}
              >
                <span className="text-lg font-medium">
                  {visibleTagCount < tags.length ? 'See More Topics...' : 'See Less...'}
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </Fragment>
  );
}
