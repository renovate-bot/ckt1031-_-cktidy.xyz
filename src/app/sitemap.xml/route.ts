import type { ISitemapField } from 'next-sitemap';
import { getServerSideSitemap } from 'next-sitemap';

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

  const fields: ISitemapField[] = [
    {
      loc: config.url,
      lastmod: new Date().toISOString(),
    },
    {
      loc: config.url + '/posts',
      lastmod: new Date().toISOString(),
    },
    {
      loc: config.url + '/about',
      lastmod: new Date().toISOString(),
    },
    {
      loc: config.url + '/projects',
      lastmod: new Date().toISOString(),
    },
    {
      loc: config.url + '/technology',
      lastmod: new Date().toISOString(),
    },
  ];

  for (const post of posts) {
    const data: ISitemapField = {
      loc: config.url + '/posts/' + post.slug.current,
      lastmod: new Date(post.publishedAt).toISOString(),
      images: [],
    };

    if (post.thumbnail && Array.isArray(data.images)) {
      data.images.push({
        loc: new URL(
          urlForImage(post.thumbnail).quality(25).url().replace('&fit=max&auto=format', ''),
        ),
        caption: post.title,
        title: post.title,
      });
    }
    fields.push(data);
  }

  return getServerSideSitemap(fields);
}
