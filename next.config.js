/* eslint-disable @typescript-eslint/require-await */
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
    images: {
        domains: ['cdn.sanity.io'],
    },
    env: {
        SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID ?? '',
    },
    eslint: {
        // Disable linting because we have checked via GitHub Actions, no further check is needed
        ignoreDuringBuilds: !!process.env.CI,
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
        // Wrap for apis
        autoInstrumentServerFunctions: true,
    },
    async rewrites() {
        // Disable source maps in production
        if (isProduction) {
            return [
                {
                    source: '/:path*.map',
                    destination: '/404',
                },
            ];
        }

        return [];
    },
};

const sentryOptions = {
    silent: true,
};

export default withRoutes()(withSentryConfig(nextConfig, sentryOptions));
