import { Inter, Noto_Sans_TC } from '@next/font/google';
import { ServerThemeProvider } from '@wits/next-themes';
import clsx from 'clsx';
import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: {
    default: "ckt's House",
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
};

export default function ApplicationLayout({ children }: PropsWithChildren) {
  return (
    <ServerThemeProvider enableSystem attribute="data-theme">
      <html lang="en" className={clsx(inter.variable, notoSansTC.variable)}>
        <body className={clsx('root', 'flex h-screen flex-col justify-between overflow-x-hidden')}>
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
