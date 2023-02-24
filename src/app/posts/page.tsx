import type { Metadata } from 'next/types';

import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';

import BlogList from '$components/posts/lobby';
import { config } from '$lib/constants';

const getPosts = () => {
  const posts = allPosts.sort((a, b) => {
    const dateA = dayjs(new Date(a.date));
    return dateA.isAfter(new Date(b.date)) ? -1 : 1;
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

export default function PostsPage() {
  const prop = getPosts();

  return (
    <section>
      <BlogList {...prop} />
    </section>
  );
}
