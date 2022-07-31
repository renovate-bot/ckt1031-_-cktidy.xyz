import { MDXRemote } from 'next-mdx-remote';
import { Suspense } from 'react';
import type { ReadTimeResults } from 'reading-time';

import { Author, Post } from '../../utils/sanity/schema';
import { urlForImage } from '../../utils/sanity/tools';
import Image from '../image';
import mdxComponents from '../mdx-components';
import { DefaultMetaData } from '../seo';

export interface BlogProp {
  post: Post;
  author?: Author;
  dateName: string;
  readingTime: ReadTimeResults;
  content: Post['body'];
}

export function BlogDisplayPage({
  author,
  post,
  readingTime,
  content,
  dateName,
}: BlogProp) {
  const readingMinutes =
    readingTime.minutes >= 1
      ? `${Math.round(readingTime.minutes)}`
      : 'Less than 1 ' + 'minutes';

  return (
    <>
      <DefaultMetaData title={post.title} />
      <Suspense fallback={<></>}>
        <article>
          <div className="mb-3 border-b border-gray-300 dark:border-gray-600">
            <div className="mb-2">
              <h1 className="text-4xl md:text-5xl">{post.title}</h1>
              <div className="mt-2 flex flex-row items-center space-x-2 md:text-xl">
                {author && (
                  <>
                    <div className="flex flex-row items-center space-x-3 text-xl">
                      <Image
                        alt="Thumbnail"
                        className="rounded-full shadow-2xl"
                        src={urlForImage(author.avatar).url()}
                        blurEnabled={false}
                        width={35}
                        height={35}
                      />
                      <span>{author.name}</span>
                    </div>
                    <span className="text-gray-500">-</span>
                  </>
                )}
                <span className="italic text-gray-600 dark:text-gray-400">
                  {dateName}
                </span>
              </div>
              <div>
                <p className="italic text-slate-600 dark:text-slate-400">
                  {readingMinutes}
                </p>
              </div>
            </div>
          </div>
          {post.thumbnail && (
            <div className="mb-3 flex w-full justify-center">
              <Image
                alt="Thumbnail"
                className="rounded-lg"
                lightboxEnabled
                src={urlForImage(post.thumbnail).url()}
                width={1600 * 0.4}
                height={900 * 0.4}
              />
            </div>
          )}
          <div className="blog-article-container">
            <MDXRemote {...content} components={{ ...mdxComponents }} />
          </div>
        </article>
      </Suspense>
    </>
  );
}
