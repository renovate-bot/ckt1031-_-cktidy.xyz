import { useRouter } from 'next/router';

import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import readingTimeModule from 'reading-time';

import { BlogDisplayPage } from '$components/posts/post';
import { config } from '$lib/constants';
import type { BlogSinglePostProps } from '$lib/types';

export function getStaticPaths() {
  const paths = allPosts.map(post => post.url);

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<BlogSinglePostProps> = ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return { notFound: true };
  }

  const post = allPosts.find(post => post._raw.flattenedPath === params.slug);

  if (!post) {
    return { notFound: true };
  }

  const dateName = dayjs(post.date).format('YYYY/MM/DD hh:mm');
  const readingTime = readingTimeModule(post.body.raw);

  return {
    props: {
      post,
      dateName,
      readingTime,
    },
  };
};

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { post } = props;

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.summary}
        openGraph={{
          description: post.summary,
          title: post.title,
          images: [
            {
              url: post.thumbnail ?? '',
            },
          ],
          type: 'website',
          url: config.url + router.asPath,
        }}
        titleTemplate="%s"
      />
      <ArticleJsonLd
        url={config.url + router.asPath}
        title={post.title}
        images={[post.thumbnail ?? '']}
        description={post.summary}
        authorName={[
          {
            name: config.author.name,
          },
        ]}
        datePublished={post.date}
        publisherName={config.author.name}
      />
      <BlogDisplayPage {...props} />
    </>
  );
}
