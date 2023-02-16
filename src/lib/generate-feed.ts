import type { Post } from 'contentlayer/generated';
import { Feed } from 'feed';

import { config } from '$lib/constants';

export default function generateRSS(posts: Post[]) {
  const feed = new Feed({
    author: {
      email: config.author.email,
      name: config.author.name,
    },
    copyright: `©${new Date().getFullYear()} ${config.author.name}`,
    description: config.description,
    generator: 'Cktidy RSS Generator',
    id: config.url,
    link: config.url,
    title: "ckt1031's personal site",
  });

  for (const post of posts) {
    const author = config.author;

    const postUrl = config.url + post.url;

    feed.addItem({
      author: [
        {
          email: author.email,
          name: author.name,
        },
      ],
      copyright: `©${new Date().getFullYear()} ${config.author.name}`,
      date: new Date(post.date),
      description: post.summary,
      id: postUrl,
      link: postUrl,
      title: post.title,
    });
  }

  return feed.rss2();
}
