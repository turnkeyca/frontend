import React, { HTMLAttributes } from "react";

export interface IFooter extends HTMLAttributes<HTMLElement> {
  showConnections: boolean;
  showProfile: boolean;
  onConnections?: () => any;
  onProfile?: () => any;
}

export const Footer = ({
  children,
  showConnections,
  showProfile,
  onConnections,
  onProfile,
  ...rest
}: IFooter) => {
  return (
    <div>
      <div className="bg-white border border-x-0 border-b-0 flex justify-around items-center">
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
          {showConnections && (
            <div
              className="cursor-pointer tk-text-teal flex items-center justify-center"
              onClick={onConnections}
            >
              <i></i>
              <span className="text-xs tracking-wide">Connections</span>
            </div>
          )}
        </span>
      </div>
      {children}
    </div>
  );
};
