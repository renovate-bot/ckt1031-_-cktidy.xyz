import type { ClassAttributes, ImgHTMLAttributes, JSX } from 'react';

import Image from './image';

const components = {
  img: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>,
  ) => (
    <Image
      src={props.src ?? ''}
      alt={props.alt ?? 'cktidy'}
      blurEnabled
      enableLightBox
      layout="responsive"
      className="w-full"
      {...props}
    />
  ),
};

export default components;
