import { Post } from "~/interfaces/post";
import post from "~/schemas/post";
import { average,prominent } from '~/utils/color';


export const fetchAuthor = (post) => {
    let authorData:any = [];
    post && post.authorInfo && (
        post.authorInfo.content.body.filter((block: any) => block.component === "authorBioSection")
      .map((author: any) => (authorData = author.author))
    )
    return authorData;
  }


   export function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    // return [ h, 40, 40 ];

    return `hsl(${h*360},50%,40%)`
    // return `hsl(${h*100},40%,40%)`
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



