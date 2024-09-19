import { ImageAsset, PortableTextBlock, Slug } from "sanity"

export interface Post {
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
    
    seoTitle?: string
    seoDescription?: string
    seoRobots?: string
    seoKeywords?: string
    seoCanonical?: string
    seoJSONLD?: string

      author?: {
      name: string
      _ref: string
      _type: 'reference'
    }
  
    tags?: Array<{
      [key: string]: any
    }>
  }