import { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "./" })
        .then((reg) => {
          console.log("Registration succeeded. Scope is " + reg.scope);
        })
        .catch((error) => {
          console.log("Registration failed with " + error);
        });
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Turnkey</title>
        <meta charSet="utf-8" />
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
      </Head>
      <Component className="font-sans" {...pageProps} />
    </div>
  );
}
