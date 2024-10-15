import * as React from "react";

interface VideoProps {
  videoDetails: any;
  className?: string;

}

export const VideoModal: React.FunctionComponent<VideoProps> = ({ videoDetails, className, ...props }:any) => {
  const videoData:any = props?.video || videoDetails;
  if (!videoData) {
    return null
  }

  return (
    <div className={`w-full ${className}`}>
      {Array.isArray(videoData) && videoData.length > 0 && videoData.map((item: any) => (
        <iframe
          src={getIframeUrl(item?.platform, item?.link)}
          title={item?.title}
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
          key={item._id}
        />
      ))}
      {!Array.isArray(videoData) && (
        <iframe
          src={getIframeUrl(videoData?.platform, videoData?.link)}
          title={videoData?.title}
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
        />
      )}
    </div>
  );
};

const getIframeUrl = (platform: string, link: string) => {
  switch (platform) {
    case "vimeo":
      return `https://player.vimeo.com/video/${link}?autoplay=1`;
    case "vidyard":
      return `https://play.vidyard.com/${link}?autoplay=1`;
    case "youtube":
      return `https://www.youtube.com/embed/${link}?autoplay=1`;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
};