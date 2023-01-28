import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import type { NextApiRequest, NextApiResponse } from 'next';

import { config as projectConfig } from '$lib/constants';
import sanityClient from '$lib/sanity/client';
import { allPostQuery, postUpdateQuery } from '$lib/sanity/query';
import type { Post } from '$lib/sanity/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const validationSecret = process.env.SANITY_STUDIO_REVALIDATE_SECRET;

  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  if (!validationSecret) {
    throw new Error('Missing secret');
  }

  const body = await readBody(req); // Read the body into a string
  const signature = req.headers[SIGNATURE_HEADER_NAME] as string;

  if (!isValidSignature(body, signature, validationSecret)) {
    console.error('Invalid signature!');
    res.status(401).json({
      message: 'Invalid Request!',
      success: false,
    });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { _id: id } = JSON.parse(body);

  if (typeof id !== 'string' || !id) {
    console.error('Invalid body!');
    res.status(400).json({
      message: 'Invalid: _id',
    });
    return;
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
      message: 'Updated!',
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
        success: false,
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
