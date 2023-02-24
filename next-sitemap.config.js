/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.PRODUCTION_URL ?? 'localhost:4072',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/404', '/500', '/api/*'] }],
  },
};

export default config;
