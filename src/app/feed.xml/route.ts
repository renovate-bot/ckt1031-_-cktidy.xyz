import { Feed } from 'feed';

import { config } from '$lib/constants';
import client from '$lib/sanity/client';
import { allPostQuery } from '$lib/sanity/query';
import type { Post } from '$lib/sanity/schema';
import { urlForImage } from '$lib/sanity/tools';

const getPosts = async () => {
  return (await client.fetch<Post[]>(allPostQuery)).sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    return dateA > new Date(b.publishedAt) ? -1 : 1;
  });
};

export async function GET() {
  const posts = await getPosts();

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

    const postUrl = config.url + '/posts/' + post.slug.current;

    feed.addItem({
      author: [
        {
          email: author.email,
          name: author.name,
        },
      ],
      copyright: `©${new Date().getFullYear()} ${config.author.name}`,
      date: new Date(post.publishedAt),
      description: post.breif,
      id: postUrl,
      link: postUrl,
      title: post.title,
      ...(post.thumbnail && {
        enclosure: {
          url: urlForImage(post.thumbnail).quality(25).url().replace('&fit=max&auto=format', ''),
        },
      }),
    });
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  });
}
