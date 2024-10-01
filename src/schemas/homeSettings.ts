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
      title: 'Featured Blog',
      type: 'reference',
      to: [{ type: 'post' }],
      group: 'popularBlogs',
    },
    {
      name: 'blogColor',
      title: 'Featured Blogs Color',
      type: 'string',
      group: 'popularBlogs',
    },
    {
      name: 'popularBlogs',
      title: 'Popular Blogs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      group: 'popularBlogs',
    },
    {
      name: 'FeaturedContents',
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
