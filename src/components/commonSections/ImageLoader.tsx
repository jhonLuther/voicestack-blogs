import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { urlForImage } from '~/lib/sanity.image';
import { average } from '~/utils/color';
import { rgbToHsl } from '~/utils/common';

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
  imageClassName?: string;
  useClientWidth?: boolean;
  onColorExtracted?: (color: string) => void; 
  [x: string]: any;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  image,
  width = 700,
  height = 400,
  alt,
  title,
  className = '',
  imageClassName = "",
  useClientWidth = false,
  onColorExtracted,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [clientWidth, setClientWidth] = useState<number>(width);  
  const [clientHeight, setClientHeight] = useState<number>(height);  

  useEffect(() => {
    if (useClientWidth && containerRef.current) {
      const handleResize = (width: number, height: number) => {
        setClientWidth(width);
        setClientHeight(height);
      };

      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          handleResize(entry.contentRect.width, entry.contentRect.height);
        }
      });

      handleResize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [useClientWidth]);

  useEffect(() => {
    if (!image) return;

    let url;
    if (useClientWidth) {
      const aspectRatio = image?.metadata?.dimensions?.aspectRatio || 1.5;
      const calculatedHeight = Math.round(clientWidth / aspectRatio);

      url = urlForImage(image._id || image, {
        width: clientWidth,
        height: calculatedHeight,
        quality: 90,
      });
    } else {
      url = urlForImage(image._id || image, {
        width: width,
        height: height,
        quality: 90,
      });
    }
    setImageUrl(url);    

    const extractColor = async () => {
      if (url && onColorExtracted) {
        const color:any = await average(url, { amount: 1, format: 'array' });
       onColorExtracted(rgbToHsl(color[0], color[1], color[2]));
      }
    };

    extractColor();

  }, [image, clientWidth, useClientWidth, width, height, onColorExtracted]);

  if (!imageUrl) {
    return null;
  }

  const aspectRatio = clientWidth / clientHeight;

  if (useClientWidth) {
    return (
      <div ref={containerRef} className={`relative w-full h-auto ${className}`}>
        <div
          className="relative w-full h-full flex"
          style={{
            paddingTop: `${(1 / aspectRatio) * 100}%`,
            boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Image
            src={imageUrl}
            alt={props.altText || image.altText || 'blog card image'}
            title={props.title || image.title || 'blog card image'}
            fill
            className="top-0 left-0 object-cover !m-0"
          />
        </div>
      </div>
    );
  }

  return (
    <div   className={`relative w-full h-auto ${className}`}>
      <Image
        src={imageUrl}
        alt={props.altText || image.altText || 'blog card image'}
        title={props.title || image.title || 'blog card image'}
        width={width}
        height={height}
        className={`object-cover ${imageClassName} `}
        style={{
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}  
      />
    </div>
  );
};

export default ImageLoader;
