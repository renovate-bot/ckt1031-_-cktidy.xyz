import type { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import BlogList from '$components/blog/explorer';
import { config } from '$lib/constants';
import generateRSS from '$lib/generate-feed';
import sanityClient from '$lib/sanity/client';
import { allPostQuery } from '$lib/sanity/query';
import { Post, Tag } from '$lib/sanity/schema';

export async function getStaticProps() {
    const posts: (Omit<Post, 'tags'> & {
        tags?: Tag[];
    })[] = await sanityClient.fetch(allPostQuery);

    // Genertae feed for RSS
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
