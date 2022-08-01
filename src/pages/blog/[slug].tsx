import dayjs from 'dayjs';
import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import readingTimeModule from 'reading-time';

import {
  BlogDisplayPage,
  BlogProp,
} from '../../components/layouts/blog-article';
import { parseMdx } from '../../utils/mdx';
import sanityClient from '../../utils/sanity/client';
import { postSingleQuery, postSlugQuery } from '../../utils/sanity/query';
import { Post } from '../../utils/sanity/schema';
import { urlForImage } from '../../utils/sanity/tools';

export async function getStaticPaths() {
  const paths: string[] = await sanityClient.fetch(postSlugQuery);

  return {
    paths: paths.map((slug: string) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return { notFound: true };
  }

  const post: Post = await sanityClient.fetch(postSingleQuery, {
    slug: params.slug,
  });

  if (!post) {
    return { notFound: true };
  }

  const content = await parseMdx(post.body as unknown as string);
  const dateName = dayjs(post._createdAt).format('YYYY/MM/DD hh:mm');
  const readingTime = readingTimeModule(post.body as unknown as string);

  return {
    props: { readingTime, post, content, dateName },
  };
};

export default function Blog(props: BlogProp) {
  const ogImage = props.post.thumbnail
    ? [
        {
          url: urlForImage(props.post.thumbnail).url(),
          width: props.post.thumbnail.hotspot?.width,
          height: props.post.thumbnail.hotspot?.height,
          alt: props.post.title,
        },
      ]
    : [];

  return (
    <>
      <NextSeo
        title={props.post.title}
        description={props.post.breif}
        openGraph={{
          type: 'website',
          title: props.post.title,
          description: props.post.breif,
          images: ogImage,
        }}
        titleTemplate="%s"
      />
      <BlogDisplayPage {...props} />
    </>
  );
}
