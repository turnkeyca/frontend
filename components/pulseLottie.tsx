import React, { HTMLAttributes } from "react";
import LottieView from 'react-lottie';
import * as animationData from "../public/assets/lotties/pulse-selector.json";

export interface IPulseLottie extends HTMLAttributes<HTMLElement> {
    left: number;
    top: number;
    width: number;
    height: number;
}

export const PulseLottie = ({
    left,
    top,
    width,
    height,
    ...rest
}: IPulseLottie) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRation: "xMidYMid slice",
        }
    };
    
    return (
        <div>
            <LottieView 
            options={defaultOptions} 
            height={height}
            width={width}
            style={{
                position: "absolute",
                left: left,
                top: top
            }}
            />
        </div>
    );
};