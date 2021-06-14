import React, { ChangeEvent, InputHTMLAttributes } from "react";

export interface IPhoneNumber extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
}

let val: string;

export const PhoneNumberInput = ({
  className,
  placeholder,
  ...rest
}: IPhoneNumber) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={($event) => handleChange($event)}
      value={val}
      className={"p-2 text-sm tracking-wide border rounded-sm tk-text-blue ".concat(
        className
      )}
    ></input>
  );
};

function handleChange($event: ChangeEvent) {
  if ($event?.target?.value && $event?.target?.value !== val) {
    val = formatPhoneNumber($event?.target?.value);
  }
}

function formatPhoneNumber(value: string): string {
  return value;
}
