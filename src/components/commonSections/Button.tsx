import Link from "next/link";
import React from "react";

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
  const baseClasses = `bg-zinc-500 hover:bg-zinc-600 text-white px-6 py-3 text-base leading-[1.5] font-medium rounded-[5px] flex items-center whitespace-nowrap  ${className}`;

  if (link) {
    return (
      <Link
        href={link}
        className={baseClasses}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={baseClasses}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
