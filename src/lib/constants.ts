export const isDevelopment = process.env.NODE_ENV === 'development';

export const THEME_KEY = 'THEME_NAME';

export const DISABLE_SNOWFALL_EFFECT_KEY = 'DISABLE_SNOWFALL_EFFECT';

export const config = {
  author: {
    email: 'me@cktidy.xyz',
    name: 'cktsun',
    social: {
      discordServer: 'https://discord.gg/Y2ZnZc5Nnh',
      feed: '/feed.xml',
      github: 'https://github.com/cktsun1031',
      instagram: 'https://www.instagram.com/ckt.1031/',
      twitter: 'https://twitter.com/@cktsun1031',
      youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
  },
  blog: {
    maxDisplayPerPage: 10,
  },
  description: `A cool website by cktsun1031!
    I will be releasing cool stuff here! Stay tuned!
    Started this website since June 2022, and I will be updating it frequently!`,
  footer: {
    routes: [
      {
        href: '/about',
        name: 'About Me',
      },
      {
        href: '/technology',
        name: 'Techs',
      },
    ],
  },
  github_project_url: 'https://github.com/cktsun1031/cktidy.xyz',
  headbar: {
    routes: [
      {
        href: '/',
        name: 'Home',
      },
      {
        href: '/blog',
        name: 'Blog',
      },
      {
        href: '/about',
        name: 'About',
      },
    ],
  },
  name: 'cktidy',
  siteName: 'ckt',
  twitter: '@cktsun1031',
  url: 'https://cktidy.xyz',
};
