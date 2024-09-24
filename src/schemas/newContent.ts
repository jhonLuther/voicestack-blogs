import { defineArrayMember, defineType } from 'sanity'
import HighlightDecorator from '../components/HighlightDecorator'
import DynamicComponent from '../../src/schemas/dynamicComponent'

export default defineType({
  title: 'Block Content',
  name: 'newContent',
  type: 'array',
  of: [
    {
      type: 'image'
    },
    {
      type: 'dynamicComponent',
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
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Highlight', value: 'highlight',
            component: HighlightDecorator },
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
          }
        ],
      },
    }),
  ],
})