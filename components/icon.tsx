import { HTMLAttributes } from "react";

export interface IIcon extends HTMLAttributes<HTMLElement> {
  name: string;
}
export const Icon = ({ name, ...rest }: IIcon) => {
  return <i className="fa"></i>;
};
