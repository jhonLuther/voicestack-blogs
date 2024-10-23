import { useRouter } from 'next/router';
import { ChevronLeftIcon, ChevronRightIcon } from '@sanity/icons';
import React from 'react';
import Section from '../Section';
import Wrapper from '~/layout/Wrapper';

const Pagination = ({ totalPages, currentPage, baseUrl, onPageChange, enablePageSlug = false }: { 
  totalPages: number, 
  currentPage: number, 
  baseUrl: string,
  onPageChange: (page: number) => void,
  enablePageSlug?: boolean
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
      if (page === 1) {
        router.push(baseUrl);
      } else if (enablePageSlug) {
        router.push(`${baseUrl}/page/${page}`);
      } else {
        router.push(`${baseUrl}/${page}`);
      }
    }
  };

  const renderPageNumbers = () => {
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return visiblePages.map((number) => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className={`px-3 py-1 ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
        disabled={currentPage === number}
      >
        {number}
      </button>
    ));
  };

  return (
    <Section  className={` justify-center `}>
      <Wrapper  className={` justify-center `}>
    <div className="flex space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 text-black"
      >
        <ChevronLeftIcon height={25} />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 text-black"
      >
        <ChevronRightIcon height={25} />
      </button>
    </div>
    </Wrapper>
    </Section>
  );
};

export default Pagination;