// @ts-check
const withPlugins = require('next-compose-plugins');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEstags: false,
  reactStrictMode: false,
  poweredByHeader: false,
  compress: isProduction,
  swcMinify: isProduction,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
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
};

module.exports = withPlugins([], nextConfig);
