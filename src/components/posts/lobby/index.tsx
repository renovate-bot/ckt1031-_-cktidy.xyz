'use client';

import { useEffect, useMemo, useState } from 'react';

import { IconSearch } from '@tabler/icons-react';
import Fuse from 'fuse.js';
import type { ChangeEvent } from 'react';

import PageTitle from '$components/page-title';
import type { BlogPostLobbyProps } from '$lib/types';

import ExplorerBlogList from './list';
import Pagination from './pagination';

export default function ListPage({ posts, displayPosts, pagination }: BlogPostLobbyProps) {
  const [queryPost, setQueryPost] = useState<BlogPostLobbyProps['posts']>();

  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: ['name', 'body'],
      threshold: 0.4,
    });
  }, [posts]);

  useEffect(() => {
    setQueryPost(posts);
  }, [posts]);

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
        <PageTitle
          title="Blog"
          description="Welcome to my blog, where I embark on a journey of sharing knowledge and meaningful insights with the world."
        />
        <div className="base-border mt-3 mb-2 flex flex-row items-center space-x-3 rounded-md border bg-gray-100 py-1 px-3 dark:bg-gray-800">
          <IconSearch />
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
