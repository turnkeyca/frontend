import React, { HTMLAttributes } from "react";

export interface IWarning extends HTMLAttributes<HTMLElement> {}

export const Warning = ({ children, ...rest }: IWarning) => {
  return (
    <div className="bg-yellow-100 text-yellow-600 flex items-center justify-center rounded border border-yellow-400 my-3 p-3">
      {children}
    </div>
  );
};
