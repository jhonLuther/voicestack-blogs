import React, { useId } from 'react'
import { breadCrumbJsonLd, generateJSONLD } from './generateJSONLD'
import Head from 'next/head'
import { urlForImage } from '~/lib/sanity.image'
import { getIframeUrl } from '~/components/commonSections/VideoModal'

const ogMetaData = {
  article: {
    'title': 'Articles | Official CareStack® Article Series, Read Now',
    keywords:
      'carestack articles, carestack blog articles, carestack educational articles, dental articles, articles for dentists',
    'og:description':
      'Read some of the CareStack® Articles—perspectives from industry experts & the CareStack team on gaining growth & optimizing performance at your dental office.',
    'og:url': 'https://carestack.com/support/resources/articles',
    author: 'CareStack®',
  },
  ebook: {
    'title': 'Official CareStack® eBook Series, Read Now',
    keywords:
      'carestack ebooks, downloadable carestack ebooks, carestack educational ebooks, dental ebooks, ebooks for dentists',
    'og:description':
      'Read some of the CareStack® e-Books—a collection of playbooks created by industry experts to help you build the right kind of practice management systems.',
    'og:url': 'https://carestack.com/support/resources/e-books',
    author: 'CareStack®',
  },
  podcast: {
    'title': 'Podcasts | Official CareStack® Podcast Series, Listen Now',
    keywords:
      'carestack podcasts, carestack audio podcasts, carestack educational podcasts, dental software, podcasts, podcasts for dentists',
    'og:description':
      'Listen to some of the CareStack® Podcasts—an audio series from practice owners on how they navigated the change and successfully transitioned to CareStack.',
    'og:url': 'https://carestack.com/support/resources/podcasts',
    author: 'CareStack®',
  },
  webinar: {
    'title': 'Webinars | Official CareStack® Webinar Series, Watch Now',
    keywords:
      'carestack webinars, carestack webinar recordings, carestack educational webinars, dental software webinars',
    'og:description':
      'Watch CareStack® Webinars—steamable recordings from practice owners, industry leaders, & CareStack team members discussing trending topics & best practices.',
    'og:url': 'https://carestack.com/support/resources/webinars',
    author: 'CareStack®',
  },
  caseStudy: {
    'title': 'In-Depth Case Studies | Achieving Success With CareStack®',
    keywords:
      'carestack case studies, carestack customer experiences, carestack client experiences, dental office outcomes',
    'og:description':
      'Read first-hand, in-depth accounts of practices that have faced a challenge, found a solution, and achieved success transitioning to CareStack.',
    'og:url': 'https://carestack.com/dental-software/case-studies',
    author: 'CareStack®',
  },
  pressRelease: {
    'title': 'Press | CareStack® Press & News | Downloadable Press Kit',
    keywords:
      'carestack press kit, carestack in the press, press about carestack, carestack in the news, news about carestack',
    'og:description':
      'CareStack® frequently makes waves in the news media. View some of our recent headlines, download our press kit, or contact our corporate press representative.',
    'og:url': 'https://carestack.com/company/press',
    author: 'CareStack®',
  },
}

export const customMetaTag = (type: string) => {
  if (type) {
    const metaData = ogMetaData[type];
    if (metaData) {
      return Object.keys(metaData).map((key,i) => (
        <Head key={i}>
          {key === 'title' ? (
            <title> {metaData[key]}</title>
          ) : (
            <meta property={key} content={metaData[key]} key={key} />
          )}
        </Head>
      ))
    }
  }
  return null
}


export const generateMetaData = (params: any, type?: string) => {
  if (type) {
    customMetaTag(type)
  }
  if (params) {
    return (
      <Head>
        <meta property="og:type" content="website" />
        {params?.mainImage ? (
          <meta
            property="og:image"
            content={urlForImage(params?.mainImage?._id)}
          ></meta>
        ) : null}

        {params?.title ? (
          <meta property="og:title" content={params?.title}></meta>
        ) : (
          <></>
        )}

        {params?.excerpt ? (
          <meta property="og:description" content={params?.excerpt}></meta>
        ) : (
          <></>
        )}
      </Head>
    )
  }
}

export function CustomHead({
  props,
  type = null,
  pageNumber = null,
  paginationType = '',
}: any) {
  const randomId = useId() + Math.log(Math.random())
  const url = process?.env?.NEXT_PUBLIC_BASE_URL

  const head = (data: any, i: string) => {
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
    return props?.map((e, i) => {
      const data = generateJSONLD(e)
      return head(e, i)
    })
  } else if (props && type == 'caseStudy') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: [props?.title],
      image: urlForImage(props?.mainImage?._id),
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
      headline: props?.title ?? '',
      image: [urlForImage(props?.mainImage?._id)],
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
          abstract: props?.excerpt,
        },
        bookFormat: 'http://schema.org/EBook',
        datePublished: props?.publishedAt ?? null,
        image: urlForImage(props?.mainImage),
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
      image: urlForImage(props.mainImage),
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
        name: props?.author?.map((e: any) => {
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
  } else if (props && type === 'breadCrumbs') {
    return breadCrumbJson(props)
  } else if (props && type === 'pagination') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      author: {
        '@type': 'Person',
        description: props?.map((ele) => {
          return ele.excerpt
        }),
        name: props?.map((ele) => {
          return ele?.author?.map((a) => a.name)
        }),
        url: 'https://carestack.com',
      },
      itemListElement: [
        {
          '@type': 'ListItem',
          position: pageNumber ?? 1,
          url:
            props && props[0]
              ? `www.carestack.com/${props[0]?.contentType}/page/${pageNumber}`
              : 'www.carestack.com',
        },
      ],
      numberOfItems: 3,
      name: paginationType,
    }
    return head(metaData, randomId)
  } else if (props && type === 'podcast') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: props?.title,
      location: 'global',
      organizer: 'CareStack',
      startDate: new Date(),
      description: props?.excerpt,
      datePublished: props?.publishedAt,
      image: urlForImage(props?.mainImage?._id),
      address: 'CareStack',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      author: props?.author?.map((e) => ({
        '@type': 'Person',
        name: e?.name,
        image: e?.picture,
      })),
    }
    return head(metaData, randomId)
  } else if (props && type === 'pressRelease') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://example.com/my-news-article',
      },
      headline: props?.title,
      image: urlForImage(props?.mainImage?._id),
      datePublished: new Date(props?.date),
      dateModified: new Date(props?.date),
      author: {
        '@type': 'Person',
        name: props?.author?.map((e) => {
          return e?.name
        }),
      },
      publisher: {
        '@type': 'Organization',
        name: 'CareStack',
        logo: {
          '@type': 'ImageObject',
          url: 'https://elitestrategies-elitestrategies.netdna-ssl.com/wp-content/uploads/2013/04/elitestrategies.png',
        },
      },
      description: props?.excerpt,
    }
    return head(metaData, randomId)
  }
}
