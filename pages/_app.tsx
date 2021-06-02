import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
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
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <Component className="font-sans" {...pageProps} />
    </div>
  );
}
