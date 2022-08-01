import '../styles/addon.css';
import '../styles/default.css';
import '../utils/firebase/sdk';
import '../utils/analytics';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import { ErrorDemostrationPage } from '../components/error';
import ApplicationLayout from '../components/layouts/application';
import Lightbox from '../components/lightbox';
import seoConfig from '../utils/seo-config';

export default function NextApplcation({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorDemostrationPage}>
      <DefaultSeo {...seoConfig} />
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <RecoilRoot>
        <ThemeProvider enableSystem attribute="class">
          <ToastContainer
            position="top-center"
            autoClose={7500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <NextNProgress
            color="#eb7236"
            height={2}
            options={{
              showSpinner: false,
            }}
          />
          <ApplicationLayout>
            <Lightbox />
            <Component {...pageProps} />
          </ApplicationLayout>
        </ThemeProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
}
