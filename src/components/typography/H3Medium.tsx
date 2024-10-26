import React from 'react'

interface H3MediumProps {
    className ?:string;
    children?:any
}

function H3Medium({className,children}:H3MediumProps) {
  return (
    <h3 className={`md:text-2xl text-lg text-white font-bold font-manrope  w-full  ${className}`}>
    {children}
  </h3>  )
}

export default H3Medium
