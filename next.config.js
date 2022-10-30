import { withSentryConfig } from '@sentry/nextjs';
import withRoutes from 'nextjs-routes/config';

const isProduction = process.env.NODE_ENV === 'production';

const securityHeaders = [
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
    },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        domains: ['cdn.sanity.io'],
    },
    env: {
        SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID ?? '',
        FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID ?? '',
    },
    compiler: {
        removeConsole: isProduction,
        reactRemoveProperties: isProduction,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
    sentry: {
        hideSourceMaps: true,
    },
    rewrites: async () => {
        if (isProduction) {
            return {
                beforeFiles: [
                    {
                        source: '/:path*.map',
                        destination: '/404',
                    },
                ],
            };
        }

        return [];
    },
};

const sentryOptions = {
    silent: true,
};

export default withRoutes()(
    isProduction ? withSentryConfig(nextConfig, sentryOptions) : nextConfig,
);
