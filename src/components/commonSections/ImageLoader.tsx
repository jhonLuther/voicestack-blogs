import Image from 'next/image';
import { useRouter } from 'next/router';
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
  useDefaultSize?: boolean;
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
  useDefaultSize = false,
  maxWidth = 1200,
  onColorExtracted,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [clientWidth, setClientWidth] = useState<number>(width);
  const [clientHeight, setClientHeight] = useState<number>(height);
  const [cdnImageDimensions, setCdnImageDimensions] = useState({
    height: 0,
    width: 0,
  });

  const deviceObtained = useBoundingWidth() as DeviceType;
  const router = useRouter();
  const imageWidthFromCdn = image?.metadata?.dimensions?.width;
  const imageRatio = image?.metadata?.dimensions?.aspectRatio;

  const calculateRenderValues = () => {

    if (containerRef.current) {
      debugger

      let renderImageWidth = 0;

      if (deviceObtained === "smallMobile") {
        renderImageWidth = imageWidthFromCdn < 600 ? imageWidthFromCdn : 600;
      } else if (deviceObtained === "largeMobile") {
        renderImageWidth = imageWidthFromCdn < 767 ? imageWidthFromCdn : 767;
      } else if (deviceObtained === "tab") {
        renderImageWidth = imageWidthFromCdn < maxWidth ? maxWidth : maxWidth;
      }else{
        renderImageWidth = maxWidth
      }

      setCdnImageDimensions({
        height: Math.round((1 / imageRatio) * renderImageWidth),
        width: Math.round(renderImageWidth),
      });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      calculateRenderValues();
    }
    console.log(cdnImageDimensions,'cdnImageDimensions');
    
  }, [containerRef, deviceObtained, router.asPath,image]);

  // useEffect(()=>{
  //   calculateRenderValues()
  // },[containerRef.current])

  useEffect(() => {
    if (containerRef.current) {
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
      const aspectRatio = image?.metadata?.dimensions?.aspectRatio;
      const calculatedHeight = Math.round(clientWidth / aspectRatio);


      url = urlForImage(image._id || image, {
        width: cdnImageDimensions.width ?  cdnImageDimensions.width : clientWidth,
        height:cdnImageDimensions.height ? cdnImageDimensions.height : calculatedHeight,
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
        const color: any = await average(url, { amount: 1, format: 'array' });
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
          }}
        >
          <Image
            src={imageUrl}
            alt={alt || image.altText || 'blog card image'}
            title={title || image.title || 'blog card image'}
            fill
            className={`top-0 left-0 object-cover ${imageClassName}`}
          />
        </div>
      </div>
    );
  } else if (useDefaultSize) {
    return (
      <div ref={containerRef} className={`relative w-full h-[${(1 / aspectRatio) * 100}%] ${className}`}>
        <div className="relative w-full h-full flex">
          <Image
            src={imageUrl}
            alt={alt || image.altText || 'blog card image'}
            title={title || image.title || 'blog card image'}
            width={clientWidth}
            height={clientHeight}
            className={`top-0 left-0 object-cover ${imageClassName}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-auto ${className}`}>
      <Image
        src={imageUrl}
        alt={alt || image.altText || 'blog card image'}
        title={title || image.title || 'blog card image'}
        width={width}
        height={height}
        className={`object-cover ${imageClassName}`}
        style={{
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      />
    </div>
  );
};

export default ImageLoader;
