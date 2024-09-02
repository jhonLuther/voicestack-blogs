import { Post } from '~/interfaces/post'

export function generateJSONLD(post: Post) {
    const defaultJSONLD = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post._createdAt,
      "author": {
        "@type": "Person",
        "name": post.author?.name || "Unknown Author"
      }
    };
  
    let customJSONLD = {};
    try {
      customJSONLD = JSON.parse(post.seoJSONLD || "{}");
    } catch (error) {
      console.error("Error parsing custom JSON-LD:", error);
    }
  
    return JSON.stringify({ ...defaultJSONLD, ...customJSONLD });
  }