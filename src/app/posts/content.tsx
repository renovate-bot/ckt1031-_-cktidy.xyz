import PageTitle from '$components/page-title';
import type { BlogPostLobbyProps } from '$lib/types';

import ExplorerBlogList from './list';
import Pagination from './pagination';

export default function PostListContent({ displayPosts, pagination }: BlogPostLobbyProps) {
  return (
    <div className="mt-5 w-full max-w-[1000px]">
      <div className="mb-2">
        <PageTitle
          title="Blog"
          description="Welcome to my blog, where I embark on a journey of sharing knowledge and meaningful insights with the world."
        />
      </div>
      <ExplorerBlogList postList={displayPosts} />
      {displayPosts.length === 0 &&
        pagination.totalPages > 0 &&
        pagination.totalPages - 1 !== 0 && <Pagination pagination={pagination} />}
    </div>
  );
}
