import { defineArrayMember, defineField, defineType } from 'sanity'
import HighlightDecorator from '../components/HighlightDecorator'
import DynamicComponent from '../../src/schemas/dynamicComponent'
import { ImageIcon } from '@sanity/icons'
import { ThLargeIcon } from '@sanity/icons'
import { InsertBelowIcon } from '@sanity/icons'
import htmlCode from './htmlCode'
import dynamicComponent from '../../src/schemas/dynamicComponent'

export default defineType({
  title: 'Block Content',
  name: 'newContent',
  type: 'array',
  of: [
    {
      type: 'image',
      icon: ImageIcon,
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string',
        },
        {
          title: 'Alt Text',
          name: 'alt',
          type: 'string',
        },
      ],
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
    
    defineArrayMember(htmlCode),
    defineArrayMember(dynamicComponent),
    defineArrayMember({
      title: 'Video',
      name: 'videoReference',
      description: 'Select a video from the video manager',
      type: 'reference',
      to: [{ type: 'videos' }],
    }),
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        // { title: 'H1', value: 'h1' },
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
