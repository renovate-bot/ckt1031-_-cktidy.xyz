import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import type { NextApiRequest, NextApiResponse } from 'next';

import { config as projectConfig } from '$lib/constants';
import sanityClient from '$lib/sanity/client';
import { allPostQuery, postUpdateQuery } from '$lib/sanity/query';
import { Post } from '$lib/sanity/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = await readBody(req); // Read the body into a string
    const signature = req.headers[SIGNATURE_HEADER_NAME] as string;
    const validationSecret = process.env.SANITY_STUDIO_REVALIDATE_SECRET;

    if (
        req.method !== 'post' ||
        !validationSecret ||
        !isValidSignature(body, signature, validationSecret)
    ) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Request!',
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { _id: id } = JSON.parse(body);

    if (typeof id !== 'string' || !id) {
        return res.status(400).json({ message: 'Invalid: _id' });
    }

    try {
        const slug = await sanityClient.fetch<string>(postUpdateQuery, {
            id,
        });

        const allPosts: Post[] = await sanityClient.fetch(allPostQuery);

        const totalPagesNumber = Math.ceil(allPosts.length / projectConfig.blog.maxDisplayPerPage);

        const requiredRevalidateListPages = Array.from({ length: totalPagesNumber }, (_, i) => {
            return res.revalidate(`/blog/pages/${i + 1}`);
        });

        await Promise.all([
            requiredRevalidateListPages,
            res.revalidate('/blog'),
            res.revalidate(`/blog/${slug}`),
        ]);

        return res.status(200).json({
            success: true,
            message: `Updated!`,
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

async function readBody(readable: NextApiRequest) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }

    return Buffer.concat(chunks).toString('utf8');
}
