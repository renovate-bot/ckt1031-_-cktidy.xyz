export const postSlugQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;

export const postSingleQuery = `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0]`;

export const authorQueryByRef = `*[_type == "author" && _id == $ref][0]`;

export const allPostQuery = `*[_type == "post"] | order(date desc, _updatedAt desc)`;
