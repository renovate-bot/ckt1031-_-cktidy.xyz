import { notFound } from 'next/navigation';

import dayjs from 'dayjs';
import readingTimeModule from 'reading-time';

import Image from '$components/image';
import { config } from '$lib/constants';
import { parseMdx } from '$lib/mdx';
import client from '$lib/sanity/client';
import { allPostSlugsQuery, postSingleQuery } from '$lib/sanity/query';
import type { Post } from '$lib/sanity/schema';
import { urlForImage } from '$lib/sanity/tools';

import PostTagComponent from './tags';

export async function generateStaticParams() {
  const paths: string[] = await client.fetch<string[]>(allPostSlugsQuery);

  return paths.map(slug => ({ slug }));
}

const getPost = async (slug: string) => {
  const post = await client.fetch<Post | undefined>(postSingleQuery, { slug });

  if (!post) return notFound();

  const dateName = dayjs(post.publishedAt).format('YYYY/MM/DD hh:mm');
  const readingTime = readingTimeModule(post.body);

  const { content } = await parseMdx(post.body);

  return {
    post,
    content,
    dateName,
    readingTime,
  };
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { post } = await getPost(params.slug);

  return {
    title: post.title,
    description: post.breif,
    openGraph: {
      type: 'article',
      url: `${config.url}/posts/${params.slug}`,
      title: post.title,
      description: post.breif,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.breif,
    },
  };
}

export default async function PostArticlePage({ params }: { params: { slug: string } }) {
  const { content, post, readingTime, dateName } = await getPost(params.slug);

  const readingMinutes =
    readingTime.minutes >= 1 ? Math.round(readingTime.minutes) : 'Less than 1 ' + 'minutes';

  return (
    <section>
      <article className="mb-20 mt-5 w-full">
        <div className="mb-3 min-w-max border-b border-gray-300 dark:border-gray-600">
          <div className="mb-2">
            <h1 className="text-2xl font-bold md:text-3xl">{post.title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{dateName}</p>
            <p className="mt-1 italic text-slate-600 dark:text-slate-400">{readingMinutes}</p>
          </div>
          {post.thumbnail && (
            <div className="relative mb-3 h-[250px] md:h-[450px]">
              <Image
                fill
                enableLightBox
                alt="Thumbnail"
                className="absolute h-full w-full object-cover"
                src={urlForImage(post.thumbnail).url()}
              />
            </div>
          )}
        </div>
        <div className="prose prose-neutral max-w-full dark:prose-dark">{content}</div>
        <PostTagComponent tags={post.tags} />
      </article>
    </section>
  );
}
