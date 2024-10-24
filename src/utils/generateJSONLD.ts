import { Post } from '~/interfaces/post'
import { fetchAuthor } from './common'
import { urlForImage } from '~/lib/sanity.image'

export function generateJSONLD(post: any) {
  // console.log({generatedPost:post});

  const {
    author = null,
    estimatedReadingTime = null,
    estimatedWordCount = null,
    excerpt = null,
    numberOfCharacters = null,
  } = post || {}

  const contentType = post?.contentType
  // console.log(contentType,'contentType');

  // console.log(author,'author in json');

  if (contentType) {
    switch (contentType) {
      case 'blog':
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://carestack.com${post.slug}`,
            isPartOf: {
              '@id': 'https://carestack.com/#website',
            },
          },
          headline: post.title,
          description: excerpt,
          image:
            'https://a.storyblok.com/f/144863/1201x1201/a1d1cbd61c/carestack-favicon-1200x1200.png',
          author: {
            '@type': 'Person',
            name: (author && author[0]?.name) || 'Unknown Author',
            url: 'https://carestack.com/company/leadership-team',
          },
          wordCount: estimatedWordCount ?? 0,
          dateCreated: post._createdAt,
          inLanguage: 'en-US',
          copyrightYear: post._createdAt.split(' ')[2],
          copyrightHolder: {
            '@id': 'https://carestack.com/#organization',
          },
          publisher: {
            '@type': 'Organization',
            name: 'CareStack',
            url: 'https://carestack.com',
            logo: {
              '@type': 'ImageObject',
              inLanguage: 'en-US',
              url: 'https://a.storyblok.com/f/144863/1201x1201/a1d1cbd61c/carestack-favicon-1200x1200.png',
              width: 1200,
              height: 1200,
            },
          },
        })
      case 'ebook':
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Book',
          name: post.title,
          author: {
            '@type': 'Person',
            name: (author && author[0]?.name) || 'Unknown Author',
          },
          datePublished: post._createdAt,
          numberOfPages: post.ebookFields?.ebookPages || 0,
          description: post.excerpt,
        })
      case 'article':
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          author: {
            '@type': 'Person',
            name: (author && author[0]?.name) || 'Unknown Author',
          },
          datePublished: post._createdAt,
          description: post.excerpt,
        })
      case 'webinar':
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: post.title,
          startDate: post._createdAt,
          description: post.excerpt,
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
        })
      case 'case-study':
        return JSON.stringify({
          '@type': 'NewsArticle',
          '@context': 'https://schema.org',
          headline: post.excerpt || '',
          image: urlForImage(post?.mainImage).width(10).height(10).url(),
          author: [
            {
              '@type': 'Person',
              // name: 'Patrick Coombe',
            },
          ],
          startDate: new Date(),
          description: post.author[0]?.bio || '',
          creator: 'CareStack',
          inLanguage: ['en_us', 'en-GB'],
          sameAs: 'https://carestack.com/',
        })
      case 'podcast':
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'PodcastEpisode',
          name: post.title,
          description: post.excerpt,
          datePublished: post._createdAt,
          author: {
            '@type': 'Person',
            name: (author && author[0]?.name) || 'Unknown Author',
          },
        })
      default:
        return '{}'
    }
  }

  // Default BlogPosting schema
  const defaultJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://carestack.com${post.slug}`,
      isPartOf: {
        '@id': 'https://carestack.com/#website',
      },
    },
    headline: post.title,
    description: excerpt,
    image:
      'https://a.storyblok.com/f/144863/1201x1201/a1d1cbd61c/carestack-favicon-1200x1200.png',
    author: {
      '@type': 'Person',
      name: (author && author[0]?.name) || 'Unknown Author',
      url: 'https://carestack.com/company/leadership-team',
    },
    wordCount: estimatedWordCount ?? 0,
    dateCreated: post._createdAt,
    inLanguage: 'en-US',
    copyrightYear: post._createdAt?.split(' ')[2],
    copyrightHolder: {
      '@id': 'https://carestack.com/#organization',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CareStack',
      url: 'https://carestack.com',
      logo: {
        '@type': 'ImageObject',
        inLanguage: 'en-US',
        url: 'https://a.storyblok.com/f/144863/1201x1201/a1d1cbd61c/carestack-favicon-1200x1200.png',
        width: 1200,
        height: 1200,
      },
    },
  }

  let customJSONLD = {}
  try {
    customJSONLD = JSON.parse(post.seoJSONLD || '{}')
  } catch (error) {
    console.error('Error parsing custom JSON-LD:', error)
  }

  return JSON.stringify({ ...defaultJSONLD, ...customJSONLD })
}

export function indexPageJsonLd(params: any) {
  return JSON.stringify({
    maintainer: 'CareSTack',
    publisher: 'CareSTack',
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      params?.posts?.map((e: any) => {
        return [e.title]
      }) || [],
    text:
      params?.latestPosts?.map((e: any) => {
        return [e.title]
      }) || [],
    copyrightHolder: {
      '@id': 'https://carestack.com/#organization',
    },
    name: params.title,
    startDate: params._createdAt,
    description: params.excerpt,
  })
}

export function breadCrumbJsonLd(
  breadCrumbList: { breadcrumb: string; url?: string }[],
) {
  const baseUrl = `https://carestack.com`

  const itemListElement = breadCrumbList.map((item: any) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': `${baseUrl}/${item?.href}`,
            "name": item?.label ?? "",
          },
        },
      ],
    }
  })
  return itemListElement
}

