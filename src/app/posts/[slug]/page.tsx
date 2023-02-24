import { notFound } from 'next/navigation';

import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';
import { useMDXComponent } from 'next-contentlayer/hooks';
import readingTimeModule from 'reading-time';

import Image from '$components/image';
import mdxComponents from '$components/mdx-components';
import { config } from '$lib/constants';

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
  const { post } = getPost(params.slug);

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: 'article',
      url: `${config.url}${post.url}`,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  };
}

export default function PostArticlePage({ params }: { params: { slug: string } }) {
  const { post, readingTime, dateName } = getPost(params.slug);

  const readingMinutes =
    readingTime.minutes >= 1 ? Math.round(readingTime.minutes) : 'Less than 1 ' + 'minutes';

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <section>
      <article className="mt-5 w-full">
        <div className="mb-3 border-b border-gray-300 dark:border-gray-600">
          <div className="mb-2">
            <h1 className="text-2xl font-bold md:text-3xl">{post.title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{dateName}</p>
            <p className="mt-1 italic text-slate-600 dark:text-slate-400">{readingMinutes}</p>
          </div>
          {post.thumbnail && (
            <div className="relative mb-3 h-[250px] w-full md:h-[450px]">
              <Image fill object-fit="contain" alt="Thumbnail" src={post.thumbnail} />
            </div>
          )}
        </div>
        <div className="prose prose-neutral mb-10 max-w-full dark:prose-dark">
          <MDXContent components={{ ...mdxComponents }} />
        </div>
      </article>
    </section>
  );
}
