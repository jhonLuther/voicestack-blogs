import React from 'react'

interface H4LargeProps {
    className ?:string;
    children?:any
}
function H4Large({className,children}:H4LargeProps) {
  return (
    <h4 className={`md:text-2xl text-xl font-manrope font-bold ${className}`}>{children}</h4>
  )
}

export default H4Large
