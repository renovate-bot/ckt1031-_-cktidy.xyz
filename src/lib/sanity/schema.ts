/**
 * [
  {
    thumbnail: { _type: 'image', asset: [Object] },
    tags: [ [Object] ],
  }
]
 */

export interface Tag {
  _type: 'tag';
  name: string;
  slug: { _type: 'slug'; current: string };
  description?: string;
}

export interface Post {
  _type: 'post';
  _id: string;
  title: string;
  breif: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  publishedAt: string;
  enable_comment: boolean;
  body: string;
  slug: { current: string; _type: 'slug' };
  author: { _ref: string; _type: 'reference' };
  tags: Tag[];
  thumbnail?: { _type: 'image'; asset: { _ref: string; _type: 'reference' } };
}
