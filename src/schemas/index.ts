import { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import newContent from './newContent'
import post from './post'
import tag from './tag'
import iframe from './iframe'
import dynamicComponent from './dynamicComponent'
import demoBannerBlock from './sections/demoBannerBlock'
import author from './sections/author'
import siteSettings from './settings'
import homeSettings from './homeSettings'
import testiMonial from './testiMonial'
import customer from './sections/customer'

export const schemaTypes = [post, iframe, blockContent, newContent, tag,dynamicComponent,demoBannerBlock,author,siteSettings,homeSettings,testiMonial,customer]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, iframe, blockContent, newContent, tag,dynamicComponent,demoBannerBlock,author,siteSettings,homeSettings,testiMonial,customer],
}
