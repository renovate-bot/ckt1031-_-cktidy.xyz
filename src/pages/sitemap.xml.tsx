import type { GetServerSideProps } from 'next';
import type { ISitemapField } from 'next-sitemap';
import { getServerSideSitemap } from 'next-sitemap';

import sanityClient from '$lib/sanity/client';
import { allPostQuery } from '$lib/sanity/query';
import type { BlogPostLobbyProps } from '$lib/types';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const allPosts = await sanityClient.fetch<BlogPostLobbyProps['allPosts']>(allPostQuery);

  let fields: ISitemapField[] = [
    {
      lastmod: new Date().toISOString(),
      loc: '/',
    },
    {
      lastmod: new Date().toISOString(),
      loc: '/about',
    },
    {
      lastmod: new Date().toISOString(),
      loc: '/blog',
    },
    {
      lastmod: new Date().toISOString(),
      loc: '/settings',
    },
    {
      lastmod: new Date().toISOString(),
      loc: '/technology',
    },
    ...allPosts.map(post => ({
      lastmod: new Date(post._updatedAt).toISOString(),
      loc: `/blog/${post.slug.current}`,
    })),
  ];

  // Add all the fields to the sitemap
  fields = fields.map(field => {
    field.changefreq = 'daily';
    field.priority = 0.7;
    field.loc = `https://cktidy.xyz${field.loc}`;
    return field;
  });

  ctx.res.setHeader('Content-Type', 'text/xml');
  ctx.res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {
  return null;
}
