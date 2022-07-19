import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class AppDocument extends Document {
  override render() {
    return (
      <Html lang="en">
        <Head>
          <link
            // eslint-disable-next-line no-secrets/no-secrets
            href="https://fonts.googleapis.com/css2?family=Londrina+Solid&display=swap"
            rel="stylesheet"
          />
          <link
            // eslint-disable-next-line no-secrets/no-secrets
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&display=swap"
            rel="stylesheet"
          />
          <link href="/icons/favicon.ico" rel="icon" />
          <link href="/icons/favicon.ico" rel="shortcut icon" />
          <link
            href="/icons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/icons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
        </Head>
        <body className="root">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
