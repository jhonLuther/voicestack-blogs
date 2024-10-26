
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface ButtonProps {
  type?: "ghost" | "primary" | "primaryWhite" | "outlineArrow" | "learnMore" | "secondary" | "secondaryLg" | "secondaryWhite" | "secondaryWhiteChevron" | "secondaryWhiteChevronLg" | "secondary-md" | "secondary-bg" | "primaryArrow" | "login" | "primary-v1" | "primaryBlackChevron" | "primaryBlackChevronLg" | "secondaryBlack" | "secondaryBlackChevron" | "secondaryBlackChevronLg" | "secondaryBlackChevronMd" | "primaryChevron" | "learnMoreChevron" | "primaryBlack" | "videoButton" | "primaryLg";
  alter?: "bgWhite" | "borderWhite" | "disabled" | "default";
  children?: React.ReactNode;
  link?: any;
  isDemo?: boolean;
  [x: string]: any;
  className?: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
    type,
    alter,
    children,
    link,
    isDemo,
    className,
    ...rest
  }) => {

    if (link) {
      return (
        <Link
          href={link}
          className={`bg-zinc-500 hover:bg-zinc-600 text-white px-6 py-3 text-base leading-[1.5] font-medium rounded-[5px] flex items-center ${className}`}
          {...rest}
        >
          {children}
        </Link>
      );
    }
  
    return (
      <button
        className={`bg-zinc-500 hover:bg-zinc-600 text-white px-6 py-3 text-base leading-[1.5] font-medium rounded-[5px] flex items-center ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  };
export default Button;