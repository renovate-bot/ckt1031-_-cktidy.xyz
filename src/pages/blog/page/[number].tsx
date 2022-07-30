import type { GetStaticProps } from 'next';

import BlogList, { BlogListProp } from '../../../components/layouts/blog-list';
import { DefaultMetaData } from '../../../components/seo';
import sanityClient from '../../../utils/sanity/client';
import { allPostQuery } from '../../../utils/sanity/query';
import { Post } from '../../../utils/sanity/schema';

export async function getStaticPaths() {
  const posts: Post[] = await sanityClient.fetch(allPostQuery);

  const totalPages = Math.ceil(posts.length / 10);

  return {
    paths:
      totalPages === 1
        ? []
        : Array.from({ length: totalPages }, (_, i) => ({
            params: { page: (i + 1).toString() },
          })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<BlogListProp> = async ({
  params,
}) => {
  if (!params || typeof params.number !== 'string') {
    return { notFound: true };
  }

  const pageNumber = Number.parseInt(params.number);

  const posts: Post[] = await sanityClient.fetch(allPostQuery);

  const displayPosts = posts.slice(10 * (pageNumber - 1), 10 * pageNumber);

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / 10),
  };

  return { props: { posts, displayPosts, pagination } };
};

export default function BlogHome(prop: BlogListProp) {
  return (
    <>
      <DefaultMetaData title="Blog" />
      <BlogList {...prop} />
    </>
  );
}
