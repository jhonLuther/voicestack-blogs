import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image';
import ImageLoader from './commonSections/ImageLoader';
export const SanityImage = ({ asset, client,...props }) => {
  const imageProps = useNextSanityImage(client, asset) as { [key: string]: any };
  if (!imageProps) return null;

  console.log(imageProps,'imageProps',asset);
  

  return (
  <ImageLoader image={imageProps?.src}
     title={props?.title}
     alt={props?.alt}
    imageClassName='w-full h-full object-cover'
    useDefaultSize={true}
       ></ImageLoader>
  )
}