import type { GetStaticProps } from 'next';

import { BlogDisplayPage } from '../../components/layouts/blog-article';
import { parseMdx } from '../../utils/mdx';
import sanityClient from '../../utils/sanity/client';
import {
  authorQueryByRef,
  postSingleQuery,
  postSlugQuery,
} from '../../utils/sanity/query';
import { Author, Post } from '../../utils/sanity/schema';

async function getAuthor(ref: string) {
  return await sanityClient.fetch(authorQueryByRef, {
    ref,
  });
}

export async function getStaticPaths() {
  const paths: string[] = await sanityClient.fetch(postSlugQuery);

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }

  // Fetch Blog Article's actual detials and content
  const post = await sanityClient.fetch(postSingleQuery, {
    slug: params.slug,
  });
  console.log(post);

  if (!post) {
    return { notFound: true };
  }

  // Generate parsed mdx content
  const mdxSource = await parseMdx(post.body);

  return {
    props: {
      post: post as Post,
      author: await getAuthor(post.author._ref),
      content: mdxSource,
    },
  };
};

interface BlogProp {
  post: Post;
  author: Author;
  content: Post['body'];
}

export default function Blog({ author, post, content }: BlogProp) {
  return <BlogDisplayPage author={author} post={post} content={content} />;
}
