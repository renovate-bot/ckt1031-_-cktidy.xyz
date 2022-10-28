import type { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import config from '$data/config.json';
import BlogList from '$layouts/blog-list';
import sanityClient from '$utils/sanity/client';
import { allPostQuery } from '$utils/sanity/query';
import { Post } from '$utils/sanity/schema';
import generateRSS from '$utils/static-files';

export async function getStaticProps() {
    const posts: Post[] = await sanityClient.fetch(allPostQuery);

    generateRSS(posts);

    const displayPosts = posts.slice(0, config.blog.maxDisplayPerPage);

    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(posts.length / config.blog.maxDisplayPerPage),
    };

    return { props: { posts, displayPosts, pagination } };
}

export default function BlogHome(prop: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <NextSeo title="Blog" description="A cool website by cktsun1031!" />
            <BlogList {...prop} />
        </>
    );
}
