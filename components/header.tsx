import React, { HTMLAttributes } from "react";
import { BackArrow } from "./backarrow";
import { EditPencil } from "./editpencil";
import { Logout } from "./logout";

export interface IHeader extends HTMLAttributes<HTMLElement> {
  title: string;
  showBack: boolean;
  showEdit: boolean;
  showLogout: boolean;
  onBack?: () => any;
  onEdit?: () => any;
}

export const Header = ({
  title,
  showBack,
  showEdit,
  showLogout,
  onBack,
  onEdit,
  ...rest
}: IHeader) => {
  return (
    <div className="tk-bg-teal flex justify-between items-center pb-2 pt-4">
      <span>
        {showBack && <BackArrow handleClick={onBack}></BackArrow>}
        {showLogout && <Logout></Logout>}
      </span>
      <span className="text-white font-medium">{title}</span>
      <span>{showEdit && <EditPencil handleClick={onEdit}></EditPencil>}</span>
    </div>
  );
};
