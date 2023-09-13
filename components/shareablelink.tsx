import React, { HTMLAttributes } from "react";
import { Button } from "./button";
import { NextRouter } from "next/router";

export interface IShareableLink extends HTMLAttributes<HTMLElement> {
  className?: string;
  router: NextRouter;
}

export const ShareableLink = ({ 
  className, 
  router,
  ...rest 
}: IShareableLink) => {
  return <Button 
  className={" ".concat(className)} 
  handleClick={() =>
    router.push({
      pathname: "/renter/shareprofile",
      query: router.query,
    })
  }>Share Profile</Button>;
};
