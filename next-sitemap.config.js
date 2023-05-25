import { env } from './src/env.mjs';

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: env.PRODUCTION_URL,
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/404', '/500', '/api/*'] }],
  },
};

export default config;
