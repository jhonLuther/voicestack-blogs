import React, { useId } from 'react'
import { breadCrumbJsonLd, generateJSONLD } from './generateJSONLD'
import Head from 'next/head'
import { urlForImage } from '~/lib/sanity.image'
import { getIframeUrl } from '~/components/commonSections/VideoModal'

export default function CustomHead({ props, type = null }: any) {
  const randomId = useId() + Math.log(Math.random())

  const head = (data, i) => {
    return (
      <Head key={i}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        ></script>
      </Head>
    )
  }

  const breadCrumbJson = (data: any) => {
    const metadata = breadCrumbJsonLd(data)
    return (
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata) }}
        ></script>
      </Head>
    )
  }

  if (props && type === null) {
    return props.map((e, i) => {
      const data = generateJSONLD(e)

      return head(e, i)
    })
  } else if (props && type == 'caseStudy') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: [props.title],
      // image: props?.author[0]?.picture ?? '',
      author: {
        '@type': 'Person',
        name: [
          props?.author?.map((e) => {
            return e.name
          }),
        ],
        url: 'https://carestack.com',
      },
      dateCreated: new Date(),
      inLanguage: 'en-US',
      copyrightHolder: {
        '@id': 'https://carestack.com/#organization',
      },
      publisher: {
        '@type': 'Organization',
        name: 'CareStack',
        url: 'https://carestack.com',
      },
    }
    return head(metaData, randomId)
  } else if (props && type === 'articleExpanded') {
    /* for url if author url available add field , for now  url:"www.carestack.com" */
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: props.title ?? '',
      image: [urlForImage(props?.mainImage).width(300).height(300).url()],
      author: [
        props?.author?.map((e) => {
          return {
            '@type': 'Person',
            name: e.name,
            url: 'www.carestack.com',
          }
        }) || null,
      ],
    }
    return head(metaData, randomId)
  } else if (props && type === 'podcast') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'PodcastEpisode',
      name: 'post.title',
      description: 'post.excerpt',
      datePublished: 'post._createdAt',
      author: {
        '@type': 'Person',
        name: 'Unknown Author',
      },
    }
    return head(metaData, randomId)
  } else if (props && type === 'eBook') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      breadcrumb: `HOME > EBOOK > ${props.slug?.current}`,
      mainEntity: {
        '@type': 'Book',
        author: {
          '@type': 'Person',
          name: props?.author?.map((e) => {
            return e.name
          }),
          abstract: props.excerpt,
        },
        bookFormat: 'http://schema.org/EBook',
        datePublished: props.publishedAt ?? null,
        image: urlForImage(props.mainImage).width(300).height(300).url(),
        inLanguage: 'English',
        isbn: '00000000',
        numberOfPages: '1234',
        publisher: 'CareStack',
        name: props?.title,
        ratingValue: 5,
        aggregateRating: {
          '@type': 'AggregateRating',
          reviewCount: '5',
          name: props?.title,
          ratingValue: 5,
        },
        url: props?.attachment?.asset?.url,
      },
    }
    return head(metaData, randomId)
  } else if (props && type === 'webinar') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: props.title,
      description: props.excerpt,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      startDate: '2024-11-10T14:00:00+00:00',
      endDate: '2024-11-10T15:30:00+00:00',
      url: props?.videos?.map((video) => {
        return getIframeUrl(video?.platform, video?.videoId)
      }),
      image: urlForImage(props.mainImage).width(300).height(300).url(),
      location: {
        '@type': 'VirtualLocation',
        url: props?.videos?.map((video) => {
          return getIframeUrl(video?.platform, video?.videoId)
        }),
      },
      organizer: {
        '@type': 'Organization',
        name: 'CareStack',
        url: 'https://carestack.com',
      },
      performer: {
        '@type': 'Person',
        name: props.author.map((e: any) => {
          return e.name
        }),
      },
      offers: {
        '@type': 'Offer',
        url: props?.videos?.map((video) => {
          return getIframeUrl(video?.platform, video?.videoId)
        }),
        availability: 'https://schema.org/InStock',
      },
    }
    return head(metaData, randomId)
  } else if (props && type === 'breadCrumbs') {
    return breadCrumbJson(props)
  }
}
