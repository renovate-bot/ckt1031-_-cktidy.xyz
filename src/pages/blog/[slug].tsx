import dayjs from 'dayjs';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import type { OpenGraphMedia } from 'next-seo/lib/types';
import readingTimeModule from 'reading-time';

import {
  BlogDisplayPage,
  BlogProp,
} from '../../components/layouts/blog-article';
import ScrollProgressBar from '../../components/scroll-progress-bar';
import config from '../../data/config.json';
import { parseMdx } from '../../utils/mdx';
import sanityClient from '../../utils/sanity/client';
import { postSingleQuery, postSlugQuery } from '../../utils/sanity/query';
import { Author, Post } from '../../utils/sanity/schema';
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
  const router = useRouter();

  const post = props.post;
  const author = post.author as unknown as Author;
  const thumbnail = props.post.thumbnail;

  const articleImages: string[] = [];
  const ogImage: OpenGraphMedia[] = [];

  if (thumbnail) {
    const thumbUrl = urlForImage(thumbnail).url();

    ogImage.push({
      url: thumbUrl,
      width: thumbnail.hotspot?.width,
      height: thumbnail.hotspot?.height,
      alt: props.post.title,
    });

    articleImages.push(thumbUrl);
  }

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.breif}
        openGraph={{
          type: 'website',
          url: config.url + router.asPath,
          title: post.title,
          description: post.breif,
          images: ogImage,
        }}
        titleTemplate="%s"
      />
      <ArticleJsonLd
        url={config.url + router.asPath}
        images={articleImages}
        title={post.title}
        description={post.breif}
        authorName={[
          {
            name: author.name,
          },
        ]}
        dateModified={post._updatedAt}
        datePublished={post._createdAt}
        publisherName={author.name}
        publisherLogo={urlForImage(author.avatar).url()}
      />
      <ScrollProgressBar />
      <BlogDisplayPage {...props} />
    </>
  );
}
