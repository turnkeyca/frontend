import React, { InputHTMLAttributes } from "react";

export interface ICurrency extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
}

export const CurrencyInput = ({ className, placeholder, ...rest }: ICurrency) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={"p-3 text-sm tracking-wide border rounded-sm tk-text-blue ".concat(
        className
      )}
    ></input>
  );
};
