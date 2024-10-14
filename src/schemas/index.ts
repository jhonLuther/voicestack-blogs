import { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import newContent from './newContent'
import post from './post'
import tag from './tag'
import iframe from './iframe'
import dynamicComponent from './dynamicComponent'
import demoBannerBlock from './sections/demoBannerBlock'
import author from './sections/author'
import homeSettings from './homeSettings'
import testiMonial from './testiMonial'
import customer from './sections/customer'
import link from './link'
import globalSettings from './globalSettings'
import table from './table'
import htmlCode from './htmlCode'
import asideBannerBlock from './sections/asideBannerBlock'
import testimonialCard from './sections/testimonialCard'
import videoManager from './videoManager'

export const schemaTypes = [post, iframe, blockContent, newContent, tag,dynamicComponent,demoBannerBlock,author,homeSettings,testiMonial,customer,link,globalSettings,table,htmlCode,asideBannerBlock,testimonialCard,videoManager]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, iframe, blockContent, newContent, tag,dynamicComponent,demoBannerBlock,author,homeSettings,testiMonial,customer,link,globalSettings,table,htmlCode,asideBannerBlock,testimonialCard,videoManager],
}
