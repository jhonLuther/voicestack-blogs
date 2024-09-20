import { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent'
import newContent from './newContent'
import post from './post'
import tag from './tag'
import iframe from './iframe'
import dynamicComponent from './dynamicComponent'
import demoBannerBlock from './sections/demoBannerBlock'
import author from './sections/author'

export const schemaTypes = [post, iframe, blockContent, newContent, tag,dynamicComponent,demoBannerBlock,author]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, iframe, blockContent, newContent, tag,dynamicComponent,demoBannerBlock,author],
}
