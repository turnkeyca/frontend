import React from "react";
import { useRouter } from "next/router";
import { Button } from "../components";

export default function Index() {
  const router = useRouter();
  console.log()
  return (
    <div className="tk-bg-teal flex flex-col h-screen w-screen">
      <div className="w-screen h-1/6"></div>
      <div className="container">
        <img className="w-11/12 mx-auto"
          src="../assets/images/Turnkey_logo_reverse.png"
          alt="turnkey_logo">
        </img>
      </div>

      <p className="text-center tk-text-blue text-medium p-8">Simplifying the rental application process</p>
      <div className="w-screen h-1/6"></div>
      <div className="flex flex-col gap-5 px-16">
        <Button variant="secondary" handleClick={() =>
          router.push({
            pathname: "/signup"
          })}>
          Sign up
        </Button>
        <Button variant="tertiary" handleClick={() =>
          router.push({
            pathname: "/login"
          })}>
          Log In
        </Button>
      </div>
    </div>)
}