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
    
    "latestBlogs": *[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
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

export async function getPostsBySlug(
  client: SanityClient,
  slug: any,
): Promise<Post[]> {
  let newPostsQuery = postsQuery

  if (slug.length > 0) {
    // *[_type == "post" && defined(slug.current) && references("${slug}")]  | order(_createdAt desc) {
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
  *[_type == "testiMonial" && slug.current == $slug][0] {
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

export async function getTag(client: SanityClient, slug: string): Promise<any> {
  return await client.fetch(tagBySlugQuery, {
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
