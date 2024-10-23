import React from 'react'

interface H3LargeProps {
    className ?:string;
    children?:any
}

function H3Large({className,children}:H3LargeProps) {
  return (
    <h3 className={`md:text-4xl text-3xl font-bold font-manrope  w-full  ${className}`}>
    {children}
  </h3>  )
}

export default H3Large
