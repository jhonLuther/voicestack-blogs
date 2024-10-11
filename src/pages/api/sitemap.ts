import { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../lib/sanity';
import groq from 'groq';
import { getClient } from '~/lib/sanity.client';
import { readToken } from '~/lib/sanity.api';
import { getPosts } from '~/lib/sanity.queries';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const query = groq`*[_type == "post" && defined(slug.current)]{
  "url": slug.current,
  contentType,
  _updatedAt
}`;

function generateSiteMap(posts: any[]) {
  const staticPages = [
    `${BASE_URL}`,
    `${BASE_URL}/case-studies`,
    `${BASE_URL}/articles`,
    `${BASE_URL}/podcasts`,
    `${BASE_URL}/webinars`,
    `${BASE_URL}/press-releases`,
  ];

  const dynamicPages = posts.map((post) => {
    return `
      <url>
        <loc>${BASE_URL}/${post?.contentType}/${post?.url}</loc>
        <lastmod>${post?._updatedAt}</lastmod>
      </url>
    `;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
            </url>
          `;
        })
        .join('')}
      ${dynamicPages.join('')}
    </urlset>
  `;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = getClient(req?.preview ? { token: readToken } : undefined);

    const posts = await client.fetch(query);

    const allPosts = await getPosts(client)
    
    const sitemap = generateSiteMap(posts);
    res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}