import React, { HTMLAttributes } from "react";
import { Button } from "./button";

export interface IShareableLink extends HTMLAttributes<HTMLElement> {
  className?: string;
  handleClick?: () => any;
}

export const ShareableLink = ({ 
  className, 
  handleClick,
  ...rest 
}: IShareableLink) => {
  return <Button className={" ".concat(className)} onClick={handleClick}>Get shareable link</Button>;
};
