
export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Site Title',
        type: 'string'
      },
      {
        name: 'description',
        title: 'Site Description',
        type: 'text'
      }
    ],
    preview: {
      // select: {
      //   title: 'title',
      //   contentType: 'contentType',
      //   author: 'author.name',
      //   media: 'mainImage',
      //   tag: 'tag',
      // },
      prepare(selection) {
        // const { title, contentType, author, tag } = selection
        return {
          title: 'Site Settings',
        }
      },
    },
  }