import React, { HTMLAttributes } from "react";
import { Icon } from "./icon";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";

export interface IHeader extends HTMLAttributes<HTMLElement> {
  title: string;
  showBack: boolean;
  showEdit: boolean;
  showLogout: boolean;
  editSamePath?: boolean;
}

export const Header = ({
  title,
  showBack,
  showEdit,
  showLogout,
  editSamePath = false,
  ...rest
}: IHeader) => {
  const router = useRouter();
  return (
    <div className="tk-bg-teal text-white flex justify-between items-center p-3">
      <div>
        {showBack && (
          <Icon
            handleClick={() =>
              router.push({
                pathname: router.pathname.substring(
                  0,
                  router.pathname.lastIndexOf("/") + 1
                ),
                query: router.query,
              })
            }
            name="arrow_back"
          />
        )}
        {showLogout && <Icon name="logout" handleClick={() => {
          signOut(); 
          router.push('');
        }} />}
      </div>
      <div className="text-white text-lg font-medium">{title}</div>
      <div>
        {showEdit && (
          <Icon
            handleClick={() => {
              if (editSamePath) {
                router.push({
                  pathname: router.pathname
                    .substring(0, router.pathname.lastIndexOf("/") + 1)
                    .concat("edit"),
                  query: router.query,
                });
              } else {
                router.push({
                  pathname: router.pathname.concat("/edit"),
                  query: router.query,
                });
              }
            }}
            name="edit"
          />
        )}
      </div>
    </div>
  );
};
