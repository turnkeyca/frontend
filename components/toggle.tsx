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
      <Button className="mr-2">{labelTrue}</Button>
      <Button variant="secondary">{labelFalse}</Button>
    </div>
  );
};
