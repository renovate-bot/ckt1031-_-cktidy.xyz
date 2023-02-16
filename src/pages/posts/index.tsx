import fs from 'node:fs';

import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import BlogList from '$components/posts/lobby';
import { config } from '$lib/constants';
import generateRSS from '$lib/generate-feed';
import type { BlogPostLobbyProps } from '$lib/types';

export const getStaticProps: GetStaticProps<BlogPostLobbyProps> = () => {
  const posts = allPosts.sort((a, b) => {
    const dateA = dayjs(new Date(a.date));
    return dateA.isAfter(new Date(b.date)) ? -1 : 1;
  });

  const displayPosts = posts.slice(0, config.blog.maxDisplayPerPage);

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / config.blog.maxDisplayPerPage),
  };

  // Feeds generation
  const feed = generateRSS(posts);

  // Write the feed to the public folder
  fs.writeFileSync('./public/feed.xml', feed);

  return {
    props: {
      posts,
      displayPosts,
      pagination,
    },
  };
};

export default function Page(prop: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo title="Blog" description="Latest post published from cktsun!" />
      <BlogList {...prop} />
    </>
  );
}
