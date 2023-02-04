/* eslint-disable @typescript-eslint/require-await */
const { withSentryConfig } = require('@sentry/nextjs');
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
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
  eslint: {
    // Disable linting because we have checked via GitHub Actions, no further check needed
    ignoreDuringBuilds: !!process.env.CI,
  },
  async headers() {
    return [
      {
        headers: securityHeaders,
        source: '/(.*)',
      },
    ];
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  reactStrictMode: true,
  async rewrites() {
    // Disable source maps in production
    if (isProduction) {
      return [
        {
          destination: '/404',
          source: '/:path*.map',
        },
      ];
    }

    return [];
  },
  sentry: {
    // Wrap for apis
    autoInstrumentServerFunctions: true,

    hideSourceMaps: true,
  },
};

const sentryOptions = {
  silent: true,
};

module.exports = withRoutes(withSentryConfig(nextConfig, sentryOptions));
