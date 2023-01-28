import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import imageSize from 'rehype-external-img-size';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkNormalizeHeadings from 'remark-normalize-headings';
import remarkParse from 'remark-parse';
import remarkUnwrapImages from 'remark-unwrap-images';

export async function parseMdx(body: string) {
  return await serialize(body, {
    mdxOptions: {
      format: 'mdx',
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [
          rehypeExternalLinks,
          {
            rel: ['nofollow'],
          },
        ],
        imageSize,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      remarkPlugins: [remarkParse, remarkGfm, remarkNormalizeHeadings, remarkUnwrapImages],
    },
  });
}
