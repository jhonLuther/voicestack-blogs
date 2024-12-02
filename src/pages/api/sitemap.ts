import { NextApiRequest, NextApiResponse } from 'next'
import { getClient } from '~/lib/sanity.client'
import { readToken } from '~/lib/sanity.api'
import { getSitemapData } from '~/lib/sanity.queries'
import siteConfig from 'config/siteConfig'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

function generateSiteMap(posts: any[]) {
  const staticPages = [
    `${BASE_URL}/${siteConfig.pageURLs.caseStudy}`,
    `${BASE_URL}/${siteConfig.pageURLs.article}`,
    `${BASE_URL}/${siteConfig.pageURLs.podcast}`,
    `${BASE_URL}/${siteConfig.pageURLs.ebook}`,
    `${BASE_URL}/${siteConfig.pageURLs.webinar}`,
    `${BASE_URL}/${siteConfig.pageURLs.pressRelease}`,
  ]

  const dynamicPages = posts.map((post) => {
    return `
      <url>
        <loc>${BASE_URL}/${post?.contentType}/${post?.url}</loc>
        <lastmod>${post?._updatedAt}</lastmod>
      </url>
    `
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}11</loc>
            </url>
          `
        })
        .join('')}
      ${dynamicPages.join('')}
    </urlset>
  `
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const client = getClient(req?.preview ? { token: readToken } : undefined)
    const data = await getSitemapData(client)
    const sitemap = generateSiteMap(data)
    res.setHeader('Content-Type', 'application/xml')
    res.write(sitemap)
    res.end()
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate sitemap' })
  }
}
