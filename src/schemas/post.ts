import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'
import tag from './tag';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'Seo Handlers',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
        // columns: 2, // Defines a grid for the fields and how many columns it should have
        modal: { type: 'popover' }, //Makes the modal type a popover
      },
    },
  ],
  fields: [
    // SEO specific fields with unique names
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
        Rule.required().min(10).error('description of at least 10 characters is required'),
        Rule.max(155).warning('Shorter descriptions are usually better')
      ]
    }),
    defineField({
      name: 'seoRobots',
      title: 'SEO Robots',
      type: 'string',
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'string',
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoCanonical',
      title: 'SEO Canonical',
      type: 'string',
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoJSONLD',
      title: 'SEO JSON-LD',
      type: 'text',
      fieldset: 'seo',
      validation: Rule => Rule.custom(json => {
        try {
          JSON.parse(json || "{}");
          return true;
        } catch (err) {
          return "Invalid JSON format";
        }
      }),
    }),
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
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
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
      name: 'contentTypes',
      title: 'Content Type',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'contentType' }],
        },
      ],
    }),
    {
      name: 'dynamicComponents',
      title: 'Dynamic Components',
      type: 'array',
      of: [{ type: 'dynamicComponent' }],
    },
    defineField({
      name: 'body',
      title: 'Body',
      type: 'newContent',
    }),
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
      author: 'author.name',
      media: 'mainImage',
      tag:'tag'
    },
    prepare(selection) {
      const { author ,tag} = selection
      return { ...selection, subtitle: author && `by ${author + tag}` }
    },
  },
})
