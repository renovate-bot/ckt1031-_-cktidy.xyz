import { notFound } from 'next/navigation';

import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';
import readingTimeModule from 'reading-time';

import { BlogDisplayPage } from '$components/posts/post';

export function generateStaticParams() {
  return allPosts.map(post => ({
    slug: post._raw.flattenedPath,
  }));
}

const getPost = (slug: string) => {
  const post = allPosts.find(post => post._raw.flattenedPath === slug);

  if (!post) {
    return notFound();
  }

  const dateName = dayjs(post.date).format('YYYY/MM/DD hh:mm');
  const readingTime = readingTimeModule(post.body.raw);

  return {
    post,
    dateName,
    readingTime,
  };
};

export function generateMetadata({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  const { post } = getPost(params.slug);

  return {
    title: post.title,
    description: post.summary,
  };
}

export default function PostArticlePage({ params }: { params: { slug: string } }) {
  const props = getPost(params.slug);

  return <BlogDisplayPage {...props} />;
}
