import React, { HTMLAttributes } from "react";

export interface IProgressBar extends HTMLAttributes<HTMLElement> {
  progress: string; // As a fraction
}

export const ProgressBar = ({
  progress,
  ...rest
}: IProgressBar) => {
  let backBarClass = "flex tk-bg-dark-grey h-2"
  let frontBarClass = "tk-bg-amber h-2 w-" + progress
  return (
    <div>
      <div className={backBarClass}>
        <div className={frontBarClass}></div></div>
    </div>
  );
};
