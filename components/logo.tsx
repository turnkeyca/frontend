import React, { HTMLAttributes } from "react";

export interface ILogo extends HTMLAttributes<HTMLElement> {
    src: string;
  }
  
  export const Logo = ({
      src,
    ...rest
  }: ILogo) => {
    return (
        <div>
        <div className="w-screen h-1/6"></div>
        <div className="container">
            <img className="w-7/12 mx-auto mb-10"
                src={src}
                alt="turnkey_logo">
            </img>
        </div>
    </div>
    );
  };