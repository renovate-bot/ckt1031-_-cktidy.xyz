import type { DefaultSeoProps } from 'next-seo';

import { config } from '$lib/constants';
import { isDevelopment } from '$lib/constants';

const seoConfig: DefaultSeoProps = {
    titleTemplate: '%s - cktidy',
    openGraph: {
        type: 'website',
        siteName: config.siteName,
    },
    twitter: {
        site: config.twitter,
        cardType: 'summary_large_image',
    },
    dangerouslySetAllPagesToNoFollow: isDevelopment,
    dangerouslySetAllPagesToNoIndex: isDevelopment,
};

export default seoConfig;
