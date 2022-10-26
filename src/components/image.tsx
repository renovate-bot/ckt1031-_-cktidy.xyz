/* eslint-disable @next/next/no-img-element */
import 'react-photo-view/dist/react-photo-view.css';

import NextImage, { type ImageProps } from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import classnames from '../utils/classnames';

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
    const blurData: ImageDataProp = {
        placeholder: blurEnabled ? 'blur' : 'empty',
        blurDataURL:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvWS1LgAGJQIpt50GkgAAAABJRU5ErkJggg==',
    };

    return (
        <PhotoProvider>
            <div className={classnames(lightboxEnabled && 'cursor-zoom-in')}>
                {lightboxEnabled ? (
                    <PhotoView src={src}>
                        <img className="mx-auto cursor-zoom-in" src={src} alt={alt} {...rest} />
                    </PhotoView>
                ) : (
                    <NextImage src={src} alt={alt} {...rest} {...blurData} />
                )}
            </div>
        </PhotoProvider>
    );
}
