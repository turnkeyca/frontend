import React, { HTMLAttributes } from "react";

export interface ICenteredImage extends HTMLAttributes<HTMLElement> {
    src: string;
    className?: string;
    alt?: string;
  }
  
  export const CenterdImage = ({
      src,
      className,
      alt,
    ...rest
  }: ICenteredImage) => {
    return (
        <div>
        <div className="w-screen h-1/6"></div>
        <div className="container">
            <img className={"mx-auto ".concat(className)}
                src={src}
                alt={alt}>
            </img>
        </div>
    </div>
    );
  };