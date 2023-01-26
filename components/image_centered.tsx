import React, { HTMLAttributes } from "react";
import Image from 'next/image'

export interface ICenteredImage extends HTMLAttributes<HTMLElement> {
    src: string;
    className?: string;
    alt?: string;
  }
  
  export const CenteredImage = ({
      src,
      className,
      alt,
    ...rest
  }: ICenteredImage) => {
    return (
        <div className={"relative container ".concat(className)}>
            <Image className={"mx-auto"}
                src={src}
                alt={alt}
                layout='fill'
                objectFit='contain'
                >
            </Image>
        </div>
    );
  };