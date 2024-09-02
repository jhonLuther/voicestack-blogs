import demoBannerBlock from './sections/demoBannerBlock';

export default {
  name: 'dynamicComponent',
  title: 'Dynamic Component',
  type: 'object',
  fields: [
    {
      name: 'componentType',
      title: 'Component Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text Block', value: 'textBlock' },
          { title: 'Image Block', value: 'imageBlock' },
          { title: 'Demo Banner Block', value: 'bannerBlock' }, 
          //add the component name 
        ],
      },
    },
    {
      name: 'content',
      title: 'Text Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }) => parent?.componentType !== 'textBlock',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.componentType !== 'imageBlock',
    },
    {
      name: 'caption',
      title: 'Image Caption',
      type: 'string',
      hidden: ({ parent }) => parent?.componentType !== 'imageBlock',
    },
    {
      name: 'bannerBlock',
      title: 'Demo Banner Block',
      type: 'demoBannerBlock', // Always use the name of schemaName
      hidden: ({ parent }) => parent?.componentType !== 'bannerBlock',
    },
  ],
  preview: {
    select: {
      title: 'componentType',
    },
  },
};
