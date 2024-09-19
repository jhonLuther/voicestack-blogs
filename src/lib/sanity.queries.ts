import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'
import { Post } from '~/interfaces/post'

export const postsQuery = groq`
*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
 ...,
  seoTitle,
  seoDescription,
  seoRobots,
  seoKeywords,
  seoCanonical,
  seoJSONLD,

  "author": author-> {
    _id,
    name,
    role,
    bio,
    "picture": picture.asset->url
  },

    tags[]->{
      _id,
      tagName
    },
}
`

export const iframesQuery = groq`*[_type == "iframes" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}
export async function getIframes(client: SanityClient): Promise<Post[]> {
  return await client.fetch(iframesQuery)
}

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ...,
    dynamicComponents
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

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`
export const iframeSlugsQuery = groq`
*[_type == "iframes" && defined(slug.current)][].slug.current
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
