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
      name: 'testimonials',  
      title: 'Testimonials',
      type: 'reference',
      to: [{ type: 'testimonial' }],
      group: 'testimonials',
    },

    {
      name: 'FeaturedBlog',
      description:'This content will be displayed in the Featured Blog',
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
      description:'This contents will appear in the Latest Blog section',
      title: 'Featured Contents',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      group: 'EbooksAndWebinars',
      
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
