import React from 'react'

export default function Section({ children, className }: { children: React.ReactNode, className?:any }) {
  return (
    <div className={`flex ${className}`}>
      {children}
    </div>
  )
}
