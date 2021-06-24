import React, { forwardRef, HTMLAttributes } from "react";
import { Icon } from "./icon";
import { useRouter } from "next/router";

export interface IHeader extends HTMLAttributes<HTMLElement> {
  title: string;
  showBack: boolean;
  showEdit: boolean;
  showLogout: boolean;
}

function logout(): void {
  console.log("logged out");
}

export const Header = ({
  title,
  showBack,
  showEdit,
  showLogout,
  ...rest
}: IHeader) => {
  const router = useRouter();
  return (
    <div className="tk-bg-teal text-white flex justify-between items-center px-2 py-4">
      <div>
        {showBack && (
          <Icon
            handleClick={() =>
              router.push(
                router.pathname.substring(
                  0,
                  router.pathname.lastIndexOf("/") + 1
                )
              )
            }
            name="arrow_back"
          />
        )}
        {showLogout && <Icon name="logout" handleClick={logout} />}
      </div>
      <div className="text-white font-medium">{title}</div>
      <div>
        {showEdit && (
          <Icon
            handleClick={() => router.push(router.pathname + "/edit")}
            name="edit"
          />
        )}
      </div>
    </div>
  );
};
