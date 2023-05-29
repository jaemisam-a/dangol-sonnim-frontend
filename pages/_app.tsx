import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";

import { AccessTokenAuth } from "src/utils/accessTokenAuth";
import GlobalStyle from "styles/globals";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  AccessTokenAuth();

  return (
    <>
      <QueryClientProvider client={client}>
        <Script src="https://code.jquery.com/jquery-1.12.4.min.js"></Script>
        <Head>
          <link rel="shortcut icon" href="/images/logo/logo.ico" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
