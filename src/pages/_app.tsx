import '$styles/default.css';

import { Noto_Sans_HK, Noto_Sans_SC, Spline_Sans_Mono } from '@next/font/google';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider, useTheme } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';

import ApplicationLayout from '$layouts/application';
import { THEME_KEY } from '$lib/constants';
import seoConfig from '$lib/seo-config';

// Google Fonts
const splineSansMono = Spline_Sans_Mono({
    subsets: ['latin'],
    variable: '--spline-sans-mono',
});
const notoHK = Noto_Sans_HK({
    variable: '--noto-hk',
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});
const notoSC = Noto_Sans_SC({
    variable: '--noto-sc',
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

function SeoComponent() {
    const { resolvedTheme } = useTheme();

    return (
        <>
            <DefaultSeo
                {...seoConfig}
                themeColor={resolvedTheme === 'dark' ? '#171717' : '#F5F5F5'}
            />
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
                <div
                    className={`${splineSansMono.variable} ${notoHK.variable} ${notoSC.variable} font-sans`}>
                    <ApplicationLayout>
                        <Component {...pageProps} />
                    </ApplicationLayout>
                </div>
            </ThemeProvider>
        </>
    );
}

export default NextApplcation;
