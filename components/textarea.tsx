import React, { TextareaHTMLAttributes } from "react";

export interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  placeholder?: string;
}

export const Textarea = ({ className, placeholder, ...rest }: ITextarea) => {
  return (
    <textarea
      placeholder={placeholder}
      className={"p-3 text-sm tracking-wide border rounded-sm tk-text-blue ".concat(
        className
      )}
    ></textarea>
  );
};
