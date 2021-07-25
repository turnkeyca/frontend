import { useRouter } from "next/router";
import React, { HTMLAttributes } from "react";
import { Icon } from "./icon";

export interface IFooter extends HTMLAttributes<HTMLElement> {
  showProfile: boolean;
  showConnections: boolean;
}

export const Footer = ({ showProfile, showConnections, ...rest }: IFooter) => {
  const router = useRouter();
  return (
    <div className="w-full fixed bottom-0 bg-white border border-r-0 border-l-0 border-b-0 flex justify-around items-center">
      <div>
        {showProfile && (
          <div
            className="cursor-pointer tk-text-teal p-3 flex flex-col items-center justify-center"
            onClick={() =>
              router.push({
                pathname: "/renter",
                query: { userId: router.query.userId },
              })
            }
          >
            <Icon name="account_circle" />
            <span className="text-xs tracking-wide">Profile</span>
          </div>
        )}
      </div>
      <div>
        {showConnections && (
          <div
            className="cursor-pointer tk-text-teal flex flex-col items-center justify-center"
            onClick={() =>
              router.push({
                pathname: "/renter/activity",
                query: { userId: router.query.userId },
              })
            }
          >
            <Icon name="list" />
            <span className="text-xs tracking-wide">Activity</span>
          </div>
        )}
      </div>
    </div>
  );
};
