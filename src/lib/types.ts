import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { OpenGraphMedia } from 'next-seo/lib/types';
import type { ReadTimeResults } from 'reading-time';

import type { Post } from '$lib/sanity/schema';
import type { Author, Tag } from '$lib/sanity/schema';

interface BlogPostDataExtension {
  author: Author;
  tags?: Tag[];
}

export interface BlogSinglePostProps {
  data: Omit<Post, 'author' | 'tags'> & BlogPostDataExtension;
  dateName: string;
  content: MDXRemoteSerializeResult;
  readingTime: ReadTimeResults;

  // Open Graph
  ogImage: OpenGraphMedia[];
  articleImages: string[];
}

export interface BlogPostLobbyProps {
  allPosts: (Omit<Post, 'tags'> & {
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
