export default {
    name: 'testimonialCard',
    title: 'Testimonial Card',
    type: 'object',
    fields: [
      {
        name: 'testimonialTitle',
        title: 'Title ',
        type: 'string',
        description: 'A Brief Title',
      },
      {
        name: 'testimonialDesc',
        title: 'Description',
        type: 'text',
        description: 'A brief description ',
      },
      {
        name: 'author',
        title: 'Author',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'author' }],
          },
        ],
        validation: (Rule) => [
          Rule.required()
            .min(1)
            .error('At least one author is required'),
        ],
      },
    ],
    preview: {
      select: {
        title: 'statOne',
        subtitle: 'descriptionOne',
      },
      prepare(selection) {
        const { title, subtitle } = selection;
        return {
          title: title,
          subtitle: subtitle,
        };
      },
    },
  }
  