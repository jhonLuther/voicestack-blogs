import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'tagName',
      title: 'Tag Name',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'tagName',
    },

  }
})
