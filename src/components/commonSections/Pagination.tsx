import { useRouter } from 'next/router';
import { ChevronLeftIcon, ChevronRightIcon } from '@sanity/icons';

const Pagination = ({ totalPages, baseUrl }:any) => {
  const router = useRouter();
  const { pageNumber }:any = router.query;
  const currentPage:any = parseInt(pageNumber) || 1; 

  const handlePageChange = (pageNumber) => {
    router.push(`${baseUrl}/${pageNumber}`);
  };

  const renderPageNumbers = () => {
    const visiblePageNumbers = [...Array(totalPages)].map((_, i) => i + 1).filter(
      (number) =>
        number === 1 ||
        number === totalPages ||
        (number >= currentPage - 1 && number <= currentPage + 1)
    );

    return visiblePageNumbers.map((number, index, array) => {
      if (index > 0 && number - array[index - 1] > 1) {
        return (
          <span key={`ellipsis-${number}`} className="px-2 py-1">
            ...
          </span>
        );
      }

      return (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`px-3 py-1 rounded-md ${
            currentPage === number
              ? 'bg-cs-green-200 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {number}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon  height={25} />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon height={25} />
      </button>
    </div>
  );
};

export default Pagination;
