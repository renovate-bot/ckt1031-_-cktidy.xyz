import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';

import BlogList from '$components/posts/lobby';
import { config } from '$lib/constants';

export function generateStaticParams() {
  const posts = allPosts.sort((a, b) => {
    const dateA = dayjs(new Date(a.date));
    return dateA.isAfter(new Date(b.date)) ? -1 : 1;
  });

  const totalPagesNumber = Math.ceil(posts.length / config.blog.maxDisplayPerPage);

  return Array.from({ length: totalPagesNumber }, (_, i) => ({
    number: (i + 1).toString(),
  }));
}

const getPosts = (page: string) => {
  const pageNumber = Number(page);

  const posts = allPosts.sort((a, b) => {
    const dateA = dayjs(new Date(a.date));
    return dateA.isAfter(new Date(b.date)) ? -1 : 1;
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

export function generateMetadata({ params }: { params: { number: string } }) {
  const posts = getPosts(params.number);

  const hasPosts = posts.posts.length > 0;

  return {
    title: `Posts Page: ${params.number}`,
    description: hasPosts ? 'Posts for cktidy' : 'No posts found',
  };
}

export default function PostsPagination({ params }: { params: { number: string } }) {
  const prop = getPosts(params.number);

  return <BlogList {...prop} />;
}
