import React, { forwardRef } from 'react';

const Section = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => {
    return (
      <section ref={ref} className={`flex p-4 ${className}`}>
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
