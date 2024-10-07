import { Post } from "~/interfaces/post";
import post from "~/schemas/post";

export const fetchAuthor = (post) => {
    let authorData:any = [];
    post && post.authorInfo && (
        post.authorInfo.content.body.filter((block: any) => block.component === "authorBioSection")
      .map((author: any) => (authorData = author.author))
    )
    return authorData;
  }


  export function getRelatedFeatures(currentPost: Post, allPosts: Post[]): Post[] {
    const currentTags = new Set(currentPost.tags?.map(tag => tag.tagName) || []);
  
    const relatedPosts = allPosts
      .filter(post => post._id !== currentPost._id)
      .map(post => ({
        post,
        relevance: (post.tags?.filter(tag => currentTags.has(tag.tagName)) || []).length
      }))
      ?.sort((a, b) => {
        if (b.relevance !== a.relevance) {
          return b.relevance - a.relevance; 
        }
        return new Date(b.post._createdAt).getTime() - new Date(a.post._createdAt).getTime();
      })
      .map(item => item.post);
  
    const uniqueRelatedPosts = Array.from(new Set(relatedPosts.map(post => post._id)))
      .map(_id => relatedPosts.find(post => post._id === _id))
      .filter((post): post is Post => post !== undefined)
      .slice(0, 2);
  
    return uniqueRelatedPosts;
  }
  

  export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1) + 's';
  };
  