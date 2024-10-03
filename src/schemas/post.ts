import { defineField, defineType } from 'sanity'
import { DocumentVideoIcon } from '@sanity/icons'

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
          name: 'link',
          title: 'Link',
          type: 'url',
        },
      ],
      hidden: ({ parent }) =>
        parent.contentType !== 'webinar' && parent.contentType !== 'podcast',
    }),
    defineField({
      name: 'duration',
      title: 'Duration ',
      type: 'string',
      hidden: ({ parent }) =>
        parent.contentType !== 'webinar' && parent.contentType !== 'podcast',
    }),
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
