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
    if (previousOrNext === 'previous') {
      if (currentPage >= 2) {
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

      if (page == 0) {
        return baseUrl
      } else {
        return enablePageSlug ? `${baseUrl}/page/${page}` : `${baseUrl}/${page}`
      }
    }
  }

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page)
    }
  }

  const renderPageNumbers = () => {
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return visiblePages.map((number) => (
      <Link
        key={number}
        href={getPageUrl(number)}
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

  const arrowLinkClass = `
    p-2
    rounded-md
    transition-all duration-300 ease-in-out
    disabled:opacity-50
    disabled:cursor-not-allowed
    hover:bg-zinc-100
    group
    ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
  `

  const nextArrowLinkClass = `
    p-2
    rounded-md
    transition-all duration-300 ease-in-out
    disabled:opacity-50
    disabled:cursor-not-allowed
    hover:bg-zinc-100
    group
    ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
  `

  const iconClass = `
    transition-transform duration-300 ease-in-out
    group-hover:scale-110
  `

  return (
    totalPages > 1 && <Section className="justify-center md:pb-12 md:pt-16">
      <Wrapper className="justify-center">
        <div className="flex items-center space-x-2">
          <Link
            href={getPageUrl(currentPage, 'previous')}
            onClick={() => handlePageChange(currentPage - 1)}
            className={arrowLinkClass}
          >
            <ArrowLeftIcon height={25} className={iconClass} />
          </Link>

          {renderPageNumbers()}

          <Link
            href={getPageUrl(currentPage, 'next')}
            onClick={() => handlePageChange(currentPage + 1)}
            className={nextArrowLinkClass}
          >
            <ArrowRightIcon height={25} className={iconClass} />
          </Link>
        </div>
      </Wrapper>
    </Section>
  )
}

export default Pagination
