import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image';
export const SanityImage = ({ asset, client,...props }) => {
  const imageProps = useNextSanityImage(client, asset) as { [key: string]: any };
  if (!imageProps) return null;

  return (<Image title={props?.title}
    src={''} alt={props?.alt} {...imageProps}
    layout='responsive'
    sizes='(max-width: 800px) 100vw, 800px' />);
}