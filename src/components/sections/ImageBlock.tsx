import React from 'react'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'
import ImageLoader from '../commonSections/ImageLoader'

const ImageBlock = ({ image }: any) => {
  return (
    image && (
      <ImageLoader
        image={image || ''}
        alt={image.alt || ''}
        width={500}
        height={300}
      />
    )
  )
}

export default ImageBlock
