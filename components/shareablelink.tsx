import React, { HTMLAttributes } from "react";
import { Button } from "./button";

export interface IShareableLink extends HTMLAttributes<HTMLElement> {
  className?: string;
}

export const ShareableLink = ({ className, ...rest }: IShareableLink) => {
  return <Button className={" ".concat(className)}>Get shareable link</Button>;
};
