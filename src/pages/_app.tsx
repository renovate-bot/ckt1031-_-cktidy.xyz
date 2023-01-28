import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Inter, Noto_Sans_HK, Noto_Sans_SC } from '@next/font/google';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider, useTheme } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';

import '$styles/default.css';
import ApplicationLayout from '$components/layouts/default';
import { THEME_KEY } from '$lib/constants';
import seoConfig from '$lib/seo-config';

// Google Fonts
const interMono = Inter({
  subsets: ['latin'],
  variable: '--inter',
});
const notoHK = Noto_Sans_HK({
  subsets: ['latin'],
  variable: '--noto-hk',
  weight: ['400', '500', '700'],
});
const notoSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--noto-sc',
  weight: ['400', '500', '700'],
});

function SeoComponent() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <DefaultSeo {...seoConfig} themeColor={resolvedTheme === 'dark' ? '#171717' : '#F5F5F5'} />
    </>
  );
}

function NextApplcation({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <ThemeProvider enableSystem attribute="class" storageKey={THEME_KEY}>
        <SeoComponent />
        <NextNProgress color="#eb7236" height={2} options={{ showSpinner: false }} />
        <div className={`${interMono.variable} ${notoHK.variable} ${notoSC.variable} font-sans`}>
          <ApplicationLayout>
            <Component {...pageProps} />
          </ApplicationLayout>
        </div>
      </ThemeProvider>
    </>
  );
}

export default NextApplcation;
