/**
 * Run this file as script
 */

import fs from 'node:fs';

import dayjs from 'dayjs';
import { Feed } from 'feed';
import pc from 'picocolors';

import { config } from '$lib/constants';

import { allPosts } from '../../.contentlayer/generated/index.mjs';

const path = './public/feed.xml';

// Remove existing feed
if (fs.existsSync(path)) {
  fs.rmSync(path);
  console.log(pc.yellow('⚠️  Overriding existing RSS feed'));
}

const posts = allPosts.sort((a, b) => {
  const dateA = dayjs(new Date(a.date));
  return dateA.isAfter(new Date(b.date)) ? -1 : 1;
});

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

fs.writeFileSync(path, feed.rss2());

console.log(pc.green(`✅ Generated RSS feed: ${path}`));
