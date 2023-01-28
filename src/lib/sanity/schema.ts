import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type {
  SanityDocument,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyedReference,
  SanityReference,
} from 'sanity-codegen';

/**
 * Author
 *
 *
 */
export interface Author extends SanityDocument {
  _type: 'author';

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string };

  /**
   * Email — `string`
   *
   *
   */
  email: string;

  /**
   * Avatar — `image`
   *
   *
   */
  avatar: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Description — `string`
   *
   *
   */
  description?: string;
}

/**
 * Post
 *
 *
 */
export interface Post extends SanityDocument {
  _type: 'post';

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string };

  /**
   * Author — `reference`
   *
   *
   */
  author: SanityReference<Author>;

  /**
   * Tags — `array`
   *
   *
   */
  tags?: SanityKeyedReference<Tag>[];

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt: string;

  /**
   * Thumbnail — `image`
   *
   *
   */
  thumbnail?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Enable Comment — `boolean`
   *
   *
   */
  enable_comment: boolean;

  /**
   * Breif — `text`
   *
   *
   */
  breif: string;

  /**
   * Body — `markdown`
   *
   *
   */
  body: Markdown;
}

/**
 * Tag
 *
 *
 */
export interface Tag extends SanityDocument {
  _type: 'tag';

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string };

  /**
   * Description — `text`
   *
   *
   */
  description?: string;
}

export type Documents = Author | Post | Tag;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Markdown = MDXRemoteSerializeResult;

export {
  type SanityBlock,
  type SanityDocument,
  type SanityGeoPoint,
  type SanityImageAsset,
  type SanityImageCrop,
  type SanityImageDimensions,
  type SanityImageHotspot,
  type SanityImageMetadata,
  type SanityImagePalette,
  type SanityImagePaletteSwatch,
  type SanityKeyed,
  type SanityKeyedReference,
  type SanityReference,
} from 'sanity-codegen';
