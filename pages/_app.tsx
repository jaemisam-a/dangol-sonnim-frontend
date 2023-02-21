import type { AppProps } from "next/app";
import Head from "next/head";

import GlobalStyle from "styles/globals";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/logo/logo.ico" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
