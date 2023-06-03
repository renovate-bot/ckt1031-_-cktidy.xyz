import NextImage, { type ImageProps } from 'next/image';

import clsx from 'clsx';

import LightBox from './lightbox';

export interface ImageProp {
  src: string;
  alt: string;
  className?: string;
  enableLightBox?: boolean;
  blurEnabled?: boolean;
  [x: string]: unknown;
}

interface ImageDataProp {
  blurDataURL: string;
  placeholder: ImageProps['placeholder'];
}

export default function Image({
  src,
  alt,
  className,
  enableLightBox = false,
  blurEnabled = true,
  ...rest
}: ImageProp) {
  const blurData: ImageDataProp = {
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvWS1LgAGJQIpt50GkgAAAABJRU5ErkJggg==',
    placeholder: blurEnabled ? 'blur' : 'empty',
  };

  const image = (
    <NextImage
      src={src}
      alt={alt}
      className={clsx(enableLightBox && 'cursor-zoom-in', className)}
      {...rest}
      {...blurData}
    />
  );

  return enableLightBox ? <LightBox src={src}>{image}</LightBox> : image;
}
