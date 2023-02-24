import { useMDXComponent } from 'next-contentlayer/hooks';

import Image from '$components/image';
import mdxComponents from '$components/mdx-components';
import type { BlogSinglePostProps } from '$lib/types';

export function PostDisplayingPage({ post, readingTime, dateName }: BlogSinglePostProps) {
  const readingMinutes =
    readingTime.minutes >= 1 ? Math.round(readingTime.minutes) : 'Less than 1 ' + 'minutes';

  const MDXContent = useMDXComponent(post.body.code);

  return (
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
  );
}
