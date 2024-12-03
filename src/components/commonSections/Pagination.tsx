import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import Section from '../Section'
import Wrapper from '~/layout/Wrapper'
import { ArrowRightIcon } from '@sanity/icons'
import { ArrowLeftIcon } from '@sanity/icons'
import { useBaseUrl } from '../Context/UrlContext'

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  enablePageSlug = false,
  type,
}: {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  enablePageSlug?: boolean
  content?: any
  type?: string
}) => {
  const baseUrl = useBaseUrl()

  if (totalPages === 1) return null

  const generateUrlForPageNum = (
    previousOrNext: string,
    currentPage: number,
    page: number,
  ) => {
    if ((previousOrNext === 'previous' && currentPage <= 1) || 
        (previousOrNext === 'next' && currentPage >= totalPages)) {
      return null
    }

    if (previousOrNext === 'previous') {
      if (currentPage === 1 || currentPage === 2) {
        return `${baseUrl}`
      } else {
        return enablePageSlug
          ? `${baseUrl}/page/${currentPage - 1}`
          : `${baseUrl}/${page}`
      }
    } else if (previousOrNext === 'next') {
      return enablePageSlug
        ? `${baseUrl}/page/${currentPage + 1}`
        : `${baseUrl}/${page}`
    }
    if (page < 2) {
      return baseUrl
    } else {
      return `${baseUrl}/page/${page}`
    }
  }

  const getPageUrl = (page: number, previousOrNext?: string) => {
    if (page < 1 || page > totalPages) {
      return null
    }

    if (type == 'custom') {
      const slug = generateUrlForPageNum(previousOrNext, currentPage, page)
      return slug
    } else {
      if (previousOrNext === 'previous' && currentPage !== 0) {
        return enablePageSlug
          ? `${baseUrl}/page/${currentPage - 1}`
          : `${baseUrl}/${page}`
      } else if (previousOrNext === 'next') {
        return enablePageSlug
          ? `${baseUrl}/page/${currentPage + 1}`
          : `${baseUrl}/${page}`
      }

      if ((page == 0) || (page == 1)) {
        return baseUrl
      } else {
        return enablePageSlug ? `${baseUrl}/page/${page}` : `${baseUrl}/${page}`
      }
    }
  }

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const renderPageNumbers = () => {
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return visiblePages.map((number) => (
      <Link
        key={number}
        href={getPageUrl(number) || baseUrl}
        onClick={() => handlePageChange(number)}
        className={`
          px-2 md:px-3 py-1
          rounded-md
          transition-all duration-300 ease-in-out
          ${
            currentPage === number
              ? 'text-zinc-900 font-semibold'
              : 'text-zinc-600 hover:bg-zinc-100'
          }
        `}
      >
        {number}
      </Link>
    ))
  }

  const isPreviousDisabled = currentPage <= 1
  const isNextDisabled = currentPage >= totalPages

  return (
    totalPages > 1 && (
      <Section className="justify-center md:pb-12 md:pt-16">
        <Wrapper className="justify-center">
          <div className="flex items-center space-x-2 flex-wrap">
            {!isPreviousDisabled ? (
              <Link
                href={getPageUrl(currentPage, 'previous') || baseUrl}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`
                  p-2
                  rounded-md
                  transition-all duration-300 ease-in-out
                  hover:bg-zinc-100
                  group
                `}
              >
                <ArrowLeftIcon height={25} className="transition-transform duration-300 ease-in-out group-hover:scale-110" />
              </Link>
            ) : (
              <span
                className={`
                  p-2
                  rounded-md
                  opacity-50
                `}
              >
                <ArrowLeftIcon height={25} className="opacity-50" />
              </span>
            )}

            {renderPageNumbers()}

            {!isNextDisabled ? (
              <Link
                href={getPageUrl(currentPage, 'next') || baseUrl}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`
                  p-2
                  rounded-md
                  transition-all duration-300 ease-in-out
                  hover:bg-zinc-100
                  group
                `}
              >
                <ArrowRightIcon height={25} className="transition-transform duration-300 ease-in-out group-hover:scale-110" />
              </Link>
            ) : (
              <span
                className={`
                  p-2
                  rounded-md
                  opacity-50
                `}
              >
                <ArrowRightIcon height={25} className="opacity-50" />
              </span>
            )}
          </div>
        </Wrapper>
      </Section>
    )
  )
}

export default Pagination