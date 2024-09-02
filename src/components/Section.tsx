import React, { forwardRef } from 'react';

const Section = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={`flex ${className}`}>
        {children}
      </div>
    );
  }
);

Section.displayName = 'Section';

export default Section;
