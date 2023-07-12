import React, { HTMLAttributes } from "react";

export interface ITextField extends HTMLAttributes<HTMLInputElement> {
    type?: "text" | "email" | "password";
    value?: "";
}

export const TextField = ({
    children,
    type = "text",
    value = "",
    ...rest
}:ITextField) => {
    return (
          <input type={type} className="tk-border-blue border-2 rounded-xl p-2 w-full" value={value}></input>
      )
}