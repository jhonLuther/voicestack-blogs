import React, { useId } from 'react'
import { breadCrumbJsonLd, generateJSONLD } from './generateJSONLD'
import Head from 'next/head'
import { urlForImage } from '~/lib/sanity.image'
import { getIframeUrl } from '~/components/commonSections/VideoModal'
import { slugToCapitalized } from './common'
import ogMetaData from '../../public/ogData.json'
import organizationSchema from '../../public/organizationSchema.json'
import siteConfig from 'config/siteConfig'

const head = (data: any, i: string, id: string = '') => {
  return (
    <Head key={i}>
      <script
        id={id + i}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      ></script>
    </Head>
  )
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

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
    'organizationSchema',
  )
}

export const siteLinkSchema = () => {
  return head(
    siteLink,
    Math.log10(Math.random()).toString() + 'randomId1',
    'siteLinkSchema',
  )
}

const canonicalTag = (type: string) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  if (type == 'article') {
    return (
      <>
        <link rel="canonical" href={`${url}/${siteConfig.pageURLs.article}`} id="canonical" />
        <link rel="alternate" href={`${url}/${siteConfig.pageURLs.article}`} hrefLang="en-us" />
        <link rel="alternate" href={`${url}/en-GB/${siteConfig.pageURLs.article}`} hrefLang="en-gb" />
        <link rel="alternate" href={`${url}/en-AU/${siteConfig.pageURLs.article}`} hrefLang="en-au" />
        <link rel="alternate" hrefLang="x-default" href={`${url}/${siteConfig.pageURLs.article}`} />
      </>
    )
  } else if (type == 'ebook') {
    return (
      <>
        <link rel="canonical" href={`${url}/${siteConfig.pageURLs.ebook}`} key="canonical" />
        <link rel="alternate" href={`${url}/${siteConfig.pageURLs.ebook}`} hrefLang="en-us" />
        <link rel="alternate" href={`${url}/en-GB/${siteConfig.pageURLs.ebook}`} hrefLang="en-gb" />
        <link rel="alternate" href={`${url}/en-AU/${siteConfig.pageURLs.ebook}`} hrefLang="en-au" />
        <link rel="alternate" hrefLang="x-default" href={`${url}/${siteConfig.pageURLs.ebook}`} />
      </>
    )
  } else if (type == 'podcast') {
    return (
      <>
        <link rel="canonical" href={`${url}/${siteConfig.pageURLs.podcast}`} key="canonical" />
        <link rel="alternate" href={`${url}/${siteConfig.pageURLs.podcast}`} hrefLang="en-us" />
        <link rel="alternate" href={`${url}/en-GB/${siteConfig.pageURLs.podcast}`} hrefLang="en-gb" />
        <link rel="alternate" href={`${url}/en-AU/${siteConfig.pageURLs.podcast}`} hrefLang="en-au" />
        <link rel="alternate" hrefLang="x-default" href={`${url}/${siteConfig.pageURLs.podcast}`} />
      </>
    )
  } else if (type == 'caseStudy') {
    return (
      <>
     <link rel="canonical" href={`${url}/${siteConfig.pageURLs.caseStudy}`} key="canonical" />
        <link rel="alternate" href={`${url}/${siteConfig.pageURLs.caseStudy}`} hrefLang="en-us" />
        <link rel="alternate" href={`${url}/en-GB/${siteConfig.pageURLs.caseStudy}`} hrefLang="en-gb" />
        <link rel="alternate" href={`${url}/en-AU/${siteConfig.pageURLs.caseStudy}`} hrefLang="en-au" />
        <link rel="alternate" hrefLang="x-default" href={`${url}/${siteConfig.pageURLs.caseStudy}`} />
      </>
    )
  } else if (type == 'pressRelease') {
    return (
      <>
        {/* <link
          rel="alternate"
          href={`${url}/press-release`}
          hrefLang="x-default"
        /> */}
        <link rel="canonical" href={`${url}/${siteConfig.pageURLs.pressRelease}`} key="canonical" />
        <link rel="alternate" href={`${url}/${siteConfig.pageURLs.pressRelease}`} hrefLang="en-us" />
        <link rel="alternate" href={`${url}/en-GB/${siteConfig.pageURLs.pressRelease}`} hrefLang="en-gb" />
        <link rel="alternate" href={`${url}/en-AU/${siteConfig.pageURLs.pressRelease}`} hrefLang="en-au" />
        <link rel="alternate" hrefLang="x-default" href={`${url}/${siteConfig.pageURLs.pressRelease}`} />
      </>
    )
  } else if (type == 'webinar') {
    return (
      <>
        {/* <link rel="alternate" href={`${url}/webinar`} hrefLang="x-default" />
        <link rel="alternate" href={`${url}/webinar`} hrefLang="en-US" /> */}
        <link rel="canonical" href={`${url}/${siteConfig.pageURLs.webinar}`} key="canonical" />
        <link rel="alternate" href={`${url}/${siteConfig.pageURLs.webinar}`} hrefLang="en-us" />
        <link rel="alternate" href={`${url}/en-GB/${siteConfig.pageURLs.webinar}`} hrefLang="en-gb" />
        <link rel="alternate" href={`${url}/en-AU/${siteConfig.pageURLs.webinar}`} hrefLang="en-au" />
        <link rel="alternate" hrefLang="x-default" href={`${url}/${siteConfig.pageURLs.webinar}`} />
      </>
    )
  }
}

