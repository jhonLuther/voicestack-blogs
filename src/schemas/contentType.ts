import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contentType',
  title: 'ContentType',
  type: 'document',
  fields: [
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'contentType',
    },
  },
})
