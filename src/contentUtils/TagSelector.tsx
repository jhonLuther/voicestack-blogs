import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Section from '~/components/Section';
import Wrapper from '~/layout/Wrapper';

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
    <Section className='bg-gray-900 justify-center !py-0'>
      <Wrapper>
      {showTags && (
        <div className="flex flex-row gap-6 pt-6 md:pt-6 pb-6">
          {/* {showHeading && selectedTag && (
            <h2 className="md:text-5xl text-xl text-center font-manrope font-extrabold text-cs-gray-900">
              {`"${tags.find(tag => tag.slug.current === selectedTag)?.tagName || ''}"`}
            </h2>
          )} */}

          <span className='text-[14px] font-medium leading-[1.5] pt-[6px] text-zinc-500 flex items-center gap-x-1 self-start'>
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99996 18.8334C14.6023 18.8334 18.3333 15.1024 18.3333 10.5001C18.3333 5.89771 14.6023 2.16675 9.99996 2.16675C5.39758 2.16675 1.66663 5.89771 1.66663 10.5001C1.66663 15.1024 5.39758 18.8334 9.99996 18.8334Z" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.2683 7.38833C12.6755 7.25263 12.879 7.18477 13.0144 7.23304C13.1322 7.27505 13.2249 7.36775 13.2669 7.48555C13.3152 7.62092 13.2473 7.82449 13.1116 8.2316L11.872 11.9504C11.8333 12.0664 11.814 12.1244 11.7811 12.1725C11.7519 12.2152 11.7151 12.252 11.6724 12.2812C11.6242 12.3141 11.5663 12.3334 11.4503 12.3721L7.73148 13.6117C7.32436 13.7474 7.1208 13.8153 6.98543 13.767C6.86763 13.725 6.77493 13.6323 6.73292 13.5145C6.68465 13.3791 6.7525 13.1756 6.8882 12.7684L8.12783 9.04961C8.16648 8.93361 8.18581 8.87569 8.21874 8.82752C8.24791 8.78488 8.28475 8.74803 8.3274 8.71886C8.37557 8.68593 8.43349 8.6666 8.54949 8.62795L12.2683 7.38833Z" stroke="#71717A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Explore</span>
          {/* <ul className={`flex gap-2 flex-wrap border-b border-zinc-500 ${className}`}> */}
          <ul className={`flex gap-x-8 flex-wrap ${className}`}>
            {tags &&
              tags.slice(0, visibleTagCount).map((tag, i) => (
                  <li
                    key={tag._id || i}
                    onClick={() => onTagChanges(tag)}
                    className={`flex py-1 text-base text-[14px] font-medium leading-[1.5] text-center cursor-pointer 
                      ${ selectedTag === tag.slug.current
                          ? 'text-zinc-300'
                          : 'text-zinc-400 hover:hover:text-zinc-300'
                      }`}
                  >
                    <Link key={i} href={`/browse/${tag.slug.current}`} scroll={false}>
                        <span>{tag.tagName}</span>
                    </Link>
                  </li>
              ))}
            {tags.length > tagLimit && (
              <li
                onClick={visibleTagCount < tags.length ? handleShowMore : handleShowLess}
                className={` text-zinc-300  hover:text-zinc-400 flex content-center items-center gap-4 py-1 text-[14px] text-center cursor-pointer`}
              >
                <span>
                  {visibleTagCount < tags.length ? 'See More Topics...' : 'See Less...'}
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
      </Wrapper>
    </Section>
  );
}
