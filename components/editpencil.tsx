import React, { ButtonHTMLAttributes } from "react";

export interface IEditPencil extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  handleClick?: () => any;
}
export const EditPencil = ({
  children,
  handleClick,
  className,
  ...rest
}: IEditPencil) => {
  return (
    <div onClick={handleClick} className={" ".concat(className)}>
      <i className="fas fa-angle-left text-white"></i>
    </div>
  );
};
