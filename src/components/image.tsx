import cn from 'classnames';
import NextImage, { type ImageProps } from 'next/image';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { lightboxAtom } from '../recoil/image';

interface ImageProp {
  src: string;
  alt: string;
  blurEnabled?: boolean;
  lightboxEnabled?: boolean;
  [x: string]: unknown;
}

interface ImageDataProp {
  placeholder: ImageProps['placeholder'];
  blurDataURL: string;
}

export default function Image({
  src,
  alt,
  blurEnabled = true,
  lightboxEnabled = false,
  ...rest
}: ImageProp) {
  const setLightbox = useSetRecoilState(lightboxAtom);

  const showLightBox = useCallback(() => {
    if (lightboxEnabled) {
      setLightbox({
        display: true,
        imageUrl: src,
        imageAlt: alt ?? 'cktidy',
      });
    }
  }, [alt, lightboxEnabled, setLightbox, src]);

  const blurData: ImageDataProp = {
    placeholder: blurEnabled ? 'blur' : 'empty',
    blurDataURL:
      // eslint-disable-next-line no-secrets/no-secrets
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvWS1LgAGJQIpt50GkgAAAABJRU5ErkJggg==',
  };

  return (
    <div className={cn(lightboxEnabled && 'cursor-zoom-in')}>
      <NextImage src={src} onClick={showLightBox} {...rest} {...blurData} />
    </div>
  );
}
