import React, { HTMLAttributes } from "react";
import CSS from 'csstype';
import { NextRouter } from "next/router";

export interface IWalkProgress extends HTMLAttributes<HTMLElement> {
  progress: string;
}

export const WalkProgress = ({
    progress,
    ...rest
  }: IWalkProgress) => {    
    const barBackStyles: CSS.Properties = {
        backgroundColor: 'rgba(224, 224, 224, 100)',
        position: 'absolute',
        right: 0,
        height: '6px',
        width: '100%',
    }
    
    const barFrontStyles: CSS.Properties = {
        backgroundColor: 'rgba(254, 178, 73 ,100)',
        position: 'absolute',
        left: 0,
        height: '6px',
        width: progress,
    }

    return (
        <div>
          <div className="bar-back" style={barBackStyles}></div>
          <div className="bar-front" style={barFrontStyles}></div>
        </div>
    );
};