import React, { HTMLAttributes } from "react";

export interface ISpinner extends HTMLAttributes<HTMLElement> {
  className?: string;
}

export const Spinner = ({ className, ...rest }: ISpinner) => {
  return (
    <div className={" ".concat(className)}>
      <i className="fas fa-circle-o-notch fa-spin tk-text-blue"></i>
    </div>
  );
};
