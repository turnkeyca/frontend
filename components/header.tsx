import React, { HTMLAttributes } from "react";
import { BackArrow } from "./backarrow";
import { EditPencil } from "./editpencil";

export interface IHeader extends HTMLAttributes<HTMLElement> {
  title: string;
  showBack: boolean;
  showEdit: boolean;
  onBack?: () => any;
  onEdit?: () => any;
}

export const Header = ({
  children,
  title,
  showBack,
  showEdit,
  onBack,
  onEdit,
  ...rest
}: IHeader) => {
  return (
    <div>
      <div className="tk-bg-teal flex justify-between items-center pb-2 pt-4">
        <span>{showBack && <BackArrow handleClick={onBack}></BackArrow>}</span>
        <span className="text-white font-medium">{title}</span>
        <span>
          {showEdit && <EditPencil handleClick={onEdit}></EditPencil>}
        </span>
      </div>
      {children}
    </div>
  );
};
