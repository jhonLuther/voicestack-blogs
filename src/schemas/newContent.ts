import { defineArrayMember, defineType } from 'sanity'
import { ImageIcon, PlayIcon, ThLargeIcon, InsertBelowIcon } from '@sanity/icons'
import htmlCode from './htmlCode'
import dynamicComponent from '../../src/schemas/dynamicComponent'
import videoManager from './videoManager'

export default defineType({
  title: 'Block Content',
  name: 'newContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
    }),
   defineArrayMember({
      title: 'Video',
      description: 'Select a video from the video manager',
      type: 'reference',
      to: [{ type: 'videoManager' }],
      icon: PlayIcon,
    }),
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
    defineArrayMember(videoManager),
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
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