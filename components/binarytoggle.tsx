import React, { ChangeEvent, HTMLAttributes, useState } from "react";

export interface IToggle extends HTMLAttributes<HTMLInputElement> {
  labelTrue: string;
  labelFalse: string;
  handleChange?: ($event: ToggleEvent) => any;
  name?: string;
  value?: boolean;
}

export interface ToggleEvent extends ChangeEvent<HTMLInputElement> {
  target: ToggleTarget;
}

export interface ToggleTarget extends HTMLInputElement {
  name: string;
  value: string;
}

const TRUE_CLASSES_TRUE = "tk-bg-teal text-white";
const TRUE_CLASSES_FALSE = "bg-white tk-text-teal";
const FALSE_CLASSES_TRUE = "bg-white tk-text-amber";
const FALSE_CLASSES_FALSE = "tk-bg-amber text-white";

export const Toggle = ({
  className,
  labelTrue,
  labelFalse,
  handleChange,
  name,
  value,
  ...rest
}: IToggle) => {
  let [_value, setState] = useState(value);
  const toggleValue = (incomingValue: boolean) => {
    if (_value) {
      setState(!incomingValue);
      value = !incomingValue;
      handleChange({
        target: { name, value: `${value}` } as ToggleTarget,
      } as ToggleEvent);
    } else {
      setState(incomingValue);
      value = incomingValue;
      handleChange({
        target: { name, value: `${value}` } as ToggleTarget,
      } as ToggleEvent);
    }
  };
  return (
    <div className={"flex w-full ".concat(className)}>
      <div
        id="true"
        onClick={() => toggleValue(true)}
        className={"flex justify-center items-center w-full cursor-pointer border tk-border-teal rounded p-3 mr-1 ".concat(
          _value ? TRUE_CLASSES_TRUE : TRUE_CLASSES_FALSE
        )}
      >
        <span className="tracking-wide font-medium text-sm">{labelTrue}</span>
      </div>
      <div
        id="false"
        onClick={() => toggleValue(true)}
        className={"flex justify-center items-center w-full cursor-pointer border tk-border-amber rounded p-3 ".concat(
          _value ? FALSE_CLASSES_TRUE : FALSE_CLASSES_FALSE
        )}
      >
        <span className="tracking-wide font-medium text-sm">{labelFalse}</span>
      </div>
    </div>
  );
};
