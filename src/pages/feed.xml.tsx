import type { GetServerSideProps } from 'next';

import generateRSSFeed from '$lib/generate-feed';
import sanityClient from '$lib/sanity/client';
import { allPostQuery } from '$lib/sanity/query';
import type { BlogPostLobbyProps } from '$lib/types';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const allPosts = await sanityClient.fetch<BlogPostLobbyProps['allPosts']>(allPostQuery);

  const feedFile = generateRSSFeed(allPosts);

  // Cache the feed for 5 minutes
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
  // encode the response as UTF-8
  res.setHeader('Content-Type', 'text/xml; charset=utf-8');

  res.write(feedFile);
  res.end();

  return {
    props: {},
  };
};

export default function RSSFeed() {
  return null;
}
