import { defineArrayMember, defineType } from 'sanity'
import HighlightDecorator from '../components/HighlightDecorator'
import DynamicComponent from '../../src/schemas/dynamicComponent'
import { ImageIcon } from '@sanity/icons'
import { ThLargeIcon } from '@sanity/icons'
import { InsertBelowIcon } from '@sanity/icons'

export default defineType({
  title: 'Block Content',
  name: 'newContent',
  type: 'array',
  of: [
    {
      type: 'image',
      icon: ImageIcon,
    },
    {
      type: 'table',
      icon: ThLargeIcon,
      options: {
        editModal: 'fullscreen',
        columns: 3,
        pageSize: 10,
      },
    },
    {
      type: 'dynamicComponent',
      icon: InsertBelowIcon,
      options: {
        list: [
          { title: 'Text Block', value: 'textBlock' },
          { title: 'Image Block', value: 'imageBlock' },
          { title: 'Demo Banner Block', value: 'bannerBlock' },
        ],
      },
    },
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
  ],
})
