import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/components/Layout'
import Wrapper from '~/layout/Wrapper'
import AllcontentSection from '~/components/sections/AllcontentSection'
import { getClient } from '~/lib/sanity.client'
import { readToken } from '~/lib/sanity.api'
import { SharedPageProps } from '../../_app'
import {
  Articles,
  CaseStudies,
  Ebooks,
  Podcasts,
  PressRelease,
} from '~/interfaces/post'
import siteConfig from '../../../../config/siteConfig'
import React, { useRef } from 'react'
import Pagination from '~/components/commonSections/Pagination'
import {
  getHomeSettings,
  getPressReleases,
  getPressReleasesCount,
  getTags,
} from '~/lib/sanity.queries'
import BannerSubscribeSection from '~/components/sections/BannerSubscribeSection'
import { BaseUrlProvider } from '~/components/Context/UrlContext'
import { CustomHead, customMetaTag } from '~/utils/customHead'
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext'

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const allPressReleases: any = await getPressReleases(client)
  const totalPages = Math.ceil(
    allPressReleases.length / siteConfig.pagination.childItemsPerPage,
  )

  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { pageNumber: (i + 2).toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    pressReleases: PressRelease[]
    pageNumber: number
    totalPages: number
  }
> = async (context) => {
  const draftMode = context.preview || false
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const pageNumber = Number(context.params?.pageNumber) || 1
  const itemsPerPage = siteConfig.pagination.childItemsPerPage
  const skip = (pageNumber - 1) * itemsPerPage

  const pressReleases: any = await getPressReleases(client, skip, itemsPerPage)
  const totalPressReleases = await getPressReleasesCount(client)
  const totalPages = Math.ceil(totalPressReleases / itemsPerPage)
  const tags = await getTags(client)
  const homeSettings = await getHomeSettings(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      pressReleases,
      pageNumber,
      totalPages,
      tags,
      homeSettings,
    },
  }
}

const PaginatedPressReleasePage = ({
  pressReleases,
  tags,
  homeSettings,
  pageNumber,
  totalPages,
}: {
  pressReleases: Podcasts[]
  tags?: any
  homeSettings?: any
  pageNumber: number
  totalPages: number
}) => {
  const router = useRouter()
  const baseUrl = `/${siteConfig.pageURLs.pressRelease}`

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push(baseUrl)
    } else {
      router.push(`${baseUrl}/page/${page}`)
    }
  }

  return (
    <GlobalDataProvider data={tags} featuredTags={homeSettings?.featuredTags}>
      <BaseUrlProvider baseUrl={baseUrl}>
        <Layout>
          {pressReleases?.map((e, i) => {
            return <CustomHead props={e} type="pressRelease" key={i} />
          })}
          {customMetaTag('pressRelease')}
          <AllcontentSection
            className={'pb-9'}
            allContent={pressReleases}
            cardType="left-image-card"
            hideHeader={true}
            itemsPerPage={siteConfig.pagination.childItemsPerPage}
            contentType="press-release"
            showCount={true}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={pageNumber}
            onPageChange={handlePageChange}
            enablePageSlug={true}
            content={pressReleases}
            type="custom"
          />
          <BannerSubscribeSection />
        </Layout>
      </BaseUrlProvider>
    </GlobalDataProvider>
  )
}

export default PaginatedPressReleasePage
