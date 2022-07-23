import { atom } from 'recoil';

interface LightBoxAtomProp {
  display: boolean;
  imageUrl: string;
  imageAlt?: string;
}

export const lightboxAtom = atom<LightBoxAtomProp>({
  key: 'image-lightbox',
  default: {
    display: false,
    imageUrl: '',
    imageAlt: '',
  },
});
