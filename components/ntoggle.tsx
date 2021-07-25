import React, { HTMLAttributes } from "react";
import { Button } from "./button";

export interface INToggle extends HTMLAttributes<HTMLElement> {
  className?: string;
  labels?: Map<string, string>;
}

export const NToggle = ({ className, labels, ...rest }: INToggle) => {
  let buttons = [];
  labels.forEach(
    (variant: "primary" | "secondary" | "tertiary", label: string) => {
      buttons.push(
        <Button key={label} variant={variant} className="mr-1">
          <div className="flex">
            <span>{label}</span>
          </div>
        </Button>
      );
    }
  );
  return <div className={"flex ".concat(className)}>{buttons}</div>;
};
