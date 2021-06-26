import React, { HTMLAttributes } from "react";
import { Button } from "./button";

export interface IToggle extends HTMLAttributes<HTMLElement> {
  className?: string;
  labelTrue: string;
  labelFalse: string;
}

export const Toggle = ({
  className,
  labelTrue,
  labelFalse,
  ...rest
}: IToggle) => {
  return (
    <div className={"flex ".concat(className)}>
      <Button className="mr-1">
        <span>{labelTrue}</span>
      </Button>
      <Button variant="secondary">
        <span>{labelFalse}</span>
      </Button>
    </div>
  );
};
