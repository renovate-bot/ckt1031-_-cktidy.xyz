import { writeFileSync } from 'node:fs';

import { Feed } from 'feed';

import config from '../data/config.json';
import { Author, Post } from './sanity/schema';

export default function generateRSS(posts: Post[]) {
    const feed = new Feed({
        title: config.sitename,
        description: config.description,
        id: config.url,
        link: config.url,
        copyright: `${new Date().getFullYear()} ${config.author.name}`,
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
        });
    }

    writeFileSync('./public/feed.xml', feed.rss2());
}
