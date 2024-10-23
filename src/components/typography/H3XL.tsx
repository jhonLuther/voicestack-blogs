import React from 'react'

interface H3XLProps {
    className ?:string;
    children?:any
}

function H3XL({className,children}:H3XLProps) {
  return (
    <h3 className={`md:text-5xl  text-4xl font-bold font-manrope md:leading-tighter  w-full  ${className}`}>
    {children}
  </h3>  )
}

export default H3XL
