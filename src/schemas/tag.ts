import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'tagName',
      title: 'Tag Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'tagName',
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: 'tagName',
    },
  },
})
