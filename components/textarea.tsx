import React, { TextareaHTMLAttributes } from "react";

export interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = ({ className, ...rest }: ITextarea) => {
  return (
    <textarea
      className={"p-2 text-sm tracking-wide border rounded-sm tk-text-blue ".concat(
        className
      )}
    ></textarea>
  );
};
