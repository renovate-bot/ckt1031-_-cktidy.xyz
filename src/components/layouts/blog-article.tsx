import dayjs from 'dayjs';
import { MDXRemote } from 'next-mdx-remote';
import { Suspense } from 'react';

import { Author, Post } from '../../utils/sanity/schema';
import { urlForImage } from '../../utils/sanity/tools';
import Image from '../image';
import { DefaultMetaData } from '../seo';

interface BlogProp {
  post: Post;
  author: Author;
  content: Post['body'];
}

export function BlogDisplayPage({ author, post, content }: BlogProp) {
  const dateName = dayjs(post._createdAt).format('YYYY/MM/DD hh:mm');

  return (
    <>
      <DefaultMetaData title={post.title} />
      <Suspense fallback={undefined}>
        <article>
          <div className="mb-3 border-b border-gray-300 dark:border-gray-600">
            <div className="mb-2">
              <h1 className="text-3xl md:text-5xl">{post.title}</h1>
              <div className="mt-2 flex flex-row items-center space-x-2 md:text-xl">
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
                <span className="italic text-gray-600 dark:text-gray-400">
                  {dateName}
                </span>
              </div>
            </div>
          </div>
          {post.thumbnail && (
            <div className="mb-3 flex w-full justify-center">
              <Image
                alt="Thumbnail"
                className="rounded"
                lightboxEnabled
                src={urlForImage(post.thumbnail).url()}
                width={1600 * 0.4}
                height={900 * 0.4}
              />
            </div>
          )}
          <div className="blog-article-container">
            <MDXRemote {...content} />
          </div>
        </article>
      </Suspense>
    </>
  );
}
