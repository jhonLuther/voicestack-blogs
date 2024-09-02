import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import newContent from './newContent'
import post from './post'
import tag from './tag'
import iframes from './iframes'
import dynamicComponent from './dynamicComponent'
import demoBannerBlock from './sections/demoBannerBlock'
import author from './sections/author'

export const schemaTypes = [post, iframes, blockContent, newContent, tag,dynamicComponent,demoBannerBlock,author]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, iframes, blockContent, newContent, tag,dynamicComponent,demoBannerBlock,author],
}
