import { isValidRequest } from '@sanity/webhook';
import type { NextApiRequest, NextApiResponse } from 'next';

import config from '../../data/config.json';
import sanityClient from '../../utils/sanity/client';
import { allPostQuery, postUpdateQuery } from '../../utils/sanity/query';
import { Post } from '../../utils/sanity/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const validationSecret = process.env.SANITY_STUDIO_REVALIDATE_SECRET;

  if (
    req.method !== 'post' ||
    !validationSecret ||
    !isValidRequest(req, validationSecret)
  ) {
    return res.status(401).json({ message: 'Invalid Request!' });
  }

  const { _id } = req.body;

  if (typeof _id !== 'string' || !_id) {
    return res.status(400).json({ message: 'Invalid: _id' });
  }

  try {
    const slug = await sanityClient.fetch(postUpdateQuery, {
      id: _id,
    });

    const allPosts: Post[] = await sanityClient.fetch(allPostQuery);

    const totalPagesNumber = Math.ceil(
      allPosts.length / config.blog.maxDisplayPerPage,
    );

    const requiredRevalidateListPages = Array.from(
      { length: totalPagesNumber },
      (_, i) => {
        return res.revalidate(`/blog/pages/${i + 1}`);
      },
    );

    await Promise.all([
      requiredRevalidateListPages,
      res.revalidate('/blog'),
      res.revalidate(`/blog/${slug}`),
    ]);

    return res.status(200).json({ message: `Updated!` });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
