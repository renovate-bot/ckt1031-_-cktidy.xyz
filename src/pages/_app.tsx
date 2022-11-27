import '$styles/default.css';
import '$lib/analytics';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';

import { THEME_KEY } from '$data/constants';
import ApplicationLayout from '$layouts/application';
import seoConfig from '$lib/seo-config';

export default function NextApplcation({ Component, pageProps }: AppProps) {
    return (
        <>
            <DefaultSeo {...seoConfig} />
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>
            <ThemeProvider enableSystem attribute="class" storageKey={THEME_KEY}>
                <NextNProgress color="#eb7236" height={2} options={{ showSpinner: false }} />
                <ApplicationLayout>
                    <Component {...pageProps} />
                </ApplicationLayout>
            </ThemeProvider>
        </>
    );
}
