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
      name: 'featuredTags',
      title: 'Featured Tags ',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'tag' }],
      }],
      group: 'popularBlogs'
    },
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
      name: 'featuredCarouselItems',
      description: 'This content will be displayed in the Carousel section',
      title: 'Featured Carousel Contents',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'post' }],
        options: {  
          filter: '_type == "post" && (contentType in ["webinar", "ebook"])',
          disableNew: true
        }
      }],
      group: 'popularBlogs'
    },
    {
      name: 'customBrowseContent',
      description:'Selected content will be displayed in the Projected Browse section',
      title: 'Custom Browse Content',
      type: 'reference',
      to: [{ type: 'customContent' }],
      group: 'popularBlogs'
    },
    {
      name: 'featuredArticle',
      title: 'Featured Article',
      description: 'This content will be featured as an article in its landing page',
      type: 'reference',
      to: [{ type: 'post' }],
      options: {
        filter: `_type == "post" && contentType == "article"`,
        disableNew: true,
      },
      group: 'popularBlogs',
    },
    
    {
      name: 'featuredWebinar',
      description: 'This content will be featured as a webinar in its landing page',
      title: 'Featured Webinar',
      type: 'reference',
      to: [{ type: 'post' }],
      options: {
        filter: `_type == "post" && contentType == "webinar"`,
        disableNew: true,
      },
      group: 'popularBlogs',
    },
    
    {
      name: 'featuredPodcast',
      description: 'This content will be featured as a podcast in its landing page',
      title: 'Featured Podcast',
      type: 'reference',
      to: [{ type: 'post' }],
      options: {
        filter: `_type == "post" && contentType == "podcast"`,
        disableNew: true,
      },
      group: 'popularBlogs',
    },
    
    {
      name: 'featuredEbook',
      description: 'This content will be featured as an ebook in the article landing page',
      title: 'Featured Ebook',
      type: 'reference',
      to: [{ type: 'post' }],
      options: {
        filter: `_type == "post" && contentType == "ebook"`,
        disableNew: true,
      },
      group: 'popularBlogs',
    },
    
    {
      name: 'featuredCasestudy',
      description: 'This content will be featured as a case study in the article landing page',
      title: 'Featured Case Study',
      type: 'reference',
      to: [{ type: 'post' }],
      options: {
        filter: `_type == "post" && contentType == "case-study"`,
        disableNew: true,
      },
      group: 'popularBlogs',
    },
    
    {
      name: 'featuredPressRelease',
      description: 'This content will be featured as a press release in the article landing page',
      title: 'Featured Press Release',
      type: 'reference',
      to: [{ type: 'post' }],
      options: {
        filter: `_type == "post" && contentType == "press-release"`,
        disableNew: true,
      },
      group: 'popularBlogs',
    },

    {
      name: 'featuredReviews',
      description:'This content will be displayed in the reviews section',
      title: 'Featured Reviews',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      options: {
        disableNew: true,
      },
      group: 'popularBlogs',
    },

  ],
  preview: {
    prepare(selection) {
      return {
        title: 'Home Settings',
      };
    },
  },
};
