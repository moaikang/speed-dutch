import { Html, Head, Main, NextScript } from 'next/document';

const SECRET_KEY = 'l7xx2561b933bc0b4e60b6913da310a04c19';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src={`https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=${SECRET_KEY}`} defer />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
