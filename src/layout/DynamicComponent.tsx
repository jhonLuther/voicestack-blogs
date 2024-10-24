import React from 'react';
import dynamic from 'next/dynamic';

const componentMap = {
  bannerBlock: dynamic(() => import('../components/sections/BannerBlock')),
  testimonialCard: dynamic(() => import('../components/sections/TestimonialCard')),
};


const DynamicComponent = ({ componentType, ...props }) => {  
  const Component = componentMap[componentType];
  if (!Component) return null;

  return <Component {...props} />;
};

export default DynamicComponent;
