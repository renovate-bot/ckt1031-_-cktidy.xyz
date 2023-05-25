import type { Metadata } from 'next/types';

import { config } from '$lib/constants';
import client from '$lib/sanity/client';
import { allPostQuery } from '$lib/sanity/query';
import type { Post } from '$lib/sanity/schema';

import PostListContent from './content';

const getPosts = async () => {
  const posts = (await client.fetch<Post[]>(allPostQuery)).sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    return dateA > new Date(b.publishedAt) ? -1 : 1;
  });

  const displayPosts = posts.slice(0, config.blog.maxDisplayPerPage);

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / config.blog.maxDisplayPerPage),
  };

  return {
    posts,
    displayPosts,
    pagination,
  };
};

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest post published from ckt1031!',
};

export default async function PostsPage() {
  const prop = await getPosts();

  return (
    <section>
      <PostListContent {...prop} />
    </section>
  );
}
