import React, { HTMLAttributes } from "react";
import { YesNo } from "./yesno";

export interface IFloatingDialogue extends HTMLAttributes<HTMLElement> {}
  
  export const FloatingDialogue = ({
    children,
    ...rest
  }: IFloatingDialogue) => {
    return (
      <div className="mx-2 mt-52 p-2 w-fill h-fit border tk-border-grey shadow-2xl rounded-md grid gap-3 place-items-center">
          {children}
      </div>
    );
  };