import { Feed } from 'feed';

import { config } from '$lib/constants';
import type { BlogPostLobbyProps } from '$lib/types';

import type { Author } from './sanity/schema';

export default function generateRSS(posts: BlogPostLobbyProps['allPosts']) {
  const feed = new Feed({
    author: {
      email: config.author.email,
      name: config.author.name,
    },
    copyright: `©${new Date().getFullYear()} ${config.author.name}`,
    description: config.description,
    generator: 'cktidy-rss',
    id: config.url,
    link: config.url,
    title: "ckt1031's personal site",
  });

  for (const post of posts) {
    const author = post.author as unknown as Author;

    const postUrl = config.url + '/blog' + `/${post.slug.current}`;

    feed.addItem({
      author: [
        {
          email: author.email,
          name: author.name,
        },
      ],
      copyright: `©${new Date().getFullYear()} ${config.author.name}`,
      date: new Date(post._createdAt),
      description: post.breif,
      id: postUrl,
      link: postUrl,
      title: post.title,
      ...(post.tags && {
        category: post.tags.map(tag => ({
          name: tag.name,
        })),
      }),
    });
  }

  return feed.rss2();
}
