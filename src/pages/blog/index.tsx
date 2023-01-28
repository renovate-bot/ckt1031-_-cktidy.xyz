import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import BlogList from '$components/blog/lobby';
import { config } from '$lib/constants';
import sanityClient from '$lib/sanity/client';
import { allPostQuery } from '$lib/sanity/query';
import type { BlogPostLobbyProps } from '$lib/types';

export const getStaticProps: GetStaticProps<BlogPostLobbyProps> = async () => {
  const allPosts = await sanityClient.fetch<BlogPostLobbyProps['allPosts']>(allPostQuery);

  const displayPosts = allPosts.slice(0, config.blog.maxDisplayPerPage);

  const pagination = {
    currentPage: 1,
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
      <NextSeo title="Blog" description="Latest post published from cktsun!" />
      <BlogList {...prop} />
    </>
  );
}
