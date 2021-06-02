import React, { HTMLAttributes } from "react";

export interface ISelectOption extends HTMLAttributes<HTMLElement> {
  className?: string;
  handleClick?: () => any;
}

export const SelectOption = ({
  children,
  handleClick,
  className,
  ...rest
}: ISelectOption) => {
  return (
    <option
      onClick={handleClick}
      className={"p-2 text-sm tracking-wide border rounded-sm tk-text-blue ".concat(
        className
      )}
    >
      {children}
    </option>
  );
};
