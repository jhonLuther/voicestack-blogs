import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useNextSanityImage } from "next-sanity-image";
import { useRouter } from "next/router";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import useBoundingWidth from "~/utils/boundingWIdthHook";

interface ImageLoaderProps {
  height?: number;
  width?: number;
  image: SanityImageSource;
  useClientWidth?: boolean;
  priority?: boolean;
  maxWidth?: number;
  wrapperPadding?: boolean;
  client?: any;
  [x: string]: any;
}

type DeviceType = 'smallMobile' | 'largeMobile' | 'tab' | 'largerDevice' | null;

const ImageLoader = ({
  height,
  width,
  useClientWidth,
  maxWidth,
  image,
  priority,
  wrapperPadding,
  client,
  ...rest
}: ImageLoaderProps) => {
  const imageParent = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [imageLayoutDimensions, setImageLayoutDimensions] = useState({
    height: 0,
    width: 0,
  });

  let deviceObtained = useBoundingWidth() as DeviceType;

  const imageProps = useNextSanityImage(client, image, {
    imageBuilder: (imageUrlBuilder, options) => {
      return imageUrlBuilder
        .width(options.width || Math.min(maxWidth || 2000, 2000))
        .quality(options.quality || 75)
        .fit('clip');
    },
  });
  

  if (!image) {
    return null;
  }

  const calculateRenderValues = () => {
    if (imageParent.current) {
      let imageWidth;
      if (maxWidth) {
        imageWidth = maxWidth;
      } else {
        const imageRect = imageParent.current.getBoundingClientRect();
        imageWidth = imageRect.width;
        if (deviceObtained === "smallMobile") {
          imageWidth = 600;
        } else if (deviceObtained === "largeMobile") {
          imageWidth = 767;
        } else if (deviceObtained === "tab") {
          imageWidth = 1024;
        }
        // For 'largerDevice', use the container width
      }

      const ratio = Math.round(imageWidth) / (imageProps?.width || 1);
      let height = ratio * (imageProps?.height || 1);
      setImageLayoutDimensions({
        height: Math.round(height),
        width: Math.round(imageWidth),
      });
    }
  };

  // useEffect(() => {
  //   calculateRenderValues();
  // }, [imageParent, deviceObtained, router.asPath, image, maxWidth]);

  const calculateAspectRatio = () => {
    const ratio = imageProps ? (imageProps.height / imageProps.width) * 100 : 0;
    return `${ratio.toFixed(5)}%`;
  };

  if (useClientWidth) {
    return (
      <div
        ref={imageParent}
        style={wrapperPadding ? { width: '100%', height: '100%' } : { width: '100%', paddingTop: `${calculateAspectRatio()}`, display: "flex", position: 'relative' }}
      >
        {imageLayoutDimensions.width > 0 &&
        imageLayoutDimensions.height > 0 &&
        imageProps ? (
          <Image
            {...imageProps}
            alt={(image as any).alt || ""}
            style={wrapperPadding ? {} : {
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            width={imageLayoutDimensions.width}
            height={imageLayoutDimensions.height}
            title={(image as any).title}
            priority={priority}
            quality={75}
          />
        ) : null}
      </div>
    );
  } else {
    return imageProps ? (
      <Image
        {...imageProps}
        alt={(image as any).alt || ""}
        width={width || imageProps.width}
        height={height || imageProps.height}
        title={(image as any).title}
        quality={75}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        {...rest}
      />
    ) : null;
  }
};

export default ImageLoader;