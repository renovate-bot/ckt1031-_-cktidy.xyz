import { Inter, Noto_Sans_SC, Noto_Sans_TC } from 'next/font/google';
import type { Metadata } from 'next/types';

import { ServerThemeProvider } from '@wits/next-themes';
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import './globals.css';
import Footer from '$components/global/footer';
import Header from '$components/global/header';
import { config } from '$lib/constants';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

const notoSansSC = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: {
    default: "Cktsun's Site",
    template: '%s - Cktidy',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    shortcut: '/favicon.ico',
    icon: '/favicon.ico',
  },
  alternates: {
    types: { 'application/rss+xml': `${config.url}/feed.xml` },
  },
  manifest: `${config.url}/site.webmanifest`,
  twitter: {
    title: 'cktidy',
    card: 'summary_large_image',
  },
  openGraph: {
    title: config.name,
    description: config.description,
    url: config.url,
    siteName: config.siteName,
    locale: 'en-US',
    type: 'website',
  },
};

export default function ApplicationLayout({ children }: PropsWithChildren) {
  return (
    <ServerThemeProvider enableSystem attribute="data-theme">
      <html lang="en" className={clsx(inter.variable, notoSansTC.variable, notoSansSC.variable)}>
        <body className="root">
          <Header />
          <main className="m-auto flex w-full max-w-[800px] flex-1 flex-col items-center px-5">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ServerThemeProvider>
  );
}
