/* eslint-disable @typescript-eslint/require-await */
import { withSentryConfig } from '@sentry/nextjs';
import isCI from 'is-ci';
import { withContentlayer } from 'next-contentlayer';

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

/** @type {import('next/types').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable linting because we have checked via GitHub Actions, no further check needed
    ignoreDuringBuilds: !isCI,
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
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  transpilePackages: ['@tabler/icons-react'],
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
  modularizeImports: {
    '@tabler/icons-react': {
      transform: '@tabler/icons-react/dist/esm/icons/{{member}}',
    },
  },
  webpack: config => {
    config.infrastructureLogging = {
      level: 'error',
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
};

const sentryOptions = {
  silent: true,
};

export default withContentlayer(withSentryConfig(nextConfig, sentryOptions));
