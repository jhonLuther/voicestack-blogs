import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Content Manager',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO Handlers',
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
          { title: 'Blog', value: 'blog' },
          { title: 'Ebook', value: 'ebook' },
          { title: 'Article', value: 'article' },
          { title: 'Webinar', value: 'webinar' },
          { title: 'Podcast', value: 'podcast' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
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
      title: 'SEO Keywords',
      type: 'string',
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoJSONLD',
      title: 'SEO JSON-LD',
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
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),

    // Fields for Post
    defineField({
      name: 'postFields',
      title: 'Post Specific Fields',
      type: 'object',
      hidden: ({ parent }) => parent.contentType !== 'blog',
      fields: [
        {
          name: 'excerpt',
          title: 'Excerpt',
          type: 'text',
        },
      ],
    }),

    // Fields for Ebook
    defineField({
      name: 'ebookFields',
      title: 'Ebook Specific Fields',
      type: 'object',
      hidden: ({ parent }) => parent.contentType !== 'ebook',
      fields: [
        {
          name: 'ebookFile',
          title: 'Ebook File',
          type: 'file',
        },
        {
          name: 'ebookPages',
          title: 'Number of Pages',
          type: 'number',
        },
      ],
    }),

    // Fields for Podcast
    defineField({
      name: 'podcastFields',
      title: 'Podcast Specific Fields',
      type: 'object',
      hidden: ({ parent }) => parent.contentType !== 'podcast',
      fields: [
        {
          name: 'podcastFile',
          title: 'Podcast File',
          type: 'file',
        },
        {
          name: 'duration',
          title: 'Duration (in minutes)',
          type: 'number',
        },
      ],
    }),

    // Fields for Webinar
    defineField({
      name: 'webinarFields',
      title: 'Webinar Specific Fields',
      type: 'object',
      hidden: ({ parent }) => parent.contentType !== 'webinar',
      fields: [
        {
          name: 'webinarLink',
          title: 'Webinar Link',
          type: 'url',
        },
        {
          name: 'scheduledDate',
          title: 'Scheduled Date',
          type: 'datetime',
        },
      ],
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

    // Fields for Article
    defineField({
      name: 'articleFields',
      title: 'Article Specific Fields',
      type: 'object',
      hidden: ({ parent }) => parent.contentType !== 'article',
      fields: [
        {
          name: 'articleBody',
          title: 'Article Body',
          type: 'blockContent',
        },
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

    defineField({
      name: 'dynamicComponents',
      title: 'Custom Components',
      type: 'array',
      of: [{ type: 'dynamicComponent' }],
    }),

    // Author Reference
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
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
        subtitle:
          author &&
          `${contentType && contentType} by ${author ? author : 'Unknown'}`,
        media: selection.media,
      }
    },
  },
})
