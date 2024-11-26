import React, { useId } from 'react'
import { breadCrumbJsonLd, generateJSONLD } from './generateJSONLD'
import Head from 'next/head'
import { urlForImage } from '~/lib/sanity.image'
import { getIframeUrl } from '~/components/commonSections/VideoModal'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  name: 'CareStack',
  legalName: 'Good Methods Global, Inc.',
  image:
    'https://a.storyblok.com/f/144863/1200x1200/db11368ff8/carestack-logo-1200x1200.jpg',
  logo: 'https://a.storyblok.com/f/144863/1200x1200/db11368ff8/carestack-logo-1200x1200.jpg',
  url: 'https://carestack.com',
  email: 'hello@carestack.com',
  numberOfEmployees: '600',
  description:
    'CareStack is an award-winning, cloud dental practice management software trusted by thousands of dentists & dental practices.',
  slogan: "The last dental software you'll ever need.",
  mainEntityOfPage: 'https://carestack.com',
  areaServed: [
    {
      '@type': 'Country',
      name: 'United States',
    },
    {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  ],
  keywords:
    'carestack, dental software, carestack dental software, top dental software, best dental software, cloud dental practice management software, dental practice management software',
  knowsAbout: [
    'Dental Software',
    'Cloud Dental Software',
    'Dental Practice Management Software',
  ],
  foundingDate: '2015-01-07',
  founders: [
    {
      '@type': 'Person',
      name: 'Abhi Krishna',
      jobTitle: 'Co-Founder & CEO',
    },
    {
      '@type': 'Person',
      name: 'Varun Nelson',
      jobTitle: 'Co-Founder & VP Product Opearations',
    },
    {
      '@type': 'Person',
      name: 'Kevin Cook',
      jobTitle: 'Co-Founder & VP, Customer Experience',
    },
  ],
  awards: [
    '2022 Software Advice FrontRunner',
    '2022 Software Suggest Trending',
    '2022 GetApp Category Leader',
    '2021 G2 High Performer',
    '2021 SoftwarePundit SMB10',
    'G2 Best Meets Requirements - Summer 2024',
    'G2 Best Meets Requirements (Small Business) - Summer 2024',
    'G2 Best Relationship (Small Business) - Summer 2024',
    'G2 Best Relationship - Summer 2024',
    'G2 Best Results - Summer 2024',
    'G2 Best Support - Summer 2024',
    'G2 Best Usability (Small Business) - Summer 2024',
    'G2 Best Usability - Summer 2024',
    'G2 Highest User Adoption (Small Business) - Summer 2024',
    'G2 Leader - Summer 2024',
    'G2 Leader (Small Business) - Summer 2024',
    'G2 Momentum Leader - Summer 2024',
    'MarketsandMarkets Emerging Leader',
  ],
  sameAs: [
    'https://carestack.com',
    'https://www.facebook.com/CareStackSystem/',
    'https://twitter.com/CareStackSystem/',
    'https://www.instagram.com/carestack_/',
    'https://www.youtube.com/@CareStack',
    'https://www.linkedin.com/company/carestack/',
    'https://vimeo.com/user14264510',
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '2954 Mallory Cir #209',
      addressLocality: 'Kissimmee',
      addressRegion: 'FL',
      postalCode: '34747',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '10th Yamuna, Technopark Phase III Main Rd',
      addressLocality: 'Thiruvananthapuram',
      addressRegion: 'KL',
      postalCode: '695583',
      addressCountry: 'IN',
    },
  ],
  '@logo': [
    {
      '@type': 'ImageObject',
      '@id':
        'https://a.storyblok.com/f/144863/1200x1200/db11368ff8/carestack-logo-1200x1200.jpg',
      url: 'https://a.storyblok.com/f/144863/1200x1200/db11368ff8/carestack-logo-1200x1200.jpg',
      contentUrl:
        'https://a.storyblok.com/f/144863/1200x1200/db11368ff8/carestack-logo-1200x1200.jpg',
      caption: 'CareStack logo',
      inLanguage: ['en-US', 'en-GB'],
      width: 1200,
      height: 1200,
    },
  ],
  '@icon': [
    {
      '@type': 'ImageObject',
      '@id':
        'https://a.storyblok.com/f/144863/1201x1201/a1d1cbd61c/carestack-favicon-1200x1200.png',
      url: 'https://a.storyblok.com/f/144863/1201x1201/a1d1cbd61c/carestack-favicon-1200x1200.png',
      contentUrl:
        'https://a.storyblok.com/f/144863/1201x1201/a1d1cbd61c/carestack-favicon-1200x1200.png',
      caption: 'CareStack icon',
      inLanguage: ['en-US', 'en-GB'],
      width: 1200,
      height: 1200,
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+1 (407) 833-6123',
      email: 'support@carestack.com',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      telephone: '+1 (407) 833-6123',
      email: 'sales@carestack.com',
    },
  ],
}

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

const siteLink = {
  '@context': 'https://schema.org/',
  '@type': 'WebSite',
  name: 'CareStack',
  url: 'https://carestack.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://carestack.com/?s={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export const orgSchema = () => {
  return head(
    organizationSchema,
    Math.log10(Math.random()).toString() + 'randomId',
  )
}

export const siteLinkSchema = () => {
  return head(siteLink, Math.log10(Math.random()).toString() + 'randomId1')
}

const ogMetaData = {
  article: {
    title: 'Articles | Official CareStack® Article Series, Read Now',
    keywords:
      'carestack articles, carestack blog articles, carestack educational articles, dental articles, articles for dentists',
    'og:description':
      'Read some of the CareStack® Articles—perspectives from industry experts & the CareStack team on gaining growth & optimizing performance at your dental office.',
    'og:url': 'https://carestack.com/support/resources/articles',
    author: 'CareStack®',
  },
  ebook: {
    title: 'Official CareStack® eBook Series, Read Now',
    keywords:
      'carestack ebooks, downloadable carestack ebooks, carestack educational ebooks, dental ebooks, ebooks for dentists',
    'og:description':
      'Read some of the CareStack® e-Books—a collection of playbooks created by industry experts to help you build the right kind of practice management systems.',
    'og:url': 'https://carestack.com/support/resources/e-books',
    author: 'CareStack®',
  },
  podcast: {
    title: 'Podcasts | Official CareStack® Podcast Series, Listen Now',
    keywords:
      'carestack podcasts, carestack audio podcasts, carestack educational podcasts, dental software, podcasts, podcasts for dentists',
    'og:description':
      'Listen to some of the CareStack® Podcasts—an audio series from practice owners on how they navigated the change and successfully transitioned to CareStack.',
    'og:url': 'https://carestack.com/support/resources/podcasts',
    author: 'CareStack®',
  },
  webinar: {
    title: 'Webinars | Official CareStack® Webinar Series, Watch Now',
    keywords:
      'carestack webinars, carestack webinar recordings, carestack educational webinars, dental software webinars',
    'og:description':
      'Watch CareStack® Webinars—steamable recordings from practice owners, industry leaders, & CareStack team members discussing trending topics & best practices.',
    'og:url': 'https://carestack.com/support/resources/webinars',
    author: 'CareStack®',
  },
  caseStudy: {
    title: 'In-Depth Case Studies | Achieving Success With CareStack®',
    keywords:
      'carestack case studies, carestack customer experiences, carestack client experiences, dental office outcomes',
    'og:description':
      'Read first-hand, in-depth accounts of practices that have faced a challenge, found a solution, and achieved success transitioning to CareStack.',
    'og:url': 'https://carestack.com/dental-software/case-studies',
    author: 'CareStack®',
  },
  pressRelease: {
    title: 'Press | CareStack® Press & News | Downloadable Press Kit',
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
    const metaData = ogMetaData[type]
    if (metaData) {
      return Object.keys(metaData).map((key, i) => (
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

export const defaultMetaTag = (params: any) => {
  return (
    <Head key={params?._id}>
      <meta property="og:type" content="website" />
      <meta property="og:url" content="www.carestack.com" />
      {params?.siteTitle ? <title>{params.siteTitle?.trim()}</title> : <></>}
      {params?.siteDescription ? (
        <meta property="og:description" content={params.siteDescription}></meta>
      ) : (
        <></>
      )}
      {params?.openGraphImage ? (
        <meta
          property="og:image"
          content={urlForImage(params.openGraphImage?.asset?._ref)}
        ></meta>
      ) : (
        <></>
      )}
      {params?.keywords ? (
        <meta
          name="keywords"
          content={params.keywords.reduce((ac: string, reducer: string) => {
            return ac + ',' + reducer
          })}
        ></meta>
      ) : (
        <></>
      )}
    </Head>
  )
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
  } else if (props && type === 'articleExpanded' && props?.title) {
    /* for url if author url available add field , for now  url:"www.carestack.com" */
     const metaData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
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
  } else if (props && type === 'podcast') { debugger
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      performer:props?.author?.map((e)=>e?.name)[0],
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
      '@type': 'Article',
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
