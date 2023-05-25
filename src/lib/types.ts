import type { ReadTimeResults } from 'reading-time';

import type { Post } from '$lib/sanity/schema';

export interface BlogSinglePostProps {
  post: Post;
  dateName: string;
  readingTime: ReadTimeResults;
}

export interface BlogPostLobbyProps {
  posts: Post[];
  displayPosts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}
