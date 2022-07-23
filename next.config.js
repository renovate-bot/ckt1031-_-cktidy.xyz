// @ts-check
const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const ContentSecurityPolicy = `
  style-src 'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com;
  font-src 'self' fonts.googleapis.com fonts.gstatic.com;  
`;

const securityHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=10368000, immutable',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
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
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  generateEstags: false,
  reactStrictMode: false,
  poweredByHeader: false,
  compress: isProduction,
  swcMinify: isProduction,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    legacyBrowsers: false,
    forceSwcTransforms: true,
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY ?? '',
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN ?? '',
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL ?? '',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ?? '',
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET ?? '',
    FIREBASE_MESSAGING_SENDER_ID:
      process.env.FIREBASE_MESSAGING_SENDER_ID ?? '',
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID ?? '',
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID ?? '',
  },
  eslint: {
    dirs: ['src'],
  },
  compiler: {
    removeConsole: isProduction,
    styledComponents: isProduction,
    reactRemoveProperties: isProduction,
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (!dev) {
      config.plugins.push(new CompressionPlugin());
      config.optimization.minimizer = [];
      config.optimization.minimizer.push(
        new TerserPlugin(),
        new JsonMinimizerPlugin(),
        new HtmlMinimizerPlugin(),
        new CssMinimizerPlugin(),
      );
    }

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

const pwaOptions = {
  pwa: {
    scope: '/app',
    dest: 'public',
    register: true,
    disable: !isProduction,
  },
};

module.exports = withPlugins([[withPWA, pwaOptions]], nextConfig);
