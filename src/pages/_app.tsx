import '../utils/firebase/sdk';
import '../styles/default.css';
import '../styles/addon.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';

import { ErrorDemostrationPage } from '../components/error';
import ApplicationLayout from '../components/layouts/application';

export default function NextApplcation({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorDemostrationPage}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <RecoilRoot>
        <ThemeProvider enableSystem attribute="class">
          <Toaster />
          <NextNProgress
            color="#eb7236"
            height={2}
            options={{
              showSpinner: false,
            }}
          />
          <ApplicationLayout>
            <Component {...pageProps} />
          </ApplicationLayout>
        </ThemeProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
}
