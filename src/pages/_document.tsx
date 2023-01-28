import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class AppDocument extends Document {
  override render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/favicon.ico" rel="icon" />
          <link href="/favicon.ico" rel="shortcut icon" />
          <link href="/icons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/icons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </Head>
        <body className="root">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
