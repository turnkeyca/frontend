import React, { InputHTMLAttributes } from "react";

export interface IText extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
}

export const TextInput = ({ className, placeholder, ...rest }: IText) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={"p-2 text-sm tracking-wide border rounded-sm tk-text-blue ".concat(
        className
      )}
    ></input>
  );
};
