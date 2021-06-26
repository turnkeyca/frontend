import React, { HTMLAttributes, useState } from "react";

export interface IToggle extends HTMLAttributes<HTMLElement> {
  className?: string;
  labelTrue: string;
  labelFalse: string;
  initialValue?: boolean;
}

let TRUE_CLASSES_TRUE = "tk-bg-teal text-white";
let TRUE_CLASSES_FALSE = "bg-white tk-text-teal";
let FALSE_CLASSES_TRUE = "bg-white tk-text-amber";
let FALSE_CLASSES_FALSE = "tk-bg-amber text-white";

export const Toggle = ({
  className,
  labelTrue,
  labelFalse,
  initialValue,
  ...rest
}: IToggle) => {
  let [value, setState] = useState(initialValue ? initialValue : false);
  const toggleValue = (incomingValue: boolean) => {
    if (value) {
      if (incomingValue) {
        setState(false);
      } else {
        setState(true);
      }
    } else {
      if (incomingValue) {
        setState(true);
      } else {
        setState(false);
      }
    }
  };
  return (
    <div className={"flex w-full ".concat(className)}>
      <div
        id="true"
        onClick={() => toggleValue(true)}
        className={"flex justify-center items-center w-full cursor-pointer border tk-border-teal rounded p-3 mr-1 ".concat(
          value ? TRUE_CLASSES_TRUE : TRUE_CLASSES_FALSE
        )}
      >
        <span className="tracking-wide font-medium text-sm">{labelTrue}</span>
      </div>
      <div
        id="false"
        onClick={() => toggleValue(true)}
        className={"flex justify-center items-center w-full cursor-pointer border tk-border-amber rounded p-3 ".concat(
          value ? FALSE_CLASSES_TRUE : FALSE_CLASSES_FALSE
        )}
      >
        <span className="tracking-wide font-medium text-sm">{labelFalse}</span>
      </div>
    </div>
  );
};
