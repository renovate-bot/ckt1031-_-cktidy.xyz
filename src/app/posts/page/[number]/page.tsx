import { notFound } from 'next/navigation';

import { config } from '$lib/constants';
import client from '$lib/sanity/client';
import { allPostQuery } from '$lib/sanity/query';
import type { Post } from '$lib/sanity/schema';

import BlogList from '../../content';

export async function generateStaticParams() {
  const posts = (await client.fetch<Post[]>(allPostQuery)).sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    return dateA > new Date(b.publishedAt) ? -1 : 1;
  });

  const totalPagesNumber = Math.ceil(posts.length / config.blog.maxDisplayPerPage);

  return Array.from({ length: totalPagesNumber }, (_, i) => ({
    number: (i + 1).toString(),
  }));
}

const getPosts = async (page: string) => {
  const pageNumber = Number(page);

  const posts = (await client.fetch<Post[]>(allPostQuery)).sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    return dateA > new Date(b.publishedAt) ? -1 : 1;
  });

  const displayPosts = posts.slice(
    config.blog.maxDisplayPerPage * (pageNumber - 1),
    config.blog.maxDisplayPerPage * pageNumber,
  );

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / config.blog.maxDisplayPerPage),
  };

  return {
    posts,
    displayPosts,
    pagination,
  };
};

export async function generateMetadata({ params }: { params: { number: string } }) {
  const posts = await getPosts(params.number);

  const hasPosts = posts.posts.length > 0;

  return {
    title: `Posts Page: ${params.number}`,
    description: hasPosts ? 'Posts for cktidy' : 'No posts found',
  };
}

export default async function PostsPagination({ params }: { params: { number: string } }) {
  const prop = await getPosts(params.number);

  if (prop.displayPosts.length === 0) {
    notFound();
  }

  return <BlogList {...prop} />;
}
