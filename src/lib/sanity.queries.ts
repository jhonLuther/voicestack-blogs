import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'
import { Author, Post, Tag } from '~/interfaces/post'

export const postsQuery = groq`
*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
 ...,
 "excerpt":postFields.excerpt,
 contentType,
  seoTitle,
  seoDescription,
  seoRobots,
  seoKeywords,
  seoCanonical,
  seoJSONLD,
    author[]-> {
      _id,
      name,
      slug,
      role,
      bio,
      "picture": picture.asset->url
    },
}
`

export const iframesQuery = groq`*[_type == "iframes" && defined(slug.current)] | order(_createdAt desc)`

export const authorsQuery = groq`*[_type == "author" && defined(slug.current)] | order(_createdAt desc)`

export const tagsQuery = groq`*[_type == "tag" && defined(slug.current)] | order(_createdAt desc)`

// combined query testimonials with associated customer names
export const testiMonialsQuery = groq`
  *[_type == "testimonial" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    testimonialName,
    slug,
  "customer": customer-> {
    _id,
    name,
    role,
    slug,
    "picture": picture.asset->url
  },
    excerpt,
    layoutSwitcher,
    hasVideo,
    videoId,
    image,
    rating,
    date
  }
`

export const homeSettingsQuery = groq`
  *[_type == "homeSettings"] | order(_createdAt desc) {
    _id,
    _createdAt,
    "latestBlogs": *[_type == "post" && contentType == "article" && defined(slug.current)] | order(_createdAt desc) {
       id,
      "desc": postFields.excerpt,
      title,
      mainImage,
      slug,
      author[]-> {
      _id,
      name,
      slug,
      role,
      bio,
      "picture": picture.asset->url
    },
      tags[]->{
        _id,
        tagName,
        slug
      }
    }[0...4],
    "testimonials": testimonials[]-> {
      _id,
      testimonialName,
      slug,
      "customer": customer-> {
        _id,
        name,
        role,
        slug,
        "picture": picture.asset->url
      },
      excerpt,
      layoutSwitcher,
      hasVideo,
      videoId,
      image,
      rating,
      date
    },

    popularBlogs[]->{
      ...
    },

    FeaturedContents[]->{
      ...
    },

    FeaturedBlog->{
      title,
      mainImage,
      blogColor,
      excerpt,
      slug,
      "desc": postFields.excerpt,
      tags[]->{
        _id,
        tagName,
        slug
      },
    author[]-> {
      _id,
      name,
      slug,
      role,
      bio,
      "picture": picture.asset->url
    },
    }
  }
`

export async function getPosts(
  client: SanityClient,
  limit?: number,
): Promise<Post[]> {
  let newPostsQuery = postsQuery
  if (limit > 0) {
    newPostsQuery = postsQuery + `[0...${limit}]`
  }
  return await client.fetch(newPostsQuery)
}
export async function getIframes(client: SanityClient): Promise<Post[]> {
  return await client.fetch(iframesQuery)
}
export async function getAuthors(client: SanityClient): Promise<Author[]> {
  return await client.fetch(authorsQuery)
}
export async function getTags(client: SanityClient): Promise<Tag[]> {
  return await client.fetch(tagsQuery)
}

export async function getTestiMonials(client: SanityClient): Promise<Post[]> {
  return await client.fetch(testiMonialsQuery)
}

export async function getPodcasts(
  client: SanityClient,
  limit?: number,
): Promise<Post[]> {
  let newPodCastQuery = podcastsQuery
  if (limit > 0) {
    newPodCastQuery = podcastsQuery + `[0...${limit}]`
  }
  return await client.fetch(newPodCastQuery)
}
export async function getCaseStudies(
  client: SanityClient,
  limit?: number,
): Promise<Post[]> {
  let newCaseStudyQuery = caseStudiesQuery
  if (limit > 0) {
    newCaseStudyQuery = caseStudiesQuery + `[0...${limit}]`
  }
  return await client.fetch(newCaseStudyQuery)
}

export async function getPostsBySlug(
  client: SanityClient,
  slug: any,
): Promise<Post[]> {
  let newPostsQuery = postsQuery

  if (slug.length > 0) {
    newPostsQuery = groq`
      *[_type == "post" && defined(slug.current) && "${slug}" in tags[]->slug.current]  | order(_createdAt desc) {
      "desc":postFields.excerpt,
      title,
      "mainImage":mainImage.asset->url,
      "slug":slug.current,
      author[]-> {
        _id,
        name,
        slug,
        role,
        bio,
        "picture": picture.asset->url
      },
        tags[]->{
        _id,
        tagName,
        slug 
        }
      }
      `
  }
  return await client.fetch(newPostsQuery)
}

export const podcastsQuery = groq`
*[_type == "post" && contentType == "podcast" && defined(slug.current)] |  order(_updatedAt desc){
  _id,
  title,
  slug,
  contentType,
  "audioFile": Video.link,
  "platform": Video.platform,
  duration,
  publishedAt,
  excerpt,
  mainImage,
  body,
  "author": author[]-> {
    _id,
    name,
    slug,
    bio,
    "picture": picture.asset->url,
    "associatedPodcasts": *[_type == "post" && contentType == "podcast" && references(^._id) && _id != ^._id] {
      _id,
      title,
      slug,
      "audioFile": Video.link,
      "platform": Video.platform,
      duration,
      publishedAt,
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        }
      }
    }
  },
  tags[]-> {
    _id,
    tagName,
    slug
  }
}
`
export const caseStudiesQuery = groq`
*[_type == "post" && contentType == "case-study" && defined(slug.current)] |  order(_updatedAt desc){
  _id,
  title,
  slug,
  contentType,
  "audioFile": Video.link,
  "platform": Video.platform,
  duration,
  publishedAt,
  excerpt,
  mainImage,
  body,
  "author": author[]-> {
    _id,
    name,
    slug,
    bio,
    "picture": picture.asset->url,
  },
  tags[]-> {
    _id,
    tagName,
    slug
  }
}
`

export const authorRelatedContentQuery = groq`
  *[_type == "post" && $authorId in author[]->_id] {
    _id,
    title,
    slug,
    contentType,
    duration,
    publishedAt,
    excerpt,
    mainImage,
    body,
  }
`

export async function getHomeSettings(client: SanityClient): Promise<Post[]> {
  return await client.fetch(homeSettingsQuery)
}

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    excerpt,
    contentType,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
      "numberOfCharacters": length(pt::text(body)),
      "estimatedWordCount": round(length(pt::text(body)) / 5),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    mainImage,
    _createdAt,
    seoTitle,
    seoDescription,
    seoKeywords,
    seoCanonical,
    seoRobots,
    dynamicComponents[] {
      _key,
      componentType,
    },
    author[]-> {
      _id,
      name,
      slug,
      role,
      bio,
      "picture": picture.asset->url
    },
    tags[]-> {
      _id,
      tagName
    }
  }
`

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    role,
    slug,
    bio,
    "picture": picture.asset->url,
  }
`
export const testiMonialBySlugQuery = groq`
  *[_type == "testimonial" && slug.current == $slug][0] {
    _id,
    testimonialName,
    slug,
    customer,
    excerpt,
    layoutSwitcher,
    hasVideo,
    videoId,
    image,
    rating,
    date
  }
`
export const podcastBySlugQuery = groq`
  *[_type == "post" && contentType == "podcast" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    contentType,
    "audioFile": Video.link,
    "platform": Video.platform,
    "htmlCode": Video.htmlCode, 
    duration,
    publishedAt,
    excerpt,
    mainImage,
    body,
    "author": author[]-> {
      _id,
      name,
      slug,
      role,
      bio,
      "picture": picture.asset->url
    }
  }
`

