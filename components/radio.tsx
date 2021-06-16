import React, { ButtonHTMLAttributes } from "react";
import { Label } from "./label";

export interface IRadio extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  handleSelect?: () => any;
}

export const Radio = ({
  children,
  handleSelect,
  className,
  ...rest
}: IRadio) => {
  return (
    <div className={"flex ".concat(className)} onSelect={handleSelect}>
      <input type="radio" />
      <span className="pl-2">{children}</span>
    </div>
  );
};
