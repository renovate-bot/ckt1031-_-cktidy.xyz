import type { GetServerSideProps } from 'next';

import generateRSSFeed from '$lib/generate-feed';
import sanityClient from '$lib/sanity/client';
import { allPostQuery } from '$lib/sanity/query';
import type { BlogPostLobbyProps } from '$lib/types';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const allPosts = await sanityClient.fetch<BlogPostLobbyProps['allPosts']>(allPostQuery);

  const feedFile = generateRSSFeed(allPosts);

  res.write(feedFile);
  res.end();

  return {
    props: {},
  };
};

export default function RSSFeed() {
  return null;
}
