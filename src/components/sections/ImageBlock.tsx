import React from 'react'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'

const ImageBlock = ({ image }:any) => {
  return (
    image && <Image
      src={urlForImage(image)?.url()}
      alt={image.alt || ''}
      width={500}
      height={300}
    />
  )
}

export default ImageBlock