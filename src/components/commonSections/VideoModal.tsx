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

  console.log(videoData, 'videoData');
  

  return (
    <div className={`w-full h-[400px] ${className} `}>
      {Array.isArray(videoData) && videoData.length > 0 && videoData.map((item: any) => (
        <iframe
          src={getIframeUrl(item?.platform, item?.videoId)}
          title={item?.title}
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
          key={item._id}
        />
      ))}
      {!Array.isArray(videoData) && (
        <iframe
          src={getIframeUrl(videoData?.platform, videoData?.videoId)}
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