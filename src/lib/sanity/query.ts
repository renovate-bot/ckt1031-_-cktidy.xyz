import { groq } from 'next-sanity';

export const postSlugQuery = '*[_type == "post" && defined(slug.current)][].slug.current';

export const postUpdateQuery = '*[_type == "post" && _id == $id].slug.current';

export const postSingleQuery = groq`
*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
  ...,
  author {
    _type == 'reference' => @->
  },
  tags[] {
    _type == 'reference' => @->
  }
}
`;

export const allPostQuery = groq`*[_type == "post"] | order(date desc, _updatedAt desc) {
  ...,
  tags[] {
    _type == 'reference' => @->
  }
}`;
