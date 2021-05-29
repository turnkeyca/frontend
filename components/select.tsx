import React, { SelectHTMLAttributes } from "react";

export interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  handleClick?: () => any;
}

export const Select = ({
  children,
  handleClick,
  className,
  ...rest
}: ISelect) => {
  return (
    <select
      onClick={handleClick}
      className={"text-sm tracking-wide tk-text-blue ".concat(className)}
    >
      {children}
    </select>
  );
};
