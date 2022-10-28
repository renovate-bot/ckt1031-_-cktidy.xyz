import { MDXRemote } from 'next-mdx-remote';
import type { ReadTimeResults } from 'reading-time';

import Image from '$components/image';
import mdxComponents from '$components/mdx-components';

import { Author, Post, Tag } from '../utils/sanity/schema';
import { urlForImage } from '../utils/sanity/tools';

interface BlogPropExtend {
    author: Author;
    tags: Tag[];
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
                        <span className="italic text-gray-600 dark:text-gray-400">{dateName}</span>
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
            {tags && (
                <div className="mt-5 border-t border-gray-400 dark:border-gray-600">
                    <div className="py-4 text-xl">
                        <div>
                            <p className="text-gray-700 dark:text-gray-300">Tags:</p>
                        </div>
                        <div className="mt-3 flex items-center space-x-2">
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
