import cn from 'classnames';
import trim from 'lodash/trim';
import { ChangeEvent, useCallback, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Post } from '../../utils/sanity/schema';
import { urlForImage } from '../../utils/sanity/tools';
import Image from '../image';
import { DefaultMetaData } from '../seo';

export interface BlogListProp {
  posts: Post[];
  displayPosts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export default function BlogList({ posts, displayPosts }: BlogListProp) {
  const [searchKey, setSearchKey] = useState('');

  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  }, []);

  const filteredPosts = posts.filter(post => {
    const searchContent = [post.title, post.breif, post.slug.current];
    for (const content of searchContent) {
      if (typeof content !== 'string') return false;
      return content.toLowerCase().includes(searchKey.toLowerCase());
    }
  });

  const localList = searchKey.length > 0 ? filteredPosts : displayPosts;

  return (
    <>
      <DefaultMetaData title="Blog" />
      <div className="max-w-[700px] text-2xl">
        <div className="border-b-2 border-gray-300 dark:border-gray-600">
          <div className="mb-2">
            <h1 className="text-6xl">Blog</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              I have started this website since July 2022, I am writing blog to
              share meaningful things to the world
            </p>
            <div className="mt-3 mb-2 flex flex-row items-center space-x-3 rounded-xl bg-gray-300 py-1 px-3 dark:bg-gray-600">
              <FiSearch />
              <input
                placeholder="Search"
                onChange={onSearch}
                className="w-full bg-transparent p-1"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="grid space-y-5 divide-y-2 divide-gray-400 dark:divide-gray-500">
            {localList.length > 0 ? (
              localList.map(post => {
                return (
                  <div
                    key={`BLOG-LIST-${trim(post.slug.current)}`}
                    className="flex w-full flex-col justify-between py-4 md:flex-row md:space-x-5">
                    <div
                      className={cn(
                        post.thumbnail && 'mb-3 md:mb-0 md:max-w-[400px]',
                        'break-words',
                      )}>
                      <a
                        href={`/blog/${post.slug.current}`}
                        className="text-3xl">
                        {post.title}
                      </a>
                      <p className="text-xl text-gray-600 dark:text-gray-400">
                        {post.breif}
                      </p>
                    </div>
                    {post.thumbnail && (
                      <Image
                        alt="Thumbnail"
                        className="rounded md:mt-0"
                        lightboxEnabled
                        src={urlForImage(post.thumbnail).url()}
                        width={1600 * 0.15}
                        height={900 * 0.15}
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center">
                <p className="p-5">Nothing can be found!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
