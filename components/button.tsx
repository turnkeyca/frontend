import React, { ButtonHTMLAttributes } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  handleClick?: () => any;
}

export const Button = ({
  children,
  variant = "primary",
  type = "button",
  handleClick,
  className,
  ...rest
}: IButton) => {
  let colourClasses = "";
  if (variant === "primary") {
    colourClasses = "text-white tk-bg-teal";
  } else if (variant === "secondary") {
    colourClasses = "text-white tk-bg-amber";
  } else if (variant === "tertiary") {
    colourClasses = "tk-text-blue bg-white border tk-border-blue";
  }
  return (
    <button
      type={type}
      onClick={handleClick}
      className={"flex justify-center items-center cursor-pointer rounded tracking-wide font-medium uppercase text-sm p-3 "
        .concat(colourClasses)
        .concat(" ")
        .concat(className)}
    >
      {children}
    </button>
  );
};
