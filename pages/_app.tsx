import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

import { AccessTokenAuth } from "src/utils/AccessTokenAuth";
import GlobalStyle from "styles/globals";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  AccessTokenAuth();

  return (
    <>
      <QueryClientProvider client={client}>
        <Head>
          <link rel="shortcut icon" href="/images/logo/logo.ico" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
