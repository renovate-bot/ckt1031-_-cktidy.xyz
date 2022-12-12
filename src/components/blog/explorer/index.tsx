import Fuse from 'fuse.js';
import { ChangeEvent, useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Post, Tag } from '$lib/sanity/schema';

import ExplorerBlogList from './list';
import Pageination from './pagination';

export interface BlogListProp {
    posts: (Omit<Post, 'tags'> & {
        tags?: Tag[];
    })[];
    displayPosts: (Omit<Post, 'tags'> & {
        tags?: Tag[];
    })[];
    pagination: {
        currentPage: number;
        totalPages: number;
    };
}

export default function ListPage({ posts, displayPosts, pagination }: BlogListProp) {
    const [queryPost, setQueryPost] = useState<BlogListProp['posts']>(posts);

    const fuse = useMemo(
        () =>
            new Fuse(posts, {
                threshold: 0.4,
                keys: ['name', 'body'],
            }),
        [posts],
    );

    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!value || value.length < 1) setQueryPost(displayPosts);
        else {
            const result = fuse.search(value);
            setQueryPost(result.map(({ item }) => item));
        }
    };

    return (
        <div className="max-w-[700px]">
            <div>
                <div className="mb-2">
                    <h1 className="text-3xl font-bold">Blog</h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        I have started this website since July 2022, I am writing blog to share
                        meaningful things to the world
                    </p>
                    <div className="base-border mt-3 mb-2 flex flex-row items-center space-x-3 rounded-md border-2 bg-gray-100 py-1 px-3 dark:bg-gray-800">
                        <FiSearch />
                        <input
                            placeholder="Search"
                            onChange={onSearch}
                            className="w-full bg-transparent p-1 outline-none"
                        />
                    </div>
                </div>
            </div>
            <ExplorerBlogList postList={queryPost} />
            {queryPost.length === 0 &&
                pagination.totalPages > 0 &&
                pagination.totalPages - 1 !== 0 && <Pageination pagination={pagination} />}
        </div>
    );
}
