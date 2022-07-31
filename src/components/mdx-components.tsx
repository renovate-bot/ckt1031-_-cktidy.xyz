import { ClassAttributes, ImgHTMLAttributes } from 'react';

import Image from './image';

const components = {
  img: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>,
  ) => (
    <Image
      src={props.src ?? ''}
      className="rounded-lg"
      alt={props.alt ?? 'cktidy'}
      blurEnabled
      lightboxEnabled
      layout="responsive"
      {...props}
    />
  ),
};

export default components;
