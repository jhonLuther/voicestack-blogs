import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'testimonialName',
      title: 'Testimonial Name',
      type: 'string',
      description: 'The name of the person providing the testimonial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Page Path',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'testimonialName',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'customer' }],
      description: 'The customer associated with this testimonial',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A brief summary of the testimonial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'layoutSwitcher',
        title: 'Layout Switcher',
        type: 'boolean',
        description: 'Toggle to switch between layouts',
      }),
    defineField({
      name: 'hasVideo',
      title: 'Has Video',
      type: 'boolean',
      description: 'Whether a video is associated with this testimonial',
    }),
    defineField({
      name: 'videos',
      title: 'Video',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'videos' }],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'An image to accompany this testimonial',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'newContent',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'The rating for this testimonial (1-5)',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'The date this testimonial was created or published',
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
      title: 'testimonialName',
      media: 'image',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title,
        subtitle: 'Testimonial',
        media,
      }
    },
  },
})