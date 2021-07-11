import React, { HTMLAttributes } from "react";

export interface IError extends HTMLAttributes<HTMLElement> {
  error: Error;
}

export const Error = ({ error, ...rest }: IError) => {
  return (
    <div className="bg-red-100 text-red-600 flex items-center justify-center rounded border border-red-400 my-3 p-3">
      {error.message}
    </div>
  );
};
