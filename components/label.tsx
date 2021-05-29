import React, { HTMLAttributes } from "react";

export interface ILabel extends HTMLAttributes<HTMLElement> {
  className?: string;
}

export const Label = ({ children, className, ...rest }: ILabel) => {
  return (
    <span
      className={"text-sm tk-text-blue font-light tracking-wide ".concat(
        className
      )}
    >
      {children}
    </span>
  );
};