export const relatedContentsQuery = groq`
  *[_type == "post" && slug.current != $currentSlug] 
  | order(_createdAt desc)
  [0...$limit] {  
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    body,
    "author": author[]-> {
      _id,
      name,
      slug,
      role,
      bio,
      "picture": picture.asset->url
    },
    tags[]-> {
      _id,
      tagName,
      slug
    }
  }
`

export const caseStudyBySlugQuery = groq`
  *[_type == "post" && contentType == "case-study" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    contentType,
    "audioFile": Video.link,
    "platform": Video.platform,
    duration,
    publishedAt,
    excerpt,
    mainImage,
    body,
    "author": author[]-> {
      _id,
      name,
      slug,
      bio,
      "picture": picture.asset->url,
    },
    tags[]-> {
      _id,
      tagName,
      slug
    },
    practiceName, 
    headCount,
    location,
    providers,
    growingLocations,
    "asideBookFreeDemoBanner": asideBookFreeDemoBanner[] {
      number,
      text
    }
  }
`

export const tagBySlugQuery = groq`
  *[_type == "tag" && slug.current == $slug][0] {
    _id,
    tagName,
    slug,
  }
`
export const iframeBySlugQuery = groq`*[_type == "iframes" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export async function getIframe(
  client: SanityClient,
  slug: string,
): Promise<Iframe> {
  return await client.fetch(iframeBySlugQuery, {
    slug,
  })
}
export async function getAuthor(
  client: SanityClient,
  slug: string,
): Promise<any> {
  return await client.fetch(authorBySlugQuery, {
    slug,
  })
}
export async function getRelatedContents(
  client: SanityClient,
  slug: string,
  limit: number,
): Promise<any> {
  return await client.fetch(relatedContentsQuery, {
    currentSlug: slug,
    limit: limit,
  })
}

export async function getauthorRelatedContents(
  client: SanityClient,
  authorId: string,
): Promise<any> {
  let relatedAuthors = authorRelatedContentQuery

  if (authorId.length > 0) {
    relatedAuthors = groq`
  *[_type == "post" && "${authorId}" in author[]->_id] {
    _id,
    title,
    slug,
    contentType,
    duration,
    publishedAt,
    excerpt,
    mainImage,
    body,
  }
      `
  }
  // return await client.fetch(authorRelatedContentQuery)

  return await client.fetch(authorRelatedContentQuery, {
    authorId,
  })
}

export async function getTag(client: SanityClient, slug: string): Promise<any> {
  return await client.fetch(tagBySlugQuery, {
    slug,
  })
}
export async function getCaseStudy(
  client: SanityClient,
  slug: string,
): Promise<any> {
  return await client.fetch(caseStudyBySlugQuery, {
    slug,
  })
}
export async function getTestimonial(
  client: SanityClient,
  slug: string,
): Promise<any> {
  return await client.fetch(testiMonialBySlugQuery, {
    slug,
  })
}

export async function getPodcast(
  client: SanityClient,
  slug: string,
): Promise<any> {
  return await client.fetch(podcastBySlugQuery, {
    slug,
  })
}
// queries for static path generation **
export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current

`
export const iframeSlugsQuery = groq`
*[_type == "iframes" && defined(slug.current)][].slug.current
`
export const authorSlugsQuery = groq`
  *[_type == "author" && defined(slug.current)][].slug.current
`
export const tagsSlugsQuery = groq`
  *[_type == "tag" && defined(slug.current)][].slug.current
`
export const testimonialSlugsQuery = groq`
  *[_type == "testimonial" && defined(slug.current)][].slug.current
`
export const podcastSlugsQuery = groq`
  *[_type == "post" && contentType == "podcast" && defined(slug.current)][].slug.current
`
export const caseStudySlugsQuery = groq`
  *[_type == "post" && contentType == "case-study" && defined(slug.current)][].slug.current
`

export interface Iframe {
  _type: 'iframes'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}
