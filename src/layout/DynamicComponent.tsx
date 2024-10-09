import React from 'react';
import dynamic from 'next/dynamic';

const componentMap = {
  textBlock: dynamic(() => import('../components/sections/TextBlock')),
  imageBlock: dynamic(() => import('../components/sections/ImageBlock')),
  bannerBlock: dynamic(() => import('../components/sections/BannerBlock')),
  testimonialCard: dynamic(() => import('../components/sections/TestimonialCard')),
};

// specify the props type in each dynamic blocks withn the names in componentMap
const DynamicComponent = ({ componentType, ...props }) => {  
  const Component = componentMap[componentType];
  if (!Component) return null;
  return <Component {...props} />;
};

export default DynamicComponent;
