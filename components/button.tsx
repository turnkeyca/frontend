import React, { ButtonHTMLAttributes } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  handleClick?: () => any;
}

export const Button = ({
  children,
  variant = "primary",
  handleClick,
  className,
  ...rest
}: IButton) => {
  let colourClasses = "";
  if (variant === "primary") {
    colourClasses = "text-white tk-bg-teal";
  } else if (variant === "secondary") {
    colourClasses = "tk-text-blue tk-bg-amber";
  } else if (variant === "tertiary") {
    colourClasses = "tk-text-blue bg-white";
  }
  return (
    <div
      onClick={handleClick}
      className={"flex cursor-pointer border rounded tracking-wide font-medium text-sm "
        .concat(colourClasses)
        .concat(" ")
        .concat(className)}
    >
      <span className="p-2">{children}</span>
    </div>
  );
};
