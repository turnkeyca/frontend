import React from "react";
import { useRouter } from "next/router";
import { Button } from "../components";

export default function Index() {
  const router = useRouter();
  return (
    <div className="tk-bg-teal place-items-center h-screen w-screen">
      <p className="text-center tk-text-blue text-medium p-8">Simplifying the rental application process</p>
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