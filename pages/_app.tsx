import type { AppProps } from 'next/app';
import GlobalStyle from '../src/styles/GlobalStyle';
import Head from 'next/head';
import AppProvider from '../src/components/AppProvider';
import Layout from '../src/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>더치 | 더 편리한 위치 찾기</title>
      </Head>
      <GlobalStyle />
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}
