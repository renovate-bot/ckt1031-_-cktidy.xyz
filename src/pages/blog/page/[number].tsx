import type { GetStaticProps } from 'next';
import type { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import BlogList from '$components/blog/lobby';
import { config } from '$lib/constants';
import sanityClient from '$lib/sanity/client';
import { allPostQuery } from '$lib/sanity/query';
import type { Post } from '$lib/sanity/schema';
import type { BlogPostLobbyProps } from '$lib/types';

export async function getStaticPaths() {
  const posts = await sanityClient.fetch<Post[] | undefined>(allPostQuery);

  if (!posts) {
    return { notFound: true };
  }

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

export const getStaticProps: GetStaticProps<BlogPostLobbyProps> = async ({ params }) => {
  if (!params || typeof params.number !== 'string') {
    return { notFound: true };
  }

  const pageNumber = Number(params.number);

  const allPosts = await sanityClient.fetch<BlogPostLobbyProps['allPosts']>(allPostQuery);

  const displayPosts = allPosts.slice(
    config.blog.maxDisplayPerPage * (pageNumber - 1),
    config.blog.maxDisplayPerPage * pageNumber,
  );

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(allPosts.length / config.blog.maxDisplayPerPage),
  };

  return {
    props: {
      allPosts,
      displayPosts,
      pagination,
    },
    revalidate: 60 * 60 * 3, // 3 hours
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
