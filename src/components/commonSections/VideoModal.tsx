import * as React from "react";

interface VideoProps {
  platform: "vimeo" | "vidyard" | "youtube" | string;
  link: string;
  className?: string;
}

const Video: React.FunctionComponent<VideoProps> = ({ platform, link ,className}) => {
  const iframeUrl = getIframeUrl(platform, link);

  return (
    <div className={`w-full h-full ${className}`}>
      <iframe
        src={iframeUrl}
        frameBorder="0"
        allowFullScreen
        className="w-full h-full"
      />
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

export default Video;