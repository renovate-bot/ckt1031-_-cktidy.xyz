import NextImage, { type ImageProps } from 'next/image';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { lightboxAtom } from '../recoil/image';
import { classnames } from '../utils/tools';

interface ImageProp {
  src: string;
  alt: string;
  blurEnabled?: boolean;
  lightboxEnabled?: boolean;
  [x: string]: unknown;
}

interface ImageDataProp {
  blurDataURL: string;
  placeholder: ImageProps['placeholder'];
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
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvWS1LgAGJQIpt50GkgAAAABJRU5ErkJggg==',
  };

  return (
    <div className={classnames(lightboxEnabled && 'cursor-zoom-in')}>
      <NextImage src={src} onClick={showLightBox} {...rest} {...blurData} />
    </div>
  );
}
