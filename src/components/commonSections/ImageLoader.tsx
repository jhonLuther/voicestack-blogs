import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { urlForImage } from '~/lib/sanity.image';
import useBoundingWidth, { DeviceType } from '~/utils/boundingWIdthHook';
import { average } from '~/utils/color';
import { rgbToHsl } from '~/utils/common';

interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

interface SanityImage {
  title: string;
  altText: string;
  _id: any;
  _type: 'image';
  asset: SanityImageAsset;
  metadata: {
    dimensions: {
      aspectRatio: number;
      width: number;
      height: number;
    };
  };
}

interface ImageLoaderProps {
  width?: number;
  height?: number;
  image: SanityImage;
  alt?: string;
  title?: string;
  className?: string;
  imageClassName?: string;
  useClientWidth?: boolean;
  onColorExtracted?: (color: string) => void;
  maxWidth?: number;
  fixed?: boolean;
  [x: string]: any;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  image,
  width = 700,
  height = 400,
  alt,
  title,
  className = '',
  imageClassName = '',
  useClientWidth = false,
  maxWidth = 1200,
  onColorExtracted,
  fixed = true,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoContainerRef = useRef<HTMLDivElement>(null);
  const [clientWidth, setClientWidth] = useState<number>(width);
  const [clientHeight, setClientHeight] = useState<number>(height);
  const [renderImage, setRenderImage] = useState<string>('');
  const [renderImageWidth, setRenderImageWidth] = useState<number>(0);
  const [renderImageHeight, setRenderImageHeight] = useState<number>(0);
  const [renderImageRatio, setRenderImageRatio] = useState<number>(0);

  const deviceObtained = useBoundingWidth() as DeviceType;

  const imageWidthFromCdn = image?.metadata?.dimensions?.width;
  const imageRatio = image?.metadata?.dimensions?.aspectRatio;

  useEffect(() => {
    let newProposedWidth = 0;
    if (imageWidthFromCdn && imageRatio) {
      if (deviceObtained === 'smallMobile') {
        newProposedWidth = Math.min(imageWidthFromCdn, 600);
      } else if (deviceObtained === 'largeMobile') {
        newProposedWidth = Math.min(imageWidthFromCdn, 767);
      } else if (deviceObtained === 'tab') {
        newProposedWidth = Math.min(imageWidthFromCdn, maxWidth);
      } else {
        newProposedWidth = maxWidth;
      }
    }

    setRenderImageWidth(newProposedWidth);
    setRenderImageRatio(imageRatio);

    const renderImageHeight = newProposedWidth / imageRatio;

    setRenderImageHeight(renderImageHeight);

    const url = urlForImage(image._id, {
      width: newProposedWidth,
      height: renderImageHeight,
      quality: 90,
    });

    const extractColor = async () => {
      if (url && onColorExtracted) {
        const color: any = await average(url, { amount: 1, format: 'array' });
        onColorExtracted(rgbToHsl(color[0], color[1], color[2]));
      }
    };

    extractColor();

    setRenderImage(url);
  }, [deviceObtained, imageWidthFromCdn, imageRatio, maxWidth, renderImageWidth, onColorExtracted, image._id]);

  useEffect(() => {
    if (autoContainerRef.current) {
      setClientHeight(autoContainerRef.current.clientHeight);
      setClientWidth(autoContainerRef.current.clientWidth);
    }
  }, [renderImageWidth, autoContainerRef]);

  return fixed && renderImage ? (
    <div ref={containerRef} className={`flex w-full h-full relative ${className}`}>
      <Image  priority={true} src={renderImage} alt={image.altText || alt } title={image.title || title} className={`object-cover object-center ${imageClassName}`} fill />
    </div>
  ) : renderImageWidth>0 && renderImage ? (
    <div ref={autoContainerRef} className={`w-full h-auto relative ${className}`}>
      <Image  priority={true} className='!m-0' src={renderImage} alt={image.altText || alt} width={clientWidth} title={image.title || title} height={(clientWidth / renderImageWidth) * renderImageHeight } />
    </div>
  ) : null;
};

export default ImageLoader;