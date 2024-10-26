import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import Section from '../Section';
import Wrapper from '~/layout/Wrapper';
import { ArrowRightIcon } from '@sanity/icons';
import { ArrowLeftIcon } from '@sanity/icons';
import { useBaseUrl } from '../Context/UrlContext';

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  enablePageSlug = false
}: {
  totalPages: number,
  currentPage: number,
  onPageChange: (page: number) => void,
  enablePageSlug?: boolean
  content?: any
}) => {


  const baseUrl = useBaseUrl();
  
  if(totalPages === 1) return null 
  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl;
    return enablePageSlug
      ? `${baseUrl}/page/${page}`
      : `${baseUrl}/${page}`;
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return visiblePages.map((number) => (
      <Link
        key={number}
        href={getPageUrl(number)}
        onClick={() => handlePageChange(number)}
        className={`
          px-3 py-1
          rounded-md
          transition-all duration-300 ease-in-out
          ${currentPage === number
            ? 'text-zinc-900 font-semibold'
            : 'text-zinc-600 hover:bg-zinc-100'
          }
        `}
      >
        {number}
      </Link>
    ));
  };

  const arrowLinkClass = `
    p-2
    rounded-md
    transition-all duration-300 ease-in-out
    disabled:opacity-50
    disabled:cursor-not-allowed
    hover:bg-zinc-100
    group
    ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
  `;

  const nextArrowLinkClass = `
    p-2
    rounded-md
    transition-all duration-300 ease-in-out
    disabled:opacity-50
    disabled:cursor-not-allowed
    hover:bg-zinc-100
    group
    ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
  `;

  const iconClass = `
    transition-transform duration-300 ease-in-out
    group-hover:scale-110
  `;

  return (
    <Section className="justify-center md:pb-12 md:pt-16">
      <Wrapper className="justify-center">
        <div className="flex items-center space-x-2">
          <Link
            href={getPageUrl(currentPage - 1)}
            onClick={() => handlePageChange(currentPage - 1)}
            className={arrowLinkClass}
          >
            <ArrowLeftIcon 
              height={25}
              className={iconClass}
            />
          </Link>

          {renderPageNumbers()}

          <Link
            href={getPageUrl(currentPage + 1)}
            onClick={() => handlePageChange(currentPage + 1)}
            className={nextArrowLinkClass}
          >
            <ArrowRightIcon 
              height={25}
              className={iconClass}
            />
          </Link>
        </div>
      </Wrapper>
    </Section>
  );
};

export default Pagination;