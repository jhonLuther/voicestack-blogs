import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'videoManager',
  title: 'Video Manager',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // defineField({
    //   name: 'videos',
    //   title: 'Videos',
    //   type: 'array',
    //   of: {
    //     type: 'object',
    //     fields: [
    //       defineField({
    //         name: 'video',
    //         title: 'Video',
    //         type: 'file',
    //         options: {
    //           accept: 'video/mp4, video/webm, video/ogg',
    //         },
    //       }),
    //       defineField({
    //         name: 'thumbnail',
    //         title: 'Thumbnail',
    //         type: 'image',
    //       }),
    //       defineField({
    //         name: 'videoTitle',
    //         title: 'Video Title',
    //         type: 'string',
    //       }),
    //       defineField({
    //         name: 'description',
    //         title: 'Video Description',
    //         type: 'text',
    //       }),
    //     ],
    //   },
    // }),
  ],
  preview: {
    select: {
      title: 'title',
      videos: 'videos',
    },
    prepare(selection) {
      const { title, videos } = selection
      return { ...selection, subtitle: videos && `${videos.length} videos` }
    },
  },
})