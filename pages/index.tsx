import React from "react";
import Login from "./login";

export default function Home() {
  return (
    <html>
      <title>Turnkey</title>
      <meta charSet={"utf-8"} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <Login />
    </html>
  );
}
