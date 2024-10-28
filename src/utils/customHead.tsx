import React, { useId } from 'react'
import { breadCrumbJsonLd, generateJSONLD } from './generateJSONLD'
import Head from 'next/head'
import { urlForImage } from '~/lib/sanity.image'
import { getIframeUrl } from '~/components/commonSections/VideoModal'

export default function CustomHead({
  props,
  type = null,
  pageNumber = null,
  paginationType ="",
}: any) {
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
    return props?.map((e, i) => {
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
  } 
   else if (props && type === 'eBook') {
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
      name: props?.map((e)=>{return(e?.name)}),
      description:props?.map((e:any)=>{return(e?.excerpt)}),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      startDate: '2024-11-10T14:00:00+00:00',
      endDate: '2024-11-10T15:30:00+00:00',
      image: props?.map((e:any)=>{return(urlForImage(e.mainImage)?.width(300)?.height(300).url())}),
      organizer: {
        '@type': 'Organization',
        name: 'CareStack',
        url: 'https://carestack.com',
      },
      performer: {
        '@type': 'Person',
        name:props?.map((e:any)=>{
          return(e?.name)
        })
      },
      offers: {
        '@type': 'Offer',
        // url: props?.map((e:any)=>{return(getIframeUrl(e?.video?.platform, e?.video?.videoId))}),
        availability: 'https://schema.org/InStock',
      },
    }
    return head(metaData, randomId)
  } else if (props && type === 'breadCrumbs') {
    return breadCrumbJson(props)
    
  } else if ( props && type === 'pagination') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      author: {
        '@type': 'Person',
        description: props?.map((ele) => {
          return ele.excerpt
        }),
        name: props?.map((ele) => {
          return ele?.author?.map((a)=>a.name)
        }),
        url: 'https://carestack.com',
      },
      itemListElement: [
        {
          '@type': 'ListItem',
          position: pageNumber ?? 1,
          url:  props && props[0] ? `www.carestack.com/${props[0]?.contentType}/page/${pageNumber}`: "www.carestack.com"
        },
      ],
      numberOfItems: 3,
      name: paginationType,
    }
    return head(metaData, randomId)
  } else if(props && type =="podcast"){
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: props.map((e: any) => {
        return e?.title
      }),
      description: props?.map((e: any) => {
        return e?.excerpt
      }),
      startDate: new Date(),
      endDate: new Date(),
      image: props?.map((el: any) => {
        return el?.author?.map((e: any) => {
          return e?.picture
        })
      }),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: {
        '@type': 'VirtualLocation',
        url: 'https://example.com/podcast-episode',
      },
      performer: {
        '@type': 'Person',
        name: props?.map((el: any) => {
          return el?.author?.map((e: any) => {
            return e?.name
          })
        }),
      },
      organizer: {
        '@type': 'Organization',
        name: props?.title,
        url: 'https://example.com',

      },
      subEvent: {
        '@type': 'PodcastEpisode',
        name: 'Episode 12: The Future of AI',
        description: props?.map((e: any) => {
          return e?.excerpt
        }),
        url: 'https://carestack.com',
        episodeNumber: 1,
        partOfSeries: {
          '@type': 'PodcastSeries',
          name: 'Dentistry revolution talks ',
        },
        duration: props?.map((e: any) => {
          return e?.duration
        }),
      },
    }
    return head(metaData,randomId);
    
  }
}

