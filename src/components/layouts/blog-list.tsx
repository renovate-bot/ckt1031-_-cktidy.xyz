import cn from 'classnames';
import trim from 'lodash/trim';
import Link from 'next/link';
import { ChangeEvent, useCallback, useState } from 'react';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

import { Post } from '../../utils/sanity/schema';
import { urlForImage } from '../../utils/sanity/tools';
import Image from '../image';

export interface BlogListProp {
  posts: Post[];
  displayPosts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

function Pageination({
  pagination,
}: {
  pagination: BlogListProp['pagination'];
}) {
  const isTopPage = pagination.currentPage - 1 === 1;
  const toPagePath = '/blog/page/[number]';

  return (
    <div className="border-t-2 border-gray-400 dark:border-gray-600">
      <div className="mt-3 flex flex-row justify-between px-2 py-1">
        <div>
          {pagination.currentPage - 1 > 0 && (
            <Link
              passHref
              href={{
                pathname: isTopPage ? '/blog' : toPagePath,
                query: {
                  number: (pagination.currentPage - 1).toString(),
                },
              }}>
              <button
                type="button"
                className="flex flex-row items-center space-x-2 rounded-lg p-1 hover:bg-gray-200 hover:dark:bg-gray-700">
                <FaRegArrowAltCircleLeft />
                <p className="hidden md:block">Previous</p>
              </button>
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center justify-center space-x-1">
          {pagination.currentPage - 2 > 0 && <div>...</div>}
          {[...Array.from({ length: pagination.totalPages })].map(
            (_, index) => {
              const pageNumber = index + 1;

              if (
                pageNumber >= pagination.currentPage - 3 &&
                pageNumber <= pagination.currentPage + 3
              ) {
                return (
                  <div
                    className={cn(
                      pagination.currentPage === pageNumber &&
                        'bg-orange-400 dark:bg-orange-700',
                      'rounded-lg px-2 py-1',
                    )}
                    key={`PAGINATION-${index}`}>
                    <Link
                      passHref
                      href={{
                        pathname: toPagePath,
                        query: {
                          number: pageNumber.toString(),
                        },
                      }}>
                      {pageNumber}
                    </Link>
                  </div>
                );
              }
            },
          )}
          {pagination.currentPage + 2 - pagination.totalPages < 0 && (
            <div>...</div>
          )}
        </div>
        <div>
          {pagination.currentPage + 1 <= pagination.totalPages && (
            <Link
              passHref
              href={{
                pathname: toPagePath,
                query: {
                  number: (pagination.currentPage + 1).toString(),
                },
              }}>
              <button
                type="button"
                className="flex flex-row items-center space-x-2 rounded-lg p-1 hover:bg-gray-200 hover:dark:bg-gray-700">
                <p className="hidden md:block">Next</p>
                <FaRegArrowAltCircleRight />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function List({ postList }: { postList: Post[] }) {
  return (
    <div className="grid space-y-5 divide-y-2 divide-gray-400 dark:divide-gray-500">
      {postList.length > 0 ? (
        postList.map(post => {
          return (
            <div
              key={`BLOG-LIST-${trim(post.slug.current)}`}
              className="flex w-full flex-col justify-between py-4 md:flex-row md:space-x-5">
              <div
                className={cn(
                  post.thumbnail && 'mb-3 md:mb-0 md:max-w-[400px]',
                  'break-words',
                )}>
                <Link
                  passHref
                  href={{
                    pathname: '/blog/[slug]',
                    query: {
                      slug: post.slug.current,
                    },
                  }}>
                  <span className="cursor-pointer text-3xl">{post.title}</span>
                </Link>
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
  );
}

export default function ListPage({
  posts,
  displayPosts,
  pagination,
}: BlogListProp) {
  const [searchKey, setSearchKey] = useState('');

  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  }, []);

  const filteredPosts = posts.filter(post => {
    const searchContent = [post.title, post.breif, post.slug.current];
    for (let i = 0, l = searchContent.length; i < l; i++) {
      const content = searchContent[i];

      const isMatched = content.toLowerCase().includes(searchKey.toLowerCase());

      if (isMatched) return true;
      else if (i === 2) return false;
      else continue;
    }
  });

  const localList = searchKey.length > 0 ? filteredPosts : displayPosts;

  return (
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
      <List postList={localList} />
      {searchKey.length === 0 &&
        pagination.totalPages > 0 &&
        pagination.totalPages - 1 !== 0 && (
          <Pageination pagination={pagination} />
        )}
    </div>
  );
}
