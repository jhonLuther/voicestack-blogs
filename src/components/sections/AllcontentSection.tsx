import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowTopRightIcon } from '@sanity/icons';

import siteConfig from 'config/siteConfig';
import Wrapper from '~/layout/Wrapper';
import Card from '../Card';
import Section from '../Section';
import H2Large from '../typography/H2Large';
import SearchBar from '../widgets/SearchBar';
import { useBaseUrl } from '../Context/UrlContext';

interface LatestBlogsProps {
  allContent: any[];
  hideHeader?: boolean;
  className?: string;
  cardType?: 'podcast-card' | 'ebook-card' | 'featured' | 'top-image-smallCard' | "left-image-card";
  redirect?: boolean;
  itemsPerPage?: number;
  customBrowseContent?: any;
  enableDateSort?: boolean
  allItemCount?: any
}

const AllcontentSection: React.FC<LatestBlogsProps> = ({
  allContent,
  customBrowseContent,
  hideHeader = false,
  className,
  cardType,
  itemsPerPage,
  redirect = false,
  enableDateSort,
  allItemCount
}) => {
  const postsToShow = itemsPerPage || siteConfig.pagination.itemsPerPage;
  const [selectedTag, setSelectedTag] = React.useState('');
  const router = useRouter();

  const baseUrl = useBaseUrl();

  const totalCount = allItemCount ? allItemCount : allContent.length;

  useEffect(() => {
    const updateSelectedTag = () => {
      const isBrowsePath = router.pathname.includes('/browse/');
      
      if (isBrowsePath) {
        const pathParts = router.asPath.split('/');
        const isPageRoute = pathParts.includes('page');
  
        if (isPageRoute) {
          const storedTag = window.localStorage.getItem("selectedTag");
          if (storedTag && storedTag !== 'null' && storedTag !== 'undefined') {
            const cleanTag = storedTag
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            setSelectedTag(cleanTag);
          } else {
            setSelectedTag('');
          }
        } else {
          const tagFromUrl = pathParts[pathParts.length - 1];
          if (tagFromUrl && tagFromUrl !== 'browse') {
            const cleanTag = tagFromUrl
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            setSelectedTag(cleanTag);
          } else {
            setSelectedTag('');
          }
        }
      } else {
        setSelectedTag('');
        window.localStorage.removeItem("selectedTag");
      }
    };
  
    updateSelectedTag();
  }, [router.pathname, router.asPath]);

  if (!allContent) {
    return null;
  }

  const renderPosts = () => {
    const posts = [];
    const slicedContent = allContent.slice(0, postsToShow);

    slicedContent.forEach((post, index) => {
      const isVaryingIndex = (index >= 3 && (index - 3) % 9 === 0) && cardType !== 'left-image-card';
      const shouldUseCustomContent = isVaryingIndex && customBrowseContent;
      
      if (isVaryingIndex && !customBrowseContent) {
        return;
      }

      const postContent = shouldUseCustomContent ? customBrowseContent : post;
      
      posts.push(
        <div 
          id={index.toString()} 
          key={postContent._id || index} 
          className={`${isVaryingIndex ? 'row-span-2' : ''}`}
        >
          <Card
            varyingIndex={isVaryingIndex} 
            cardType={cardType} 
            cardColor='white' 
            post={postContent} 
            className=''
            baseUrl={baseUrl}
          />
        </div>
      );
    });

    return posts;
  };

  return (
    <Section className={`justify-center md:pb-0 md:pt-24`}>
      <Wrapper className={`flex-col`}>
        {!hideHeader && <div className="md:flex-row flex-col gap-8 flex items-end justify-between pb-12">
          <H2Large className='tracking-tighterText'>
            {`${selectedTag ? selectedTag : 'Explore All'} `}
          </H2Large>
          {redirect ? (
            <Link href={siteConfig.paginationBaseUrls.base}>
              <div className='flex items-center gap-3 transform group duration-300 cursor-pointer'>
                <span className='text-base font-medium'>{`Browse All`}</span>
                <span className="text-xl">
                  <ArrowTopRightIcon 
                    className='group-hover:translate-y-[-2px] transition-transform duration-300' 
                    height={20} 
                    width={20} 
                  />
                </span>
              </div>
            </Link>
          ):(<div className='text-zinc-700 font-normal text-base'>{`${totalCount} ${totalCount > 1 ? 'results' : 'result'}`}</div>)}
        </div>}

        <div className={`grid 
          ${cardType === 'left-image-card' 
            ? 'lg:grid-cols-2 md:grid-cols-1 gap-x-16 gap-y-12' 
            : cardType === 'podcast-card' 
            ? 'lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-9 gap-y-8' 
            : 'lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-9 gap-y-8'
          }
        `}>
          {allContent && allContent.length > 0 ? (
            renderPosts()
          ) : (
            <div className="text-center py-10">
              <p>No matching posts found.</p>
            </div>
          )}
        </div>
      </Wrapper>
    </Section>
  );
};

export default AllcontentSection;