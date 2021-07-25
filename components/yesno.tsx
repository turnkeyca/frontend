import React, { HTMLAttributes } from "react";

export interface IYesNo extends HTMLAttributes<HTMLElement> {
  value: boolean;
}

export const YesNo = ({ value, ...rest }: IYesNo) => {
  return (
    <div className="tk-text-blue">
      {value && <span>Yes</span>}
      {!value && <span>No</span>}
    </div>
  );
};
