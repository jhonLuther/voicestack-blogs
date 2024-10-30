import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'
import { Author, Post, Tag } from '~/interfaces/post'

// Common Body query  for $portableText  update the dynamic component query here
const bodyFragment = `
  body[] {
    ...,
      _type == "videoReference" => {
      ...,
      "video": @->{
      _id,
      title,
      platform,
      videoId,
    }
    },
    _type == "image" => {
      ...,
      asset->,
    },
    _type == "dynamicComponent" => {
      ...,
      testimonialCard {
        testimonial-> {
          testimonialName,
          excerpt,
          "customerDetails": customer->{
            name,
            slug,
            role,
            bio,
            "picture": picture.asset-> {
              _id,
              metadata {
                dimensions
              },
              altText,
              title
            },
          },
          image {
            asset->{
              url,
              metadata
            }
          },
          rating,
          date
        }
      },
      bannerBlock,
      asideBannerBlock,
    }
  }
`
//Table of contents
const tocFragment = `
   "headings": body[style in ["h2"]]{ 
      "children": children[]{
        "text": text,
        "marks": marks,
        "_type": _type,
        "_key": _key
      },
      "style": style,
      "_type": _type,
      "_key": _key
    }
`

const imageFragment = `
 "mainImage": mainImage.asset-> {
  _id,
  metadata {
    dimensions
  },
  altText,
  title
 },
 "customImage": customImage.asset-> {
  _id,
  metadata {
    dimensions
  },
  altText,
  title
 }
  `

export const postsQuery = groq`
*[_type == "post" && defined(slug.current) && defined(date)] | order(date desc) {
 ${imageFragment},
 title,
 slug,
 _id,
  excerpt,
  contentType,
  author[]-> {
      _id,
      name,
      slug,
      "picture": picture.asset->url
  },
  date,
  duration,
  ${bodyFragment},
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
  tags[]->{
    _id,
    tagName,
    slug
  },
}
`

export const iframesQuery = groq`*[_type == "iframes" && defined(slug.current)] | order(date desc)`

export const authorsQuery = groq`*[_type == "author" && defined(slug.current)] | order(date desc)`

export const tagsQuery = groq`*[_type == "tag"]`

// combined query testimonials with associated customer names
export const testiMonialsQuery = groq`
  *[_type == "testimonial" && defined(slug.current)] | order(date desc) {
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
    "videos": videos[]-> {  
      _id,
      title,
      platform,
      videoId,
    },
 ${imageFragment},
    rating,
    date
  }
`

export const homeSettingsQuery = groq`
  *[_type == "homeSettings"] | order(date desc) {
    _id,
    _createdAt,
    "latestBlogs": *[_type == "post" && contentType == "article" && defined(slug.current)] | order(date desc) {
       id,
      "desc": postFields.excerpt,
      title,
      contentType,
     ${imageFragment},
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
    "testimonial": testimonial[]-> {
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
      _id,
      slug,
      "desc": postFields.excerpt,
      title,
      contentType,
      date,
      duration,
     ${imageFragment},
     ${bodyFragment},
     "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
      author[]-> {
      _id,
      name,
    },
    },

    FeaturedContents[]->{
      _id,
      slug,
      contentType,
      "desc": postFields.excerpt,
      title,
      date,
      duration,
      ${imageFragment},
     ${bodyFragment},
     "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
      author[]-> {
      _id,
      name,
          },
    },
    customBrowseContent->{
      _id,
      slug,
      contentType,
      title,
      date,
      duration,
      ${imageFragment},
    },

    FeaturedBlog->{
      title,
      contentType,
     ${imageFragment},
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

const siteSettingsQuery = groq`*[_type == "siteSetting"] | order(date desc) {
...,

}`;

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
export async function getPostsByLimit(
  client: SanityClient,
  startLimit?: number,
  endLimit?: number,
  selectedTag?: string,
): Promise<Post[]> {
  let newPostsQuery = postsQuery + `[${startLimit}...${endLimit}]`;

  if (selectedTag) {
    newPostsQuery += ` && tags[]->slug.current == "${selectedTag}"`;
  }

  return await client.fetch(newPostsQuery);
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

export async function getPostsByTagAndLimit(
  client: SanityClient,
  tagId: string,
  start: number,
  end: number
) {
  return client.fetch(
    groq`*[_type == "post" && references($tagId)] | order(date desc) [$start...$end] {
      title,
      contentType,
      ${imageFragment},
      blogColor,
      excerpt,
      slug,
      duration,
      date,
      ${bodyFragment},
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    }`,
    { tagId, start, end }
  )
}

export async function getTestiMonials(
  client: SanityClient,
  skip: number = 0,
  limit?: number,
): Promise<Post[]> {
  let newTestiMonialsQuery = testiMonialsQuery;

  if (limit !== undefined) {
    newTestiMonialsQuery += `[${skip}...${skip + limit}]`;
  }

  return await client.fetch(newTestiMonialsQuery);
}

export async function getTestiMonialsCount(client: SanityClient): Promise<number> {
  const countQuery = groq`count(${testiMonialsQuery})`;
  return await client.fetch(countQuery);
}
export async function getPodcasts(
  client: SanityClient,
  skip: number = 0, 
  limit?: number,  
): Promise<Post[]> {
  let newPodCastQuery = podcastsQuery;
  if (limit !== undefined) {
    newPodCastQuery += `[${skip}...${skip + limit}]`;
  }
  return await client.fetch(newPodCastQuery);
}

export async function getPodcastsCount(client: SanityClient): Promise<number> {
  const countQuery = groq`count(${podcastsQuery})`;
  return await client.fetch(countQuery);
}
export async function getWebinars(
  client: SanityClient,
  skip: number = 0,
  limit?: number,
): Promise<Post[]> {
  let newWebinarQuery = webinarsQuery;

  if (limit !== undefined) {
    newWebinarQuery += `[${skip}...${skip + limit}]`;
  }

  return await client.fetch(newWebinarQuery);
}

export async function getWebinarsCount(client: SanityClient): Promise<number> {
  const countQuery = groq`count(${webinarsQuery})`;
  return await client.fetch(countQuery);
}
export async function getEbooks(
  client: SanityClient,
  skip: number = 0, 
  limit?: number,    
): Promise<Post[]> {
  let newEbooksQuery = ebooksQuery;

  if (limit !== undefined) {
    newEbooksQuery += `[${skip}...${skip + limit}]`;
  }

  return await client.fetch(newEbooksQuery);
}

export async function getEbooksCount(client: SanityClient): Promise<number> {
  const countQuery = groq`count(${ebooksQuery})`;
  return await client.fetch(countQuery);
}

export async function getArticles(
  client: SanityClient,
  skip: number = 0,
  limit?: number
): Promise<Post[]> {
  let query = artilclesQuery;
  
  if (skip > 0 || limit !== undefined) {
    query += `[${skip}..${limit ? skip + limit : ''}]`;
  }
  
  return await client.fetch(query);
}

export async function getArticlesCount(client: SanityClient): Promise<number> {
  const countQuery = groq`count(${artilclesQuery})`;
  return await client.fetch(countQuery);
}
export async function getCaseStudies(
  client: SanityClient,
  skip: number = 0,
  limit?: number,
): Promise<Post[]> {
  let newCaseStudyQuery = caseStudiesQuery; 

  if (skip > 0 || limit !== undefined) {
    newCaseStudyQuery += `[${skip}...${limit !== undefined ? skip + limit : ''}]`;
  }

  return await client.fetch(newCaseStudyQuery);
}
export async function getCaseStudiesCount(client: SanityClient): Promise<number> {
  const countQuery = groq`count(${caseStudiesQuery})`;
  return await client.fetch(countQuery);
}
export async function getPressReleases(
  client: SanityClient,
  skip: number = 0,
  limit?: number,
): Promise<Post[]> {
  let newPressReleaseQuery = pressReleasesQuery;
  if (limit !== undefined) {
    newPressReleaseQuery += `[${skip}...${skip + limit}]`;
  }
  return await client.fetch(newPressReleaseQuery);
}

export async function getPressReleasesCount(client: SanityClient): Promise<number> {
  const countQuery = groq`count(${pressReleasesQuery})`;
  return await client.fetch(countQuery);
}

export async function getPostsBySlug(
  client: SanityClient,
  slug: any,
): Promise<Post[]> {
  let newPostsQuery = postsQuery

  if (slug.length > 0) {
    newPostsQuery = groq`
      *[_type == "post" && defined(slug.current) && "${slug}" in tags[]->slug.current]  | order(date desc) {
      "desc":postFields.excerpt,
      title,
      date,
      ${imageFragment},
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
*[_type == "post" && contentType == "podcast" && defined(slug.current) && defined(date)] |  order(date desc){
  _id,
  title,
  slug,
  duration,
  publishedAt,
  contentType,
  ${imageFragment},
  excerpt,
  "author": author[]-> {
    _id,
    name,
    role,
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
export const webinarsQuery = groq`
*[_type == "post" && contentType == "webinar" && defined(slug.current) && defined(date)] |  order(date desc){
  _id,
  title,
  slug,
  contentType,
  "audioFile": Video.link,
  "platform": Video.platform,
  duration,
  publishedAt,
  excerpt,
  date,
 ${imageFragment},
  ${bodyFragment},
  "author": author[]-> {
    _id,
    name,
    role,
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
export const ebooksQuery = groq`
*[_type == "post" && contentType == "ebook" && defined(slug.current) && defined(date)] |  order(date desc){
  _id,
  title,
  slug,
  contentType,
  duration,
  publishedAt,
  excerpt,
  date,
 ${imageFragment},
  ${bodyFragment},
   "numberOfCharacters": length(pt::text(body)),
   "estimatedWordCount": round(length(pt::text(body)) / 5),
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
  "author": author[]-> {
    _id,
    name,
    role,
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
export const pressReleasesQuery = groq`
*[_type == "post" && contentType == "press-release" && defined(slug.current) && defined(date)] |  order(date desc){
  _id,
  title,
  slug,
  contentType,
  "audioFile": Video.link,
  "platform": Video.platform,
  duration,
  publishedAt,
  date,
  excerpt,
 ${imageFragment},
  ${bodyFragment},
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
   "numberOfCharacters": length(pt::text(body)),
  "estimatedWordCount": round(length(pt::text(body)) / 5),
  "author": author[]-> {
    _id,
    name,
    role,
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
export const artilclesQuery = groq`
*[_type == "post" && contentType == "article" && defined(slug.current) && defined(date)] |  order(date desc){
  _id,
  title,
  slug,
  contentType,
  "audioFile": Video.link,
  "platform": Video.platform,
  duration,
  publishedAt,
  excerpt,
  date,
  ${imageFragment},
  ${bodyFragment},
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
  "author": author[]-> {
    _id,
    name,
    role,
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

export const caseStudiesQuery = groq`
*[_type == "post" && contentType == "case-study" && defined(slug.current) && defined(date)] |  order(date desc){
  _id,
  title,
  slug,
  contentType,
  "audioFile": Video.link,
  "platform": Video.platform,
  duration,
  publishedAt,
  excerpt,
  date,
  duration,
 ${imageFragment},
  ${bodyFragment},
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
  "author": author[]-> {
    _id,
    name,
    role,
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
    date,
   ${imageFragment},
    ${bodyFragment},
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
  }
`

export async function getHomeSettings(client: SanityClient): Promise<Post[]> {
  return await client.fetch(homeSettingsQuery)
}

export async function getSiteSettings(client: SanityClient): Promise<any> {
  return await client.fetch(siteSettingsQuery);
}

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    excerpt,
    contentType,
    "region": region,
    "date": date,
   ${bodyFragment},
   ${tocFragment},
    "numberOfCharacters": length(pt::text(body)),
    "estimatedWordCount": round(length(pt::text(body)) / 5),
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
   ${imageFragment},
    _createdAt,
    seoTitle,
    seoDescription,
    seoKeywords,
    seoCanonical,
    seoRobots,
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
   ${imageFragment},
    rating,
    "region": region,
    "date": date,
    ${bodyFragment},
    ${tocFragment},
    "numberOfCharacters": length(pt::text(body)),
    "estimatedWordCount": round(length(pt::text(body)) / 5),
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    "videos": videos[]-> {
      _id,
      title,
      platform,
      videoId,
    },
    date,
    "tags": tags[]-> {
    _id,
    tagName
   },
  }
`
export const podcastBySlugQuery = groq`
*[_type == "post" && contentType == "podcast" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  contentType,
  htmlCode, 
  duration,
  publishedAt,
  excerpt,
 ${imageFragment},
  "region": region,
  "date": date,
  ${bodyFragment},
  ${tocFragment},
  "author": author[]-> {
    _id,
    name,
    slug,
    role,
    bio,
    "picture": picture.asset->url
  },
  "tags": tags[]-> {
    _id,
    tagName
  }
}
`
export const ebookBySlugQuery = groq`
  *[_type == "post" && contentType == "ebook" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    contentType,
    duration,
    publishedAt,
    excerpt,
   ${imageFragment},
   ${bodyFragment},
    "region": region,
    "date": date,
    "numberOfCharacters": length(pt::text(body)),
    "estimatedWordCount": round(length(pt::text(body)) / 5),
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    attachment{
      asset->{
        url
      }
    },
    ${tocFragment},
    "author": author[]-> {
      _id,
      name,
      slug,
      role,
      bio,
      "picture": picture.asset->url
    },
    "tags": tags[]-> {
    _id,
    tagName,
    slug
  },
  }
`
export const webinarBySlugQuery = groq`
  *[_type == "post" && contentType == "webinar" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    contentType,
    "videos": videos[]-> {
      _id,
      title,
      platform,
      videoId,
    },
    duration,
    publishedAt,
    excerpt,
   ${imageFragment},
    "region": region,
    "date": date,
    "numberOfCharacters": length(pt::text(body)),
    "estimatedWordCount": round(length(pt::text(body)) / 5),
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    ${bodyFragment},
    ${tocFragment},
    "author": author[]-> {
      _id,
      name,
      slug,
      role,
      bio,
      "picture": picture.asset->url
    },
    "tags": tags[]-> {
    _id,
    tagName,
    slug
  },
  }
`
export const pressReleaseBySlugQuery = groq`
  *[_type == "post" && contentType == "press-release" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    contentType,
    "audioFile": Video.link,
    "platform": Video.platform,
    "htmlCode": Video.htmlCode, 
    "numberOfCharacters": length(pt::text(body)),
    "estimatedWordCount": round(length(pt::text(body)) / 5),
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    duration,
    publishedAt,
    excerpt,
    pressReleaseUrl,
   ${imageFragment},
    "region": region,
    "date": date,
    ${bodyFragment},
    ${tocFragment},
    "author": author[]-> {
      _id,
      name,
      slug,
      role,
      bio,
      "picture": picture.asset->url
    },
    "tags": tags[]-> {
    _id,
    tagName,
    slug
  },
  }
`
export const articleBySlugQuery = groq`
  *[_type == "post" && contentType == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    contentType,
    duration,
    publishedAt,
    excerpt,
   ${imageFragment},
    ${bodyFragment},
    ${tocFragment},
    "numberOfCharacters": length(pt::text(body)),
    "estimatedWordCount": round(length(pt::text(body)) / 5),
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    "region": region,
    "date": date,
    "author": author[]-> {
      _id,
      name,
      slug,
      role,
      bio,
      "picture": picture.asset->url
    },
    "tags": tags[]-> {
    _id,
    tagName,
    slug
  },
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
    date,
    ${imageFragment},
    "numberOfCharacters": length(pt::text(body)),
    "estimatedWordCount": round(length(pt::text(body)) / 5),
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    ${bodyFragment},
    ${tocFragment},
    "author": author[]-> {
      _id,
      name,
      role,
      slug,
      bio,
      "picture": picture.asset->url,
    },
    "tags": tags[]-> {
      _id,
      tagName
    },
    practiceName, 
    headCount,
    location,
    providers,
    growingLocations,
    facilities,
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
  const post = await client.fetch(postBySlugQuery, {
    slug,
  })

  if (post) {
    const tagIds = post.tags?.map((tag: any) => tag?._id) || []

    if (tagIds.length > 0) {
      const relatedPosts = await getRelatedPosts(client, slug, 'posts', tagIds)
      return { ...post, relatedPosts }
    }
    return { ...post, relatedPosts: [] }
  }
  return null
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
    date,
   ${imageFragment},
    ${bodyFragment},
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),

  }
      `
  }

  return await client.fetch(authorRelatedContentQuery, {
    authorId,
  })
}




export async function getTagRelatedContents(
  client: SanityClient,
  tagId: string,
  contentType: string = '',
  limit: number = 4,
): Promise<any> {
  if (!tagId) return [];

  const query = groq`
    *[_type == "post" && contentType == "${contentType}" && "${tagId}" in tags[]->_id] 
    | order(date desc)  [0...${limit}]  {
      _id,
      title,
      slug,
      contentType,
      duration,
      publishedAt,
      excerpt,
      date,
      ${imageFragment},
      ${bodyFragment},
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
      "tags": tags[]-> {
      _id,
      tagName
    },
      
    }
  `;

  return await client.fetch(query);
}


export async function getTag(client: SanityClient, slug: string): Promise<any> {
  return await client.fetch(tagBySlugQuery, {
    slug,
  })
}

export const getPostsByTag = (client:SanityClient, tagId) => {
  return client.fetch(groq`
    *[_type == "post" && references($tagId)] {
      title,
      slug,
      contentType,
     ${imageFragment},
      _createdAt
    }
  `, { tagId })
}
export async function getCaseStudy(
  client: SanityClient,
  slug: string,
): Promise<any> {
  const caseStudy = await client.fetch(caseStudyBySlugQuery, { slug })
  if(!caseStudy) {
    null
  }
  return caseStudy
}
export async function getTestimonial(
  client: SanityClient,
  slug: string,
): Promise<any> {
  const testimonial = await client.fetch(testiMonialBySlugQuery, { slug })
  if (testimonial) {
    const tagIds = testimonial.tags?.map((tag: any) => tag?._id) || []

    if (tagIds.length > 0) {
      const relatedTestimonials = await getRelatedTestimonials(
        client,
        slug,
        'testimonials',
        tagIds,
      )
      return { ...testimonial, relatedTestimonials }
    }
    return { ...testimonial, relatedTestimonials: [] }
  }
  return null
}

export const relatedContentsQuery = groq`
  *[_type == $type && slug.current != $currentSlug && 
    $tagIds in tags[]->_id] 
  | order(date desc) [0...$limit] {
    _id,
    title,
    slug,
    contentType,
    publishedAt,
    ${imageFragment},
    ${bodyFragment},
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    date,
    duration,
    excerpt,
    "tags": tags[]-> {
      _id,
      tagName,
      slug,
    }
  }
`

export const relatedTestimonialComponents = groq`
  *[_type == 'testimonial' && slug.current != $currentSlug && count(tags[]->_id[ _id in $tagIds ]) > 0] 
  | order(date desc) [0...$limit] {
    _id,
    title,
    slug,
    date,
    contentType,
    publishedAt,
    excerpt,
    "tags": tags[]-> {
      _id,
      tagName,
      slug,
    }
  }
`
export const relatedPostComponents = groq`
  *[_type == 'post' && slug.current != $currentSlug && count(tags[]->_id[ _id in $tagIds ]) > 0] 
  | order(date desc) [0...$limit] {
    _id,
    title,
    date
    slug,
    contentType,
    publishedAt,
    excerpt,
    "tags": tags[]-> {
      _id,
      tagName,
      slug,
    }
  }
`
// sitemap queries **
export const siteMapQuery = groq`*[_type == "post" && defined(slug.current)]{
  "url": slug.current,
  contentType,
  _updatedAt
} `

export const tagQuery = groq`*[_type == "tag" && defined(slug.current)]{
  "url": slug.current,
  "contentType": "browse",
  _updatedAt
} `

export const authorQuery = groq`*[_type == "author" && defined(slug.current)]{
  "url": slug.current,
  "contentType": "author",
  _updatedAt
} `

export const testiMonialQuery = groq`
*[_type == "testimonial" && defined(slug.current)]{
  "url": slug.current,
  "contentType": "testimonial",
  _updatedAt
}
`

export async function getRelatedContents(
  client: SanityClient,
  currentSlug: string = '',
  type: string = 'post', // default post will be fetched
  tagIds: string[] = [],
  limit: number = 4,
): Promise<any[]> {  
  return await client.fetch(relatedContentsQuery, {
    currentSlug,
    tagIds,
    type,
    limit,
  })
}
export async function getRelatedTestimonials(
  client: SanityClient,
  currentSlug: string = '',
  pageType: string = 'testimonials',
  tagIds: string[] = [],
  limit: number = 3,
): Promise<any[]> {
  return await client.fetch(relatedTestimonialComponents, {
    currentSlug,
    pageType,
    tagIds,
    limit,
  })
}
export async function getRelatedPosts(
  client: SanityClient,
  currentSlug: string = '',
  pageType: string = 'post',
  tagIds: string[] = [],
  limit: number = 3,
): Promise<any[]> {
  return await client.fetch(relatedPostComponents, {
    currentSlug,
    pageType,
    tagIds,
    limit,
  })
}
export async function getPodcast(
  client: SanityClient,
  slug: string,
): Promise<any> {
  const podcast = await client.fetch(podcastBySlugQuery, { slug })
  if(!podcast) {
    null
  }
  return podcast
}

export const getAllPodcastSlugs = async (
  client: any,
  currentSlug: string
): Promise<{
  current: { slug: string; number: number };
  previous: string;
  next: string;
  totalPodcasts: number;
}> => {
  const query = `
    *[_type == "post" && contentType == "podcast"] | order(_updatedAt desc) {
      "slug": slug.current
    }
  `;

  const result = await client.fetch(query);
  const slugs = result?.map((item: { slug: string }) => item.slug);

  const currentIndex = slugs?.indexOf(currentSlug);

  if (currentIndex === -1) {
    throw new Error(`Slug ${currentSlug} not found`);
  }

  const totalPodcasts = slugs?.length;

  const previousSlug = slugs[(currentIndex - 1 + totalPodcasts) % totalPodcasts];
  const nextSlug = slugs[(currentIndex + 1) % totalPodcasts];

  return {
    current: { slug: currentSlug, number: currentIndex + 1 },
    previous: previousSlug,
    next: nextSlug,
    totalPodcasts
  };
};


export async function getArticle(
  client: SanityClient,
  slug: string,
): Promise<any> {
  const article = await client.fetch(articleBySlugQuery, { slug })
  if(!article) {
    null
  }
  return article
}
export async function getWebinar(
  client: SanityClient,
  slug: string,
): Promise<any> {
  const webinar = await client.fetch(webinarBySlugQuery, { slug })
  if(!webinar) {
    null
  }
  return webinar
}
export async function getEbook(
  client: SanityClient,
  slug: string,
): Promise<any> {
  const ebook = await client.fetch(ebookBySlugQuery, { slug })
  if(!ebook) {
    null
  }
  return ebook
}
export async function getPressRelease(
  client: SanityClient,
  slug: string,
): Promise<any> {
  const pressRelease = await client.fetch(pressReleaseBySlugQuery, { slug })
  if(!pressRelease) {
    null
  }
  return pressRelease
}

export async function getSitemapData(client: SanityClient): Promise<Post[]> {
  try {
    const posts = await client.fetch(siteMapQuery)
    const testimonials = await client.fetch(testiMonialQuery)
    const tags = await client.fetch(tagQuery)
    const authors = await client.fetch(authorQuery)
    return [...posts, ...testimonials, ...tags, ...authors]
  } catch (error) {
    console.error(error)
    return []
  }
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
export const articleSlugsQuery = groq`
  *[_type == "post" && contentType == "article" && defined(slug.current)][].slug.current
`
export const webinarSlugsQuery = groq`
  *[_type == "post" && contentType == "webinar" && defined(slug.current)][].slug.current
`
export const pressReleaseSlugsQuery = groq`
  *[_type == "post" && contentType == "press-release" && defined(slug.current)][].slug.current
`
export const caseStudySlugsQuery = groq`
  *[_type == "post" && contentType == "case-study" && defined(slug.current)][].slug.current
`
export const ebookSlugsQuery = groq`
  *[_type == "post" && contentType == "ebook" && defined(slug.current)][].slug.current
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
