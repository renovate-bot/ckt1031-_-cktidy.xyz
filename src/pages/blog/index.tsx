import type { InferGetStaticPropsType } from 'next';

import BlogList from '../../components/layouts/blog-list';
import { DefaultMetaData } from '../../components/seo';
import config from '../../data/config.json';
import sanityClient from '../../utils/sanity/client';
import { allPostQuery } from '../../utils/sanity/query';
import { Post } from '../../utils/sanity/schema';

export async function getStaticProps() {
  const posts: Post[] = await sanityClient.fetch(allPostQuery);

  const displayPosts = posts.slice(0, config.blog.maxDisplayPerPage);

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / config.blog.maxDisplayPerPage),
  };

  return { props: { posts, displayPosts, pagination } };
}

export default function BlogHome(
  prop: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <>
      <DefaultMetaData title="Blog" />
      <BlogList {...prop} />
    </>
  );
}
