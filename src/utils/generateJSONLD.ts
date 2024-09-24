import { Post } from '~/interfaces/post';
import { fetchAuthor } from './common';

export function generateJSONLD(post: Post) {

  const contentType = post?.contentType;
  // console.log(contentType,'contentType');
  

  if (contentType) {
    switch (contentType) {
      case 'blog':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "datePublished": post._createdAt,
          "author": {
            "@type": "Person",
            "name": post.author?.name || "Unknown Author",
          },
        });
      case 'ebook':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          "name": post.title,
          "author": {
            "@type": "Person",
            "name": post.author?.name || "Unknown Author",
          },
          "datePublished": post._createdAt,
          "numberOfPages": post.ebookFields?.ebookPages || 0,
          "description": post.excerpt,
        });
      case 'article':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "author": {
            "@type": "Person",
            "name": post.author?.name || "Unknown Author",
          },
          "datePublished": post._createdAt,
          "articleBody": post.body,
        });
      case 'webinar':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          "name": post.title,
          "startDate": post._createdAt,
          "description": post.excerpt,
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "eventStatus": "https://schema.org/EventScheduled",
        });
      case 'podcast':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PodcastEpisode",
          "name": post.title,
          "description": post.excerpt,
          "datePublished": post._createdAt,
          "author": {
            "@type": "Person",
            "name": post.author?.name || "Unknown Author",
          },
        });
      default:
        return '{}'; 
    }
  }

  // Default BlogPosting schema 
  const defaultJSONLD = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post._createdAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Unknown Author",
    },
  };

  let customJSONLD = {};
  try {
    customJSONLD = JSON.parse(post.seoJSONLD || '{}');
  } catch (error) {
    console.error('Error parsing custom JSON-LD:', error);
  }

  return JSON.stringify({ ...defaultJSONLD, ...customJSONLD });
}
