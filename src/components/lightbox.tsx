'use client';

import type { ReactElement } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import 'react-photo-view/dist/react-photo-view.css';

interface LightBoxProp {
  src: string;
  children: ReactElement;
}

export default function LightBox({ src, children }: LightBoxProp) {
  return (
    <PhotoProvider>
      <PhotoView src={src}>{children}</PhotoView>
    </PhotoProvider>
  );
}
