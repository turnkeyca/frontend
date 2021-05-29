import React, { HTMLAttributes } from "react";

export interface ISelectOption extends HTMLAttributes<HTMLElement> {
  className?: string;
  handleClick?: () => any;
}

export const SelectOption = ({
  children,
  className,
  ...rest
}: ISelectOption) => {
  return (
    <option className={"text-sm tk-text-blue tracking-wide ".concat(className)}>
      {children}
    </option>
  );
};
