import type { UrlObject } from 'node:url';

export const isDevelopment = process.env.NODE_ENV === 'development';

export const config = {
  author: {
    email: 'me@cktidy.xyz',
    name: 'cktsun',
    social: {
      discordServer: 'https://discord.gg/Y2ZnZc5Nnh',
      feed: '/feed.xml',
      github: 'https://github.com/ckt1031',
      instagram: 'https://www.instagram.com/ckt.1031/',
      twitter: 'https://twitter.com/@cktsun1031',
      youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
  },
  blog: {
    maxDisplayPerPage: 10,
  },
  description: `Welcome to ckt1031's cool website! Expect regular updates as I release exciting new content.
  I started this site in June 2022, so stay tuned for all the latest updates!`,
  footer: {
    routes: [
      {
        href: { pathname: '/about' },
        name: 'About Me',
      },
      {
        href: { pathname: '/technology' },
        name: 'Techs',
      },
    ] as {
      name: string;
      href: UrlObject;
    }[],
  },
  github_project_url: 'https://github.com/ckt1031/cktidy.xyz',
  headbar: {
    routes: [
      {
        href: { pathname: '/' },
        name: 'Home',
      },
      {
        href: { pathname: '/posts' },
        name: 'Posts',
      },
      {
        href: { pathname: '/about' },
        name: 'About',
      },
    ] as {
      name: string;
      href: UrlObject;
    }[],
  },
  name: 'cktidy',
  siteName: 'ckt',
  twitter: '@cktsun1031',
  url: 'https://cktidy.xyz',
};