/******* custom meta tag  to show og image og url  which ha s no specific data ********** */
export const customMetaTag = (
  type: string,
  showCanonical: boolean = false,
  isPaginatedPage: string = ''
) => {
  if (type) {
    const metaData = ogMetaData[type];
    if (metaData) {
      return (
        <Head>
          {showCanonical && canonicalTag(type)}
          {isPaginatedPage && (
            <>
              <link rel="canonical" href={isPaginatedPage} />
              {/* <link
                rel="alternate"
                href={isPaginatedPage}
                hrefLang="x-default"
              />
              <link rel="alternate" href={isPaginatedPage} hrefLang="en-US" /> */}
            </>
          )}
          {Object.keys(metaData).map((key) =>
            key === 'title' ? (
              <React.Fragment key={key}>
                <title>{metaData[key]}</title>
              </React.Fragment>
            ) : (
              <meta property={key} content={metaData[key]} key={key} />
            ),
          )}
          {Object.keys(metaData).map((key) => (
            <meta property={key} content={metaData[key]} key={key} />
          ))}
        </Head>
      );
    }
  }
  return null;
};

export const defaultMetaTag = (params: any, pageUrl?: string) => {  
  return (
    <Head key={params?._id}>
      {pageUrl?.length && (
        <>
          <link rel="canonical" href={pageUrl}></link>
          <link rel="alternate" href={pageUrl} hrefLang="x-default" ></link>
          <link rel="alternate" href={pageUrl} hrefLang="en-US" ></link>
          <link rel="alternate" href={pageUrl + '/en-GB'} hrefLang="en-GB" ></link>
          <link rel="alternate" href={pageUrl + '/en-AU'} hrefLang="en-AU" ></link>
        </>
      )}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://resources.voicestack.com" />
      <meta property="twitter:url" content="https://resources.voicestack.com" />
      {params?.siteTitle ? (
        <>
          {/* <meta name="title" content={params.siteTitle?.trim()}></meta> */}
          <meta property="twitter:title" content={params.siteTitle?.trim()} />
          <title>{slugToCapitalized(params.siteTitle?.trim())}</title>
        </>
      ) : (
        <></>
      )}
      {params?.siteDescription ? (
        <>
          <meta name="description" content={params.siteDescription}></meta>
          <meta
            property="twitter:description"
            content={params.siteDescription}
          />
          <meta
            property="og:description"
            content={params.siteDescription}
          ></meta>
          <meta property="twitter:image" content={params.openGraphImage?.asset?._ref} />
        </>
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




export const metaTagDataForAuthor = (props: any, pageUrl: string) => {
  return (
    <Head>
      {props?.bio && (
        <>
          <meta property="og:description" content={props?.bio}></meta>
          <meta name="description" content={props?.bio}></meta>
          <meta property="twitter:description" content={props?.bio} />
        </>
      )}
      {pageUrl && (
        <>
          <link rel="canonical" href={pageUrl} key="canonical" />
          {/* <link rel="alternate" href={pageUrl} hrefLang="x-default" />
          <link rel="alternate" href={pageUrl} hrefLang="en-US" /> */}
          <meta property="twitter:url" content={pageUrl} />
        </>
      )}
      {props?.name && (
        <>
          <meta property="og:title" content={props.name}></meta>
          <title>{`${props.name} | Author Profile | CareStack®`}</title>
          <meta property="twitter:title" content={props?.name} />
        </>
      )}
      {props?.picture && (
        <>
          {' '}
          <meta
            property="og:image"
            content={urlForImage(props?.picture?._id)}
          ></meta>
          <meta
            property="twitter:image"
            content={urlForImage(props?.picture?._id)}
          />
        </>
      )}
      <meta property="twitter:card" content="summary_large_image" />
    </Head>
  )
}

const getLocaleLinks = (url: string, lang: string) => (
  <>
    <link rel="canonical" href={url} />
    <link rel="alternate" href={url} hrefLang="x-default" />
    <link rel="alternate" href={url} hrefLang={lang} />
  </>
);

export const generateMetaData = (params: any, canonicalLink?: string) => {
  if (!params || !canonicalLink) return null;

  const locales = ["en-gb", "en-au", "en"];

  return (
    <Head>
      {/* Canonical Link */}
      <link rel="canonical" href={canonicalLink} />

      {locales.map((lang) => {
        if(lang === 'en'){
          return <link key={lang} rel="alternate" href={canonicalLink} hrefLang={'en-us'} />;
        } 
  
        else{
        }
        const url = canonicalLink.replace("carestack.com/", `carestack.com/${lang}/`);
        return <link key={lang} rel="alternate" href={url} hrefLang={lang} />;

      })}
      
      <link rel="alternate" href={canonicalLink} hrefLang="x-default" />

      <meta property="twitter:url" content={canonicalLink} />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />

      {params?.mainImage && (
        <>
          <meta property="og:image" content={urlForImage(params.mainImage._id)} />
          <meta property="twitter:image" content={urlForImage(params.mainImage._id)} />
        </>
      )}

      {params?.title && (
        <>
          <meta property="og:title" content={params.title} />
          <meta property="twitter:title" content={params.title} />
          <title>{params.title}</title>
        </>
      )}

      {params?.excerpt && (
        <>
          <meta property="twitter:description" content={params.excerpt} />
          <meta property="og:description" content={params.excerpt} />
        </>
      )}
    </Head>
  );
};
export function CustomHead({
  props,
  type = null,
  pageNumber = null,
  paginationType = '',
}: any) {
  const randomId = useId() + Math.log(Math.random())
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const head = (data: any, i: string, id: string = '') => {
    return (
      <Head key={i}>
        <script
          id={id + randomId}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        ></script>
      </Head>
    )
  }

  const videoObjectJson =(props:any)=>{ 
    const metadata ={
      "@context": "http://schema.org",
      "@type": "VideoObject",
      "name": props?.title,
      "description": props?.excerpt,
      "thumbnailUrl": urlForImage(props?.mainImage?._id),
      "uploadDate": props?.date + "T00:00:00Z",
      "duration": props?.duration,
      // "embedUrl": props?.videos?.map((video:any) => {
      //   return getIframeUrl(video?.platform, video?.videoId)
      // }),
      "contentUrl": props?.videos?.map((video:any) => {
        return getIframeUrl(video?.platform, video?.videoId)
      }),
  
    }
    return metadata
    
  }

  const breadCrumbJson = (data: any) => {
    const metadata = breadCrumbJsonLd(data)
    return (
      <Head>
        <script
          id={'breadcrumb' + randomId}
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
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/case-study/${props?.slug?.current}`,
        isPartOf: {
          '@id': baseUrl,
        },
      },
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
      dateCreated: props?.date,
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
    return head(metaData, randomId, type + randomId)
  } else if (props && type === 'articleExpanded' && props?.title) {
    const url = baseUrl ?? 'www.resources.voicestack.com'
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      wordcount: props?.estimatedWordCount,
      timeRequired: props?.estimatedReadingTime || props?.duration,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/article/${props?.slug?.current}`,
        isPartOf: {
          '@id': baseUrl,
        },
      },
      headline: props?.title ?? '',
      image: [urlForImage(props?.mainImage?._id)],
      author: [
        props?.author?.map((e) => {
          return {
            '@type': 'Person',
            name: e.name,
            url: `${url}/author/${e.slug?.current}`,
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
    return head(metaData, randomId, type + randomId)
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
    return head(metaData, randomId, type + randomId)
  } else if (props && type === 'webinar') {
    
    const metaData = [{
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: props.title,
      description: props.excerpt,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      startDate: props?.date,
      endDate: props?.date,

      url: props?.videos?.map((video) => {
        return getIframeUrl(video?.platform, video?.videoId)
      }),
      image: urlForImage(props.mainImage?._id),
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
     
    },
    videoObjectJson(props)
  ]
 
    return head(metaData, randomId, type + randomId)
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
        url: 'https://resources.voicestack.com',
      },
      itemListElement: [
        {
          '@type': 'ListItem',
          position: pageNumber ?? 1,
          url:
            props && props[0]
              ? `www.resources.voicestack.com/${props[0]?.contentType}/page/${pageNumber}`
              : 'www.resources.voicestack.com',
        },
      ],
      numberOfItems: 3,
      name: paginationType,
    }
    return head(metaData, randomId, type + randomId)
  } else if (props && type === 'podcast') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      performer: props?.author?.map((e) => e?.name)[0],
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
    return head(metaData, randomId, type + randomId)
  } else if (props && type === 'pressRelease') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://resources.voicestack.com/press-release',
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
    return head(metaData, randomId, type + randomId)
  } else if (props && type == 'author') {
    const metaData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      image: urlForImage(props?.picture?._id) || '',
      jobTitle: props?.role || '',
      name: props?.name || '',
      url: process.env.NEXT_PUBLIC_BASE_URL,

      description: props?.bio || '',
    }
    return head(metaData, randomId, type + randomId)
  }
}
