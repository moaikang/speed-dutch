import type { AppProps } from "next/app";
import GlobalStyle from "../src/styles/GlobalStyle";
import Head from "next/head";
import AppProvider from "../src/components/AppProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>더치 | 더 편리한 위치 찾기</title>
      </Head>
      <GlobalStyle />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
