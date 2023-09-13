import React, { HTMLAttributes } from "react";
import LottieView from 'react-lottie';
import * as pulseAnimationData from "../public/assets/lotties/pulse-selector.json";
import * as notificationAnimationData from "../public/assets/lotties/mobile_notification.json";

export interface IPulseLottie extends HTMLAttributes<HTMLElement> {
    left: number;
    top: number;
    width: number;
    height: number;
    customStyle?: object;
    animationSrc?: any;
}

export const Lottie = ({
    left,
    top,
    width,
    height,
    customStyle,
    animationSrc,
    ...rest
}: IPulseLottie) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationSrc,
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
            style={customStyle}
            />
        </div>
    );
};

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
        rendererSettings: {
            preserveAspectRation: "xMidYMid slice",
        }
    };
    
    return (
        <Lottie 
        left={left} 
        top={top} 
        width={width} 
        height={height} 
        animationSrc={pulseAnimationData} 
        customStyle={{
            position: "absolute",
            left: left,
            top: top
        }}/>
    );
};

export const MobileNotificationLottie = ({
    left,
    top,
    width,
    height,
    ...rest
}: IPulseLottie) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRation: "xMidYMid slice",
        }
    };
    
    return (
        <Lottie 
        left={left} 
        top={top} 
        width={width} 
        height={height} 
        animationSrc={notificationAnimationData} 
        customStyle={{
            // position: "relative",
            left: left,
            top: top
        }}/>
    );
};