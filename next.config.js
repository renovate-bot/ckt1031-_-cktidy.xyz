const { withSentryConfig } = require('@sentry/nextjs');
const withRoutes = require('nextjs-routes/config')({
    outDir: 'types',
});

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
        value: 'interest-cohort=()',
    },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['cdn.sanity.io'],
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

module.exports = withRoutes(withSentryConfig(nextConfig, sentryOptions));
