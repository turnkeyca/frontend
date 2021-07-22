import React from "react";
import { TextInput } from "../components";

export default function Login() {
  return (
    <div className="grid grid-cols-1 gap-1">
      <input type="text" className={TextInput} />
      <input type="text" className={TextInput} />
    </div>
  );
}
