import React, { HTMLAttributes } from "react";
import { Icon } from "./icon";
import { NextRouter } from "next/router";

export interface IMenuListOption extends HTMLAttributes<HTMLElement> {
    handleClick?: () => any;
    displayText: string;
  }


export const MenuListOption = ({
    handleClick,
    displayText,
    ...rest
}: IMenuListOption) => {
    return (<div>
        <div
        onClick={handleClick}
        className="flex items-center justify-between cursor-pointer border border-r-0 border-l-0 border-b-0 p-3"
        >
            <div className="flex items-center">
                <span className="mr-1">{displayText}</span>
                {/* <Icon name="error_outline" small={true} /> */}
            </div>
            <Icon name="chevron_right" />
        </div>
        </div>
    );
  };