import { MDXRemote } from 'next-mdx-remote';
import type { ReadTimeResults } from 'reading-time';

import Image from '$components/image';
import mdxComponents from '$components/mdx-components';
import { Author, Post, Tag } from '$lib/sanity/schema';
import { urlForImage } from '$lib/sanity/tools';

interface BlogPropExtend {
    author: Author;
    tags?: Tag[];
}

export interface BlogProp {
    post: Omit<Post, keyof BlogPropExtend> & BlogPropExtend;
    dateName: string;
    readingTime: ReadTimeResults;
    content: Post['body'];
}

export function BlogDisplayPage({ post, readingTime, content, dateName }: BlogProp) {
    const author = post.author;
    const tags = post.tags;

    const readingMinutes =
        readingTime.minutes >= 1 ? Math.round(readingTime.minutes) : 'Less than 1 ' + 'minutes';

    return (
        <article>
            <div className="mb-3 border-b border-gray-300 dark:border-gray-600">
                <div className="mb-2">
                    <h1 className="text-2xl font-bold md:text-3xl">{post.title}</h1>
                    <p className="mt-2 italic text-gray-600 dark:text-gray-400">
                        Published at: {dateName}
                    </p>
                    <p className="mt-1 italic text-slate-600 dark:text-slate-400">
                        {readingMinutes}
                    </p>
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
            <div className="border-t border-gray-400 dark:border-gray-600">
                <p className="mt-3 text-gray-700 dark:text-gray-300">Published By:</p>
                <div className="mt-2 flex flex-row items-center gap-3">
                    <Image
                        alt=""
                        className="rounded-full shadow-2xl"
                        src={urlForImage(author.avatar).url()}
                        blurEnabled={false}
                        lightboxEnabled={true}
                        width={35}
                        height={35}
                    />
                    <span>{author.name}</span>
                </div>
            </div>
            {tags && tags.length > 0 && (
                <div className="mt-5 border-t border-gray-400 dark:border-gray-600">
                    <div className="mb-2 py-3 text-base">
                        <p className="text-gray-700 dark:text-gray-300">Tags:</p>
                        <div className="mt-3 flex items-center gap-2">
                            {tags.map(tag => {
                                return (
                                    <div key={tag.name.trim()}>
                                        <p className="rounded-lg bg-teal-300 p-2 dark:bg-teal-700">
                                            #{tag.name}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}
