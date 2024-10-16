import React from "react";

interface LayoutProps {
  children?: React.ReactNode;
  extended?: boolean;
  display?: "hidden";
  position?: string;
  background?: string;
  className?:any
  fullWidth?: boolean
  removePadding?: boolean

}

const Wrapper: React.FunctionComponent<LayoutProps> = ({
  children,
  extended,
  display,
  background,
  position,
  className,
  fullWidth = false,
  removePadding = false,
}) => {

  
  return (
    <div
      className={` ${fullWidth ? "w-full" : "max-w-9xl"}  ${removePadding ? "p-0" : "" } px-4 md:py-12  py-4 h-full   mx-auto w-full  ${className}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
