import React, { forwardRef, HTMLAttributes } from "react";
import Link from "next/link";
import { Icon } from "./icon";

export interface IHeader extends HTMLAttributes<HTMLElement> {
  title: string;
  showBack: boolean;
  showEdit: boolean;
  showLogout: boolean;
  onBackRoute?: string;
  onEditRoute?: string;
}

function logout(): void {
  console.log("logged out");
}

export const Header = forwardRef(
  (
    {
      title,
      showBack,
      showEdit,
      showLogout,
      onBackRoute,
      onEditRoute,
      ...rest
    }: IHeader,
    ref
  ) => {
    return (
      <div className="tk-bg-teal text-white flex justify-between items-center px-2 py-4">
        <div>
          {showBack && (
            <Link href={onBackRoute}>
              <Icon className="cursor-pointer" name="arrow_back" />
            </Link>
          )}
          {showLogout && <Icon name="logout" handleClick={logout} />}
        </div>
        <div className="text-white font-medium">{title}</div>
        <div>
          {showEdit && (
            <Link href={onEditRoute}>
              <Icon className="cursor-pointer" name="edit" />
            </Link>
          )}
        </div>
      </div>
    );
  }
);
