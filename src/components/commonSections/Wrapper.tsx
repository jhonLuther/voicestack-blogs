import React from "react";

interface ContainerProps {
  color?:
  | "blue"
  | "white"
  | "gray"
  | "light-blue"
  | "green"
  | "yellow-shade"
  | "gray-shade"
  | "light-green"
  | "transparent"
  | "teal-25"
  | "cs-green-100"
  | "shade"
  | "cs-teal-100"
  | "cs-teal-200"
  | "cs-gray-100"
  | "cs-blue-700"
  | "dark"
  | "cs-gray-100"
  | "cs-gray-200"
  | "cs-gray-900"
  | "cs-green-light"
  | "colorType8"
  | "cs-dark-blue"
  | "cs-light-gray-bg"
  | "cs-light-gray-bg2"
  | "cs-light-gray-bg3"
  | "cs-light-green-bg"
  | "cs-light-yellow-bg"
  | "cs-dark-green-bg"
  | "cs-darker-green-bg"
  | "cs2-Peach-50"
  | "cs-dark-green-bg2 "
  | "cs-darker-green-bg2"
  | "cs2-inner-bg1"
  | "dark-blue-new"
  | "cs2-gray-100"
  | "cs2-teal-100"
  | "newGray"
  | "mint-green"
  | "mint-greenV1"
  | "mint-greenV2"
  | "green-gradient"
  | "emerald-sapphire"
  | "midnight-navy"
  | "colorType3"
  | "midnight-half"
  | "cs-blue-1000"
  | "cs-blue-half"
  | "light-blue-gradient"
  | "cs-light-pink"
  | "gradient-blue"
  | "gradient-lightBlue"

  children?: React.ReactNode;
  extended?: boolean;
  display?: "hidden";
  position?: string;
  background?: string;
  spacing?:
  | "pt-0"
  | "pb-0"
  | "py-0"
  | "pb-sm"
  | "pb-lg"
  | "pt-sm"
  | "py-sm"
  | "pb-mb-0"
  | "pt-mb-0"
  | "p-lg"
  | "default"
  | "pb-lg-0"
  | "pt-pb-0"
  | "p-mp"
}

const Wrapper: React.FunctionComponent<ContainerProps> = ({
  color,
  children,
  extended,
  display,
  spacing,
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
