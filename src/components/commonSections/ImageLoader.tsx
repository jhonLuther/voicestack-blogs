import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { urlForImage } from '~/lib/sanity.image';

interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

interface SanityImage {
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
  image: any;
  alt?: string;
  title?: string;
  className?: string;
  useClientWidth?: boolean;
  [x: string]: any;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  image,
  width = 700,
  height = 400,
  alt,
  title,
  className = '',
  useClientWidth = false,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [clientWidth, setClientWidth] = useState<number>(width);  

  useEffect(() => {
    if (useClientWidth && containerRef.current) {
      const handleResize = (width: number) => {
        setClientWidth(width);
      };

      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          handleResize(entry.contentRect.width);
        }
      });

      handleResize(containerRef.current.clientWidth);
      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [useClientWidth]);

  useEffect(() => {
    if (!image) return;

    if (typeof image === 'string') {
      setImageUrl(image);
      return;
    }

    let url;
    if (useClientWidth) {
      const aspectRatio = image?.metadata?.dimensions?.aspectRatio || 1.5;
      const calculatedHeight = Math.round(clientWidth / aspectRatio);
      
      url = urlForImage(image._id, {
        width: clientWidth,
        height: calculatedHeight,
        quality: 90
      });
    } else {
      url = urlForImage(image._id, {
        width: width,
        height: height,
        quality: 90
      });
    }

    setImageUrl(url);
  }, [image, clientWidth, useClientWidth, width, height]);

  if (!imageUrl) {
    console.warn('Failed to generate image URL');
    return null;
  }

  const aspectRatio = image?.metadata?.dimensions?.aspectRatio || width / height;

  if (useClientWidth) {
    return (
      <div ref={containerRef} className={`relative w-full ${className}`}>
        <div
          className="relative"
          style={{
            paddingTop: `${(1 / aspectRatio) * 100}%`
          }}
        >
          <Image
            src={imageUrl}
            alt={props.altText || image.altText}
            title={props.title ||  image.title || ''}
            fill
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={imageUrl}
        alt={props.altText ||image.altText  || 'blog card image'}
        title={props.title || image.title || 'blog card image'}
        width={width}
        height={height}
        className="object-cover"
      />
    </div>
  );
};

export default ImageLoader;