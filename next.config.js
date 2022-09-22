const withPWA = require('next-pwa');
const { withRoutes } = require('nextjs-routes/next-config.cjs');

const isProduction = process.env.NODE_ENV === 'production';

const securityHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=10368000, immutable',
  },
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
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: isProduction,
  swcMinify: isProduction,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
  images: {
    domains: ['i.creativecommons.org', 'cdn.sanity.io'],
  },
  env: {
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID ?? '',
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID ?? '',
  },
  eslint: {
    dirs: ['src'],
  },
  compiler: {
    removeConsole: isProduction,
    styledComponents: isProduction,
    reactRemoveProperties: isProduction,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

const options = isProduction
  ? withPWA({
      ...nextConfig,
      pwa: {
        scope: '/app',
        dest: 'public',
        register: isProduction,
        disable: !isProduction,
      },
    })
  : nextConfig;

module.exports = withRoutes(options);
