export const isDevelopment = process.env.NODE_ENV === 'development';

export const THEME_KEY = 'THEME_NAME';

export const DISABLE_SNOWFALL_EFFECT_KEY = 'DISABLE_SNOWFALL_EFFECT';

export const config = {
    name: 'cktidy',
    siteName: 'ckt',
    url: 'https://cktidy.xyz',
    description: `A cool website by cktsun1031!
    I will be releasing cool stuff here! Stay tuned!
    Started this website since June 2022, and I will be updating it frequently!`,
    author: {
        name: 'cktsun',
        email: 'me@cktidy.xyz',
        social: {
            instagram: 'https://www.instagram.com/ckt.1031/',
            github: 'https://github.com/cktsun1031',
            youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            twitter: 'https://twitter.com/@cktsun1031',
            discordServer: 'https://discord.gg/Y2ZnZc5Nnh',
            feed: '/feed.xml',
        },
    },
    twitter: '@cktsun1031',
    blog: {
        maxDisplayPerPage: 10,
    },
    headbar: {
        routes: [
            {
                name: 'Home',
                href: '/',
            },
            {
                name: 'Blog',
                href: '/blog',
            },
            {
                name: 'About',
                href: '/about',
            },
        ],
    },
    footer: {
        routes: [
            {
                name: 'About Me',
                href: '/about',
            },
            {
                name: 'Techs',
                href: '/technology',
            },
            {
                name: 'Settings',
                href: '/settings',
            },
        ],
    },
    github_project_url: 'https://github.com/cktsun1031/cktidy.xyz',
};
