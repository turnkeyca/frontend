import React, { HTMLAttributes } from "react";

export interface IYesNo extends HTMLAttributes<HTMLElement> {
  val: boolean;
}

export const YesNo = ({ val, ...rest }: IYesNo) => {
  return (
    <div className="tk-text-blue">
      {val && <span>Yes</span>}
      {!val && <span>No</span>}
    </div>
  );
};
