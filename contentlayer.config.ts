import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import imageSize from 'rehype-external-img-size';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkNormalizeHeadings from 'remark-normalize-headings';
import remarkParse from 'remark-parse';
import remarkUnwrapImages from 'remark-unwrap-images';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'The summary of the post',
      required: true,
    },
    thumbnail: {
      type: 'string',
      description: 'The thumbnail of the post',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
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
