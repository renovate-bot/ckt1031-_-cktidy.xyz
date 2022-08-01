export const postSlugQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;

export const postUpdateQuery = `*[_type == "post" && _id == $id].slug.current`;

export const postSingleQuery = `
*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
  ...,
  author {
    _type == 'reference' => @->,
    _type != 'reference' => @
  },
  tags[] {
    _type == 'reference' => @->,
    _type != 'reference' => @
  }
}
`;

export const authorQueryByRef = `*[_type == "author" && _id == $ref][0]`;

export const allPostQuery = `*[_type == "post"] | order(date desc, _updatedAt desc)`;
