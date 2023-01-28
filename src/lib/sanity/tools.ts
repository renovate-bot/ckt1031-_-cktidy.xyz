import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import sanityClient from './client';

export function urlForImage(source: SanityImageSource) {
  return imageUrlBuilder(sanityClient).image(source).auto('format').fit('max');
}
