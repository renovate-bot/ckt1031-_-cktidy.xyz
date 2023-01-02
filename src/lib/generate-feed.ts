import { writeFileSync } from 'node:fs';

import { Feed } from 'feed';

import { config } from '$lib/constants';
import { BlogPostLobbyProps } from '$lib/types';

import { Author } from './sanity/schema';

export default function generateRSS(posts: BlogPostLobbyProps['allPosts']) {
    const feed = new Feed({
        title: `ckt1031's personal site`,
        description: config.description,
        id: config.url,
        link: config.url,
        copyright: `©${new Date().getFullYear()} ${config.author.name}`,
        generator: 'cktidy-rss',
        author: {
            name: config.author.name,
            email: config.author.email,
        },
    });

    for (const post of posts) {
        const author = post.author as unknown as Author;

        const postUrl = config.url + '/blog' + `/${post.slug.current}`;

        feed.addItem({
            title: post.title,
            id: postUrl,
            link: postUrl,
            description: post.breif,
            author: [
                {
                    name: author.name,
                    email: author.email,
                },
            ],
            date: new Date(post._createdAt),
            copyright: `©${new Date().getFullYear()} ${config.author.name}`,
            ...(post.tags && {
                category: post.tags.map(tag => ({
                    name: tag.name,
                })),
            }),
        });
    }

    writeFileSync('./public/feed.xml', feed.rss2());
}
