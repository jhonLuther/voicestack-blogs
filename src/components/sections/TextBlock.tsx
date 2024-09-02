import React from 'react'
import { PortableText } from '@portabletext/react'

const TextBlock = ({ content }) => {
  return <PortableText value={content} />
}

export default TextBlock