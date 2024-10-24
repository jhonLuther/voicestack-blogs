import { useRouter } from 'next/router';
import React from 'react';
import Section from '../Section';
import Wrapper from '~/layout/Wrapper';
import { ArrowRightIcon } from '@sanity/icons';
import { ArrowLeftIcon } from '@sanity/icons';

const Pagination = ({ 
  totalPages, 
  currentPage, 
  baseUrl, 
  onPageChange, 
  enablePageSlug = false 
}: {
  totalPages: number,
  currentPage: number,
  baseUrl: string,
  onPageChange: (page: number) => void,
  enablePageSlug?: boolean
  content?: any
}) => {
  const router = useRouter()

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page)
      if (page === 1) {
        router.push(baseUrl)
      } else if (enablePageSlug) {
        router.push(`${baseUrl}/page/${page}`)
      } else {
        router.push(`${baseUrl}/${page}`)
      }
    }
  }


  const renderPageNumbers = () => {
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return visiblePages.map((number) => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className={`
          px-3 py-1 
          rounded-md
          transition-all duration-300 ease-in-out
          ${currentPage === number 
            ? ' text-gray-900 font-semibold' 
            : 'text-gray-600 hover:bg-gray-100'
          }
        `}
      >
        {number}
      </button>
    ));
  };

  const arrowButtonClass = `
    p-2
    rounded-md
    transition-all duration-300 ease-in-out
    disabled:opacity-50
    disabled:cursor-not-allowed
    hover:bg-gray-100
    group
  `;

  const iconClass = `
    transition-transform duration-300 ease-in-out
    group-hover:scale-110
  `;

  return (
    <Section className="justify-center md:pb-12 md:pt-16">
      <Wrapper className="justify-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={arrowButtonClass}
          >
            <ArrowLeftIcon 
              height={25}
              className={iconClass}
            />
          </button>
          
          {renderPageNumbers()}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={arrowButtonClass}
          >
            <ArrowRightIcon 
              height={25}
              className={iconClass}
            />
          </button>
        </div>
      </Wrapper>
    </Section>
  );
};

export default Pagination
