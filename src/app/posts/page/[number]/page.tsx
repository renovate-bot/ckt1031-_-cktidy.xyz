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

const gettPosts = (params: string) => {
  const pageNumber = Number(params);

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

export default function PostsPagination({ params }: { params: { number: string } }) {
  const prop = gettPosts(params.number);

  return <BlogList {...prop} />;
}
