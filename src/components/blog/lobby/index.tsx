import { useEffect, useMemo, useState } from 'react';

import Fuse from 'fuse.js';
import type { ChangeEvent } from 'react';
import { FiSearch } from 'react-icons/fi';

import type { BlogPostLobbyProps } from '$lib/types';

import ExplorerBlogList from './list';
import Pagination from './pagination';

export default function ListPage({ allPosts, displayPosts, pagination }: BlogPostLobbyProps) {
  const [queryPost, setQueryPost] = useState<BlogPostLobbyProps['allPosts']>();

  const fuse = useMemo(() => {
    return new Fuse(allPosts, {
      keys: ['name', 'body'],
      threshold: 0.4,
    });
  }, [allPosts]);

  useEffect(() => {
    setQueryPost(allPosts);
  }, [allPosts]);

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value || value.length === 0) setQueryPost(displayPosts);
    else {
      const result = fuse.search(value);
      setQueryPost(result.map(({ item }) => item));
    }
  };

  return (
    <div className="mt-5 w-full max-w-[1000px]">
      <div className="mb-2">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          I have started this website since July 2022, I am writing blog to share meaningful things
          to the world
        </p>
        <div className="base-border mt-3 mb-2 flex flex-row items-center space-x-3 rounded-md border bg-gray-100 py-1 px-3 dark:bg-gray-800">
          <FiSearch />
          <input
            placeholder="Search"
            onChange={onSearch}
            className="w-full bg-transparent p-1 outline-none"
          />
        </div>
      </div>
      {queryPost && <ExplorerBlogList postList={queryPost} />}
      {queryPost?.length === 0 && pagination.totalPages > 0 && pagination.totalPages - 1 !== 0 && (
        <Pagination pagination={pagination} />
      )}
    </div>
  );
}
