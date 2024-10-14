import { defineField, defineType } from 'sanity'
import { DocumentVideoIcon, MasterDetailIcon } from '@sanity/icons'
import htmlCode from './htmlCode'

export default defineType({
  name: 'post',
  title: 'Content Manager',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO Settings',
      options: {
        collapsible: true,
        collapsed: true,
        modal: { type: 'popover' },
      },
    },
    {
      name: 'practiceProfile',
      title: 'Practice Profile',
      options: {
        collapsible: true,
        collapsed: true,
        modal: { type: 'popover' },  
      },
    },
  ],
  fields: [
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Ebook', value: 'ebook' },
          { title: 'Article', value: 'article' },
          { title: 'Webinar', value: 'webinar' },
          { title: 'Podcast', value: 'podcast' },
          { title: 'Case Study', value: 'case-study' },
          { title: 'Press Release', value: 'press-release' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'string',
      fieldset: 'seo',
      validation: (Rule) => [
        Rule.required()
          .min(10)
          .error('A description of at least 10 characters is required'),
        Rule.max(155).warning('Shorter descriptions are usually better'),
      ],
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Meta Keywords',
      type: 'string',
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoJSONLD',
      title: 'Meta JSON-LD',
      type: 'text',
      fieldset: 'seo',
      validation: (Rule: any) =>
        Rule.custom((json) => {
          try {
            JSON.parse(json || '{}')
            return true
          } catch (err) {
            return 'Invalid JSON format'
          }
        }),
    }),

    // Common Fields
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Page Path',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'Video',
      title: 'Video Link',
      type: 'object',
      icon: DocumentVideoIcon,
      fields: [
        {
          name: 'platform',
          title: 'Platform',
          type: 'string',
          options: {
            list: [
              { title: 'YouTube', value: 'youtube' },
              { title: 'Vimeo', value: 'vimeo' },
              { title: 'Vidyard', value: 'vidyard' },
            ],
          },
        },
        {
          name: 'videoId',
          title: 'Video ID',
          description:"Paste the ID of the video you want to embed",
          type: 'string',
        },
      ],
      hidden: ({ parent }) =>
        parent.contentType !== 'webinar' ,
    }),



    defineField(
      {
        name: 'htmlCode',
        title: 'Embed Code',
        type: 'text',
        description: 'Paste the HTML code you want to embed',
        validation: Rule => Rule.required(),
        hidden: ({ parent }) =>
           parent.contentType !== 'podcast',
      },
    ),

    // Practice Profile Fields
    defineField({
      name: 'practiceName',
      title: 'Practice Name',
      type: 'string',
      hidden: ({ parent }) =>
        parent.contentType !== 'case-study',
      fieldset: 'practiceProfile',
    }),

    defineField({
      name: 'headCount',
      title: 'Number of Staffs',
      type: 'string',
      fieldset: 'practiceProfile',
      hidden: ({ parent }) =>
        parent.contentType !== 'case-study',
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      fieldset: 'practiceProfile',
      hidden: ({ parent }) =>
        parent.contentType !== 'case-study',
    }),

    defineField({
      name: 'providers',
      title: 'Providers',
      type: 'string',
      fieldset: 'practiceProfile',
      hidden: ({ parent }) =>
        parent.contentType !== 'case-study',
    }),

    defineField({
      name: 'growingLocations',
      title: 'Growing Locations',
      type: 'string',
      fieldset: 'practiceProfile',
      hidden: ({ parent }) =>
        parent.contentType !== 'case-study',
    }),

    defineField({
      name: 'asideBookFreeDemoBanner',
      title: 'Aside Book Free Demo Banner',
      type: 'array',
      fieldset: 'practiceProfile',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Number Field',
              type: 'string',
            },
            
            { 
              name: 'text', 
              title: 'Description', 
              type: 'string' 
            },
          ],
        },
      ],
      hidden: ({ parent }) =>
        parent.contentType !== 'case-study',
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      hidden: ({ parent }) =>
        parent.contentType !== 'webinar' && parent.contentType !== 'podcast' && parent.contentType !== 'case-study',
    }),

    // Ebook Specific Fields
    defineField(    {
      name: 'attachment',
      title: 'Ebook Attachment',
      type: 'file',
      hidden: ({ parent }) =>
        parent.contentType !== 'ebook',
    },),


    // Common Components
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'newContent',
    }),

    // Author Reference
    defineField({
      name: 'author',
      title: 'Author',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'author' }],
        },
      ],
      validation: (Rule) => [
        Rule.required()
          .min(1)
          .error('At least one author is required'),
      ],
    }),

    // Tags Field
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      contentType: 'contentType',
      author: 'author.name',
      media: 'mainImage',
      tag: 'tag',
    },
    prepare(selection) {
      const { title, contentType, author, tag } = selection
      return {
        title,
        subtitle: author && `${contentType && contentType.toUpperCase()}`,
        media: selection.media,
      }
    },
  },
})
