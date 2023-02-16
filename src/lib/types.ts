import type { Post } from 'contentlayer/generated';
import type { ReadTimeResults } from 'reading-time';

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
