import type { DefaultSeoProps } from 'next-seo';

import { config } from '$lib/constants';
import { isDev } from '$lib/constants';

const seoConfig: DefaultSeoProps = {
    titleTemplate: '%s - cktidy',
    openGraph: {
        type: 'website',
        siteName: config.sitename,
    },
    twitter: {
        site: config.twitter,
        cardType: 'summary_large_image',
    },
    dangerouslySetAllPagesToNoFollow: isDev,
    dangerouslySetAllPagesToNoIndex: isDev,
};

export default seoConfig;
