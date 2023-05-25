export const allPostQuery = `*[_type == "post"] | order(date desc, _updatedAt desc) {
  ...,
  tags[] {
    _type == 'reference' => @->
  }
}`;

export const allPostSlugsQuery = '*[_type == "post" && defined(slug.current)][].slug.current';

export const postSingleQuery = `
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
