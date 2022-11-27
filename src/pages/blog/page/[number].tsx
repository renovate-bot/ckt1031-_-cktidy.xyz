import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { config } from '$data/constants';
import BlogList, { BlogListProp } from '$layouts/blog-list';
import sanityClient from '$lib/sanity/client';
import { allPostQuery } from '$lib/sanity/query';
import { Post } from '$lib/sanity/schema';

export async function getStaticPaths() {
    const posts = await sanityClient.fetch<Post[]>(allPostQuery);

    const totalPagesNumber = Math.ceil(posts.length / config.blog.maxDisplayPerPage);

    return {
        paths: Array.from({ length: totalPagesNumber }, (_, i) => ({
            params: {
                number: (i + 1).toString(),
            },
        })),
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<BlogListProp> = async ({ params }) => {
    if (!params || typeof params.number !== 'string') {
        return { notFound: true };
    }

    const pageNumber = Number(params.number);

    const posts: Post[] = await sanityClient.fetch(allPostQuery);

    const displayPosts = posts.slice(
        config.blog.maxDisplayPerPage * (pageNumber - 1),
        config.blog.maxDisplayPerPage * pageNumber,
    );

    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(posts.length / config.blog.maxDisplayPerPage),
    };

    return { props: { posts, displayPosts, pagination } };
};

export default function BlogHome(prop: BlogListProp) {
    return (
        <>
            <NextSeo title={`Blog Page: ${prop.pagination.currentPage}`} />
            <BlogList {...prop} />
        </>
    );
}
