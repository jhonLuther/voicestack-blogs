import {useNextSanityImage} from 'next-sanity-image'
import Image from 'next/image';
// import { readToken } from '~/lib/sanity.api'
// import { getClient } from '~/lib/sanity.client'

// const client = getClient({ token: readToken })
export const SanityImage = ({ asset, client }) => {
  const imageProps = useNextSanityImage(client, asset) as { [key: string]: any };

  // console.log({imageProps});
  

  if (!imageProps) return null;

  return (<Image 
  src={''} alt={''} {...imageProps}
  layout='responsive'
  sizes='(max-width: 800px) 100vw, 800px'  />);
}