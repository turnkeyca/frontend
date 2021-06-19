import React, { HTMLAttributes } from "react";
import { Icon } from "./icon";

export interface IHeader extends HTMLAttributes<HTMLElement> {
  title: string;
  showBack: boolean;
  showEdit: boolean;
  showLogout: boolean;
  onBack?: () => any;
  onEdit?: () => any;
}

function logout(): void {
  console.log("logged out");
}

export const Header = ({
  title,
  showBack,
  showEdit,
  showLogout,
  onBack,
  onEdit,
  ...rest
}: IHeader) => (
  <div className="tk-bg-teal text-white flex justify-between items-center px-2 py-4">
    <div>
      {showBack && <Icon name="arrow_back" handleClick={onBack} />}
      {showLogout && <Icon name="logout" handleClick={logout} />}
    </div>
    <div className="text-white font-medium">{title}</div>
    <div>{showEdit && <Icon name="edit" handleClick={onEdit} />}</div>
  </div>
);
