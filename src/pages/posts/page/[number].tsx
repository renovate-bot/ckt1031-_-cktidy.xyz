import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';
import type { GetStaticProps } from 'next';
import type { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import BlogList from '$components/posts/lobby';
import { config } from '$lib/constants';
import type { BlogPostLobbyProps } from '$lib/types';

export function getStaticPaths() {
  const posts = allPosts.sort((a, b) => {
    const dateA = dayjs(new Date(a.date));
    return dateA.isAfter(new Date(b.date)) ? -1 : 1;
  });

  const totalPagesNumber = Math.ceil(posts.length / config.blog.maxDisplayPerPage);

  return {
    fallback: false,
    paths: Array.from({ length: totalPagesNumber }, (_, i) => ({
      params: {
        number: (i + 1).toString(),
      },
    })),
  };
}

export const getStaticProps: GetStaticProps<BlogPostLobbyProps> = ({ params }) => {
  if (!params || typeof params.number !== 'string') {
    return { notFound: true };
  }

  const pageNumber = Number(params.number);

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
      <NextSeo title={`Blog Page: ${prop.pagination.currentPage}`} />
      <BlogList {...prop} />
    </>
  );
}
