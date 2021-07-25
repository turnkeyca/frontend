import React, { HTMLAttributes } from "react";
import Image from "next/image";

export interface IPicture extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const loader = ({ src, ...rest }) => {
  return `${process.env.IMAGE_URL}/find?src=${src}`;
};

export const Picture = ({ src, alt, ...rest }: IPicture) => {
  return (
    <div className="rounded-full h-36 w-36 flex items-center justify-center">
      <Image loader={loader} src={src} alt={alt} layout="fill" />
    </div>
  );
};
