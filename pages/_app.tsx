import { Provider } from "next-auth/client"
import Head from "next/head";

export default function App ({ Component, pageProps }) {
  return (
    <>
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
      <Provider
        options={{
          clientMaxAge: 0,
          keepAlive: 0
        }}
        session={pageProps.session} >
        <Component {...pageProps} />
      </Provider>
    </>
  )
}