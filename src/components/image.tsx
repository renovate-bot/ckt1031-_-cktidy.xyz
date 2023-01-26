import NextImage, { type ImageProps } from 'next/image';

interface ImageProp {
    src: string;
    alt: string;
    blurEnabled?: boolean;
    [x: string]: unknown;
}

interface ImageDataProp {
    blurDataURL: string;
    placeholder: ImageProps['placeholder'];
}

export default function Image({ src, alt, blurEnabled = true, ...rest }: ImageProp) {
    const blurData: ImageDataProp = {
        placeholder: blurEnabled ? 'blur' : 'empty',
        blurDataURL:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvWS1LgAGJQIpt50GkgAAAABJRU5ErkJggg==',
    };

    return <NextImage src={src} alt={alt} {...rest} {...blurData} />;
}
