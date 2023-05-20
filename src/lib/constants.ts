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
        href: { pathname: '/projects' },
        name: 'Projects',
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
  projects: [
    {
      github: 'https://github.com/ckt1031/cktidy.xyz',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      github: 'https://github.com/ckt1031/nodejs-config',
      tags: ['ESLint', 'Prettier', 'TypeScript', 'Node.js'],
    },
    {
      github: 'https://github.com/ckt1031/android-toolbox',
      tags: ['Android', 'Kotlin', 'Jetpack Compose'],
      wip: true,
    },
    {
      github: 'https://github.com/ckt1031/DraconianBot',
      tags: ['Discord.js', 'TypeScript', 'Node.js'],
    },
    {
      github: 'https://github.com/ckt1031/discord-captcha-site',
      tags: ['Discord.js', 'Express.js', 'TypeScript', 'Node.js'],
    },
    {
      github: 'https://github.com/ckt1031/nodejs-config',
      tags: ['TypeScript', 'Node.js', 'ESLint', 'Prettier'],
    },
    {
      github: 'https://github.com/ckt1031/cktidy.xyz-sanity',
      tags: ['Sanity'],
    },
    {
      github: 'https://github.com/ckt1031/revanced-build-script',
      tags: ['Python', 'ReVanced'],
    },
    {
      github: 'sentry-report',
      tags: ['Node.js', 'Sentry'],
    },
  ],
};
