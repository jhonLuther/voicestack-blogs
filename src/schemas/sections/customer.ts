import { defineField, defineType } from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'customer',
  title: 'Customer',
  icon: UsersIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),

    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      bio: 'bio',
      media: 'picture',
    },
    prepare(selection) {
      const { bio, title } = selection
      return { ...selection, subtitle: bio && `${bio}` }
    },
  },
})
