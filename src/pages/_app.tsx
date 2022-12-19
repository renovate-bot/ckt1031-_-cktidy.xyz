import '$styles/default.css';

import { Noto_Sans_HK, Noto_Sans_SC, Spline_Sans_Mono } from '@next/font/google';
import clsx from 'clsx';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import { useState } from 'react';
import Snowfall from 'react-snowfall';

import { THEME_KEY } from '$data/constants';
import ApplicationLayout from '$layouts/application';
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

export default function NextApplcation({ Component, pageProps }: AppProps) {
    const [currentDate] = useState(new Date());

    return (
        <>
            <DefaultSeo {...seoConfig} />
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>
            {/* Disable Snowfall after 2023/01/15 */}
            {currentDate < new Date('2023/01/15') && <Snowfall />}
            <ThemeProvider enableSystem attribute="class" storageKey={THEME_KEY}>
                <NextNProgress color="#eb7236" height={2} options={{ showSpinner: false }} />
                <ApplicationLayout
                    className={clsx(
                        `${splineSansMono.variable} ${notoHK.variable} ${notoSC.variable} font-sans`,
                    )}>
                    <Component {...pageProps} />
                </ApplicationLayout>
            </ThemeProvider>
        </>
    );
}
