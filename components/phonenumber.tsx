import React, { ChangeEvent, InputHTMLAttributes } from "react";

export interface IPhoneNumber extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
}

export const PhoneNumberInput = ({
  className,
  placeholder,
  ...rest
}: IPhoneNumber) => {
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
