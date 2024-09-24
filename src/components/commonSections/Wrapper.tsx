import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
  extended?: boolean;
  display?: "hidden";
  position?: string;
  background?: string;
  className?:any

}

const Wrapper: React.FunctionComponent<ContainerProps> = ({
  children,
  extended,
  display,
  background,
  position,
  className
}) => {
  return (
    <div
      className={` max-w-8xl mx-auto w-full px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
