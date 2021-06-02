import React, { SelectHTMLAttributes } from "react";

export interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  handleSelect?: () => any;
}

export const Select = ({
  children,
  handleSelect,
  className,
  ...rest
}: ISelect) => {
  return (
    <select
      onSelect={handleSelect}
      className={"p-2 text-sm tracking-wide border rounded-sm tk-text-blue ".concat(
        className
      )}
    >
      {children}
    </select>
  );
};
