import fs from 'node:fs';

import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';

import BlogList from '$components/posts/lobby';
import { config } from '$lib/constants';
import generateRSS from '$lib/generate-feed';

const getPosts = () => {
  const posts = allPosts.sort((a, b) => {
    const dateA = dayjs(new Date(a.date));
    return dateA.isAfter(new Date(b.date)) ? -1 : 1;
  });

  const displayPosts = posts.slice(0, config.blog.maxDisplayPerPage);

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / config.blog.maxDisplayPerPage),
  };

  // Feeds generation
  const feed = generateRSS(posts);

  // Write the feed to the public folder
  fs.writeFileSync('./public/feed.xml', feed);

  return {
    posts,
    displayPosts,
    pagination,
  };
};

export function generateMetadata() {
  return {
    title: 'Blog',
    description: 'Latest post published from cktsun!',
  };
}

export default function PostsPage() {
  const prop = getPosts();

  return (
    <>
      <BlogList {...prop} />
    </>
  );
}
