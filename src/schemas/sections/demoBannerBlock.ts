export default {
    name: 'demoBannerBlock',
    title: 'Call to Action Block',
    type: 'object',
    fields: [
      {
        name: 'backgroundColor',
        title: 'Background Color',
        type: 'string',
        description: 'Select the background color for the CTA block'
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The main text of the CTA'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'A brief description or subtext'
      },
      {
        name: 'buttonText',
        title: 'Button Text',
        type: 'string',
        description: 'The text to display on the CTA button'
      },
      {
        name: 'buttonLink',
        title: 'Button Link',
        type: 'url',
        description: 'The URL the button should link to'
      }
    ]
  }