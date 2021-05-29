import React, { InputHTMLAttributes } from "react";

export interface IText extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const TextInput = ({ className, ...rest }: IText) => {
  return (
    <input
      type="text"
      className={"p-2 text-sm tracking-wide border rounded-sm tk-text-blue ".concat(
        className
      )}
    ></input>
  );
};
