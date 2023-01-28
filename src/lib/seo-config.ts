import type { DefaultSeoProps } from 'next-seo';

import { config } from '$lib/constants';
import { isDevelopment } from '$lib/constants';

const seoConfig: DefaultSeoProps = {
  dangerouslySetAllPagesToNoFollow: isDevelopment,
  dangerouslySetAllPagesToNoIndex: isDevelopment,
  openGraph: {
    siteName: config.siteName,
    type: 'website',
  },
  titleTemplate: '%s - cktidy',
  twitter: {
    cardType: 'summary_large_image',
    site: config.twitter,
  },
};

export default seoConfig;
