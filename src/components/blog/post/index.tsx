import { MDXRemote } from 'next-mdx-remote';

import Image from '$components/image';
import mdxComponents from '$components/mdx-components';
import { urlForImage } from '$lib/sanity/tools';
import type { BlogSinglePostProps } from '$lib/types';

export function BlogDisplayPage({ data, readingTime, content, dateName }: BlogSinglePostProps) {
  const tags = data.tags;

  const readingMinutes =
    readingTime.minutes >= 1 ? Math.round(readingTime.minutes) : 'Less than 1 ' + 'minutes';

  return (
    <article className="mt-5 w-full">
      <div className="mb-3 border-b border-gray-300 dark:border-gray-600">
        <div className="mb-2">
          <h1 className="text-2xl font-bold md:text-3xl">{data.title}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{dateName}</p>
          <p className="mt-1 italic text-slate-600 dark:text-slate-400">{readingMinutes}</p>
        </div>
        {data.thumbnail && (
          <div className="relative mb-3 h-[250px] w-full md:h-[450px]">
            <Image
              fill
              objectFit="contain"
              alt="Thumbnail"
              src={urlForImage(data.thumbnail).url()}
            />
          </div>
        )}
      </div>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className="prose mb-10 max-w-full dark:prose-dark">
        <MDXRemote {...content} components={{ ...mdxComponents }} />
      </div>
      {tags && tags.length > 0 && (
        <div className="mt-5 border-t border-gray-300 py-3 dark:border-gray-600">
          <p className="text-gray-700 dark:text-gray-400">Tags:</p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            {tags.map(tag => {
              return (
                <div key={tag.name}>
                  <p className="base-border rounded border bg-gray-200 py-1 px-2 dark:bg-gray-700">
                    #{tag.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="mb-10 border-t border-gray-300 dark:border-gray-600">
        <div className="mt-4 flex flex-row items-center gap-3">
          <Image
            alt=""
            className="rounded-full shadow-2xl"
            src={urlForImage(data.author.avatar).url()}
            width={35}
            height={35}
          />
          <p>{data.author.name}</p>
        </div>
      </div>
    </article>
  );
}
