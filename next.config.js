/* eslint-disable @typescript-eslint/require-await */
import { withSentryConfig } from '@sentry/nextjs';
import isCI from 'is-ci';

/** @type {import('next/types').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable linting because we have checked via GitHub Actions, no further check needed
    ignoreDuringBuilds: isCI,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  transpilePackages: ['@tabler/icons-react'],
  reactStrictMode: true,
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

export default withSentryConfig(nextConfig, sentryOptions);
