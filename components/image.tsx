import React, { HTMLAttributes } from "react";

export interface IPicture extends HTMLAttributes<HTMLImageElement> {
  src: string;
}

export const Picture = ({ src, ...rest }: IPicture) => {
  return (
    <div className="rounded-full h-36 w-36 flex items-center justify-center">
      <img src={src} />
    </div>
  );
};
