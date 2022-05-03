import React, { HTMLAttributes } from "react";

export interface ITextField extends HTMLAttributes<HTMLInputElement> {
    type?: "text" | "email" | "password";
}

export const TextField = ({
    children,
    type = "text",
    ...rest
}:ITextField) => {
    return (
          <input type={type} className="tk-border-blue border-2 rounded-xl p-2 w-full"></input>
      )
}