import { HomeIcon, DocumentIcon, TagIcon } from '@sanity/icons';
export default {
  name: 'homeSettings',
  title: 'Home Settings',
  icon: DocumentIcon,
  type: 'document',
  groups: [
    {
      name: 'popularBlogs',
      title: 'Popular Blogs',
    },
    {
      name: 'testimonials',  
      title: 'Testimonials',
    },
    {
      name: 'EbooksAndWebinars',
      title: 'Ebooks And Webinars',
    },
  ],
  fields: [
    {
      name: 'testimonial',  
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      group: 'testimonials',
    },

    {
      name: 'FeaturedBlog',
      description:'This content will be featured content in the Most Popular section',
      title: 'Featured Blog',
      type: 'reference',
      to: [{ type: 'post' }],
      group: 'popularBlogs',
    },
    {
      name: 'popularBlogs',
      description:'This content will be displayed in the Featured Blogs list',
      title: 'Featured Blogs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      group: 'popularBlogs',
    },
    {
      name: 'FeaturedContents',
      description:'This will be the featured content that will appear in the Latest Blog section',
      title: 'Featured Home Contents',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      group: 'EbooksAndWebinars',
      
    },
    {
      name: 'customBrowseContent',
      description:'Selected content will be displayed in the Projected Browse section',
      title: 'Custom Browse Content',
      type: 'reference',
      to: [{ type: 'customContent' }],
      group: 'popularBlogs'
    },
    // {
    //   name: 'FeaturedArticle',
    //   description: 'This content will be featured as an article in its landing page',
    //   title: 'Featured Article',
    //   type: 'reference',
    //   to: [{ 
    //     type: 'post',
    //     options: {
    //       filter: ({document}) => document.contentType === 'article',
    //       filterParams: {}
    //     }
    //   }],
    //   group: 'popularBlogs',
    // },
    
    // {
    //   name: 'FeaturedWebinar',
    //   description: 'This content will be featured as a webinar in its landing page',
    //   title: 'Featured Webinar',
    //   type: 'reference',
    //   to: [{ type: 'post', filter: 'contentType == "webinar"' }],
    //   group: 'popularBlogs',
    // },
    
    // {
    //   name: 'FeaturedPodcast',
    //   description: 'This content will be featured as a podcast in its landing page',
    //   title: 'Featured Podcast',
    //   type: 'reference',
    //   to: [{ type: 'post', filter: 'contentType == "podcast"' }],
    //   group: 'popularBlogs',
    // },
    
    // {
    //   name: 'FeaturedEbook',
    //   description: 'This content will be featured as an ebook in the article landing page',
    //   title: 'Featured Ebook',
    //   type: 'reference',
    //   to: [{ type: 'post', filter: 'contentType == "ebook"' }],
    //   group: 'popularBlogs',
    // },
    
    // {
    //   name: 'FeaturedCasestudy',
    //   description: 'This content will be featured as a case study in the article landing page',
    //   title: 'Featured Case Study',
    //   type: 'reference',
    //   to: [{ type: 'post', filter: 'contentType == "case-study"' }],
    //   group: 'popularBlogs',
    // },
    
    // {
    //   name: 'FeaturedPressRelease',
    //   description: 'This content will be featured as a press release in the article landing page',
    //   title: 'Featured Press Release',
    //   type: 'reference',
    //   to: [{ type: 'post', filter: 'contentType == "press-release"' }],
    //   group: 'popularBlogs',
    // },

  ],
  preview: {
    prepare(selection) {
      return {
        title: 'Home Settings',
      };
    },
  },
};
