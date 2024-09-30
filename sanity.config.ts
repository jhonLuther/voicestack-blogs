/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { SetAndPublishAction } from './actions'
import {
  defineUrlResolver,
  Iframe,
  IframeOptions,
} from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'
import { table } from '@sanity/table'
import {CogIcon,HomeIcon} from '@sanity/icons'
// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from '~/lib/sanity.api'
import { schema } from '~/schemas'

const iframeOptions = {
  url: defineUrlResolver({
    base: '/api/draft',
    requiresSlug: ['post', 'author'],
  }),
  urlSecretId: previewSecretId,
  reload: { button: true },
} satisfies IframeOptions

export default defineConfig({
  basePath: '/studio',
  name: 'project-name',
  title: 'Project Name',
  projectId,
  dataset,
  //edit schemas in './src/schemas'
  schema,
  plugins: [
    table(),

    // structureTool({
    //   // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
    //   // You can add any React component to `S.view.component` and it will be rendered in the pane
    //   // and have access to content in the form in real-time.
    //   // It's part of the Studio's “Structure Builder API” and is documented here:
    //   // https://www.sanity.io/docs/structure-builder-reference
    //   structure: (S) => S.documentTypeList('post'),
    //   defaultDocumentNode: (S, { schemaType }) => {
    //     return S.document().views([
    //       // Default form view
    //       S.view.form(),
    //       // Preview
    //       S.view.component(Iframe).options(iframeOptions).title('Preview'),
    //     ])
    //   },
    // }),

    // structureTool({
    //   structure: (S) =>
    //     S.list()
    //       .title('Base')
    //       .items([
    //         S.listItem()
    //           .title('Site Settings')
    //           .child(
    //             S.document()
    //               .schemaType('siteSettings')
    //               .documentId('siteSettings')),
    //               ...S.documentTypeListItems().filter(listItem => !['siteSettings'].includes(listItem.getId()))
    //       ])
    // }),
    structureTool({
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      // structure: (S) => S.documentTypeList('post'),
      // name: 'posts',
      // title: 'Posts',

      defaultDocumentNode: (S, { schemaType }) => {
        return S.document().views([
          // Default form view
          S.view.form(),
          // Preview
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      },
      structure: (S) =>
        S.list()
          .title('Base')
          // .items([
          //   S.listItem()
          //     .title('Site Settings')
          //     .child(
          //       S.document()
          //         .schemaType('siteSettings')
          //         .documentId('siteSettings'),
          //     ),
          //   ...S.documentTypeListItems().filter(
          //     (listItem) => !['siteSettings'].includes(listItem.getId()),
          //   ),
          // ])'structureTool({
 
          .items([
            S.listItem()
              .title('Home Settings')
              .icon(HomeIcon)
              .child(
                S.document()
                  .schemaType('homeSettings')
                  .documentId('homeSettings'),
              ),
            ...S.documentTypeListItems().filter(
              (listItem) => !['homeSettings'].includes(listItem.getId()),
            ),
          ])
          .items([
            S.listItem()
              .title('Global Settings')
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType('globalSettings')
                  .documentId('globalSettings')
              ),
            ...S.documentTypeListItems().filter(
              (listItem) => !['globalSettings'].includes(listItem.getId())
            ),
          ])          
    }),

    media({
      creditLine: {
        enabled: true,
        // boolean - enables an optional "Credit Line" field in the plugin.
        // Used to store credits e.g. photographer, licence information
        excludeSources: ['unsplash'],
        // string | string[] - when used with 3rd party asset sources, you may
        // wish to prevent users overwriting the creditLine based on the `source.name`
      },
      maximumUploadSize: 10000000,
      // number - maximum file size (in bytes) that can be uploaded through the plugin interface
    }),

    // structureTool({
    //   // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
    //   // You can add any React component to `S.view.component` and it will be rendered in the pane
    //   // and have access to content in the form in real-time.
    //   // It's part of the Studio's “Structure Builder API” and is documented here:
    //   // https://www.sanity.io/docs/structure-builder-reference
    //   structure: (S) => S.documentTypeList('author'),
    //   name: 'authors',
    //   title: 'Authors',
    //   defaultDocumentNode: (S, { schemaType }) => {
    //     return S.document().views([
    //       // Default form view
    //       S.view.form(),
    //       // Preview
    //       S.view.component(Iframe).options(iframeOptions).title('Preview'),
    //     ])
    //   },
    // }),
    // Add the "Open preview" action
    previewUrl({
      base: '/api/draft',
      requiresSlug: ['post', 'author'],
      urlSecretId: previewSecretId,
    }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    actions: (prev) =>
      prev.map((originalAction) =>
        originalAction.action === 'publish'
          ? SetAndPublishAction
          : originalAction,
      ),
  },
})
