import { ImageAsset, PortableTextBlock, Slug } from "sanity"

export interface Post {
  relatedPosts: any[]
	duration: string
    map(arg0: (blog: any, index: any) => import("react").JSX.Element): import("react").ReactNode | Iterable<import("react").ReactNode>
  desc: string
  image: any
  ebookFields: any
  contentType: any
  contentTypes: any[]
  tagName: any
    _type: 'post'
    _id: string
    _createdAt: string
    title?: string
    slug: Slug
    excerpt?: string
    mainImage?: ImageAsset
    mainImageV1?: ImageAsset
    body: PortableTextBlock[]
    dynamicComponents: any
    estimatedReadingTime?: string
    estimatedWordCount?: string 
    numberOfCharacters ?: number
    
    seoTitle?: string
    seoDescription?: string
    seoRobots?: string
    seoKeywords?: string
    seoCanonical?: string
    seoJSONLD?: string

      author?: {
			length: number
      name: string
      _ref: string
      _type: 'reference'
    }
  
    tags?: Array<{
      [key: string]: any
    }>
  }

  export interface Author{
    picture: any
    _id: string,
    name: string,
    slug: Slug,
    role:any,
    bio:any,
  }
  export interface Tag{
    _id: string,
    tagName: string,
    slug: Slug,
  }
// interfaces/post.ts
// Example of Testimonial interface
export interface Testimonial {
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  seoRobots: string
  seoCanonical: string
  author: any
  contentType: any
  relatedTestimonials: any[]
  body: any
  practiceName: any
  mainImage: any
  title: string
  _id: string;
  testimonialName: string; 
  slug: Slug;
  excerpt?: string; 
  summary?: string; 
  image?: string;
}
export interface Podcasts {
  videos: any
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  seoRobots: string
  seoCanonical: string
  author: any
  contentType: any
  videoId: any
  platform: any
  relatedWebinars: any[]
  relatedPodcasts: any[]
  practiceName: Podcasts
  contents: any
  htmlCode: any
  body: any
  mainImage: any
  title: string
  _id: string;
  testimonialName: string; 
  slug: Slug;
  excerpt?: string; 
  summary?: string; 
  image?: string;
}
export interface Articles {
  contentType: any
  seoCanonical: string
  seoRobots: string
  seoKeywords: string
  seoDescription: string
  seoTitle: string
  relatedArticles: any[]
  article: any
  contents: any
  htmlCode: any
  body: any
  mainImage: any
  title: string
  _id: string;
  testimonialName: string; 
  slug: Slug;
  excerpt?: string; 
  summary?: string; 
  image?: string;
  author?: {
    length: number
    name: string
    _ref: string
    _type: 'reference'
  }

  tags?: Array<{
    [key: string]: any
  }>
}
export interface CaseStudies {
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  seoRobots: string
  seoCanonical: string
  author: any
  contentType: any
  relatedCaseStudies: any[]
  practiceName: any
  practiceProfile: any
  htmlCode: any
  body: any
  mainImage: any
  title: string
  _id: string;
  testimonialName: string; 
  slug: Slug;
  excerpt?: string; 
  summary?: string; 
  image?: string;
}
export interface Webinars {
  practiceName: any
  practiceProfile: any
  htmlCode: any
  body: any
  mainImage: any
  title: string
  _id: string;
  testimonialName: string; 
  slug: Slug;
  excerpt?: string; 
  summary?: string; 
  image?: string;
}
export interface Ebooks {
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  seoRobots: string
  seoCanonical: string
  author: any
  contentType: any
  relatedEbooks: any[]
  relatedWebinars: any[]
  practiceName: any
  practiceProfile: any
  htmlCode: any
  body: any
  mainImage: any
  title: string
  _id: string;
  testimonialName: string; 
  slug: Slug;
  excerpt?: string; 
  summary?: string; 
  image?: string;
}
export interface  PressRelease {
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  seoRobots: string
  seoCanonical: string
  author: any
  contentType: any
  relatedPressReleases: any[]
  practiceName: any
  practiceProfile: any
  htmlCode: any
  body: any
  mainImage: any
  title: string
  _id: string;
  testimonialName: string; 
  slug: Slug;
  excerpt?: string; 
  summary?: string; 
  image?: string;
}

