import React, { ButtonHTMLAttributes } from "react";

export interface IBackArrow extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  handleClick?: () => any;
}
export const BackArrow = ({
  children,
  handleClick,
  className,
  ...rest
}: IBackArrow) => {
  return (
    <div onClick={handleClick} className={" ".concat(className)}>
      <i className="fas fa-angle-left text-white"></i>
    </div>
  );
};
