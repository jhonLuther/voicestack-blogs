import React from 'react';
import dynamic from 'next/dynamic';

const componentMap = {
  textBlock: dynamic(() => import('../components/sections/TextBlock')),
  imageBlock: dynamic(() => import('../components/sections/ImageBlock')),
  bannerBlock: dynamic(() => import('../components/sections/BannerBlock')),
  testimonialCard: dynamic(() => import('../components/sections/TestimonialCard')),
};

// Specify the props type in each dynamic block within the names in componentMap
const DynamicComponent = ({ componentType, ...props }) => {  
  console.log(props);
  
  const Component = componentMap[componentType];
  if (!Component) return null;

  return <Component {...props} />;
};

export default DynamicComponent;
