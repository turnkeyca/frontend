import React, { HTMLAttributes } from "react";

export interface IFooter extends HTMLAttributes<HTMLElement> {
  showShareMyProfile: boolean;
  showProfile: boolean;
  onShareMyProfile?: () => any;
  onProfile?: () => any;
}

export const Footer = ({
  showShareMyProfile,
  showProfile,
  onShareMyProfile,
  onProfile,
  ...rest
}: IFooter) => {
  return (
    <div className="w-full absolute bottom-0 bg-white border border-x-0 border-b-0 flex justify-around items-center">
      <span>
        {showProfile && (
          <div
            className="cursor-pointer tk-text-teal p-4 flex items-center justify-center"
            onClick={onProfile}
          >
            <i></i>
            <span className="text-xs tracking-wide">Profile</span>
          </div>
        )}
      </span>
      <span>
        {showShareMyProfile && (
          <div
            className="cursor-pointer tk-text-teal flex items-center justify-center"
            onClick={onShareMyProfile}
          >
            <i></i>
            <span className="text-xs tracking-wide">Share my profile</span>
          </div>
        )}
      </span>
    </div>
  );
};
