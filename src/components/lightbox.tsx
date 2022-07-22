/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import {
  MdClose,
  MdCopyAll,
  MdRestorePage,
  MdZoomIn,
  MdZoomOut,
} from 'react-icons/md';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { lightboxAtom } from '../recoil/image';

const onCopy = () => toast.success('Copyied Image URL');

export default function Lightbox() {
  const data = useRecoilValue(lightboxAtom);
  const resetData = useResetRecoilState(lightboxAtom);

  useEffect(() => {
    const handleKeydown = (e: { key: string }) => {
      if (e.key === 'Escape') resetData();
    };

    document.body.style.overflow = data.display ? 'hidden' : 'auto';

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.addEventListener('keydown', handleKeydown);
    };
  }, [data.display, resetData]);

  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div
          className={cn(
            data.display ? 'scale-100' : 'scale-0',
            'fixed inset-0 z-[100] h-screen w-screen duration-300',
          )}>
          <div className="flex h-screen w-screen flex-col items-center justify-between">
            <div className="absolute z-10 w-full p-3 md:p-4">
              <div className="flex flex-row justify-end space-x-2 md:space-x-4">
                <button
                  className="rounded-lg bg-slate-700 p-2 text-white shadow-2xl"
                  onClick={() => resetTransform()}>
                  <MdRestorePage size={25} />
                </button>
                <button
                  className="rounded-lg bg-slate-700 p-2 text-white shadow-2xl"
                  onClick={() => zoomIn()}>
                  <MdZoomIn size={25} />
                </button>
                <button
                  className="rounded-lg bg-slate-700 p-2 text-white shadow-2xl"
                  onClick={() => zoomOut()}>
                  <MdZoomOut size={25} />
                </button>
                <button className="rounded-lg bg-slate-700 p-2 text-white shadow-2xl">
                  <CopyToClipboard text={data.imageUrl} onCopy={onCopy}>
                    <MdCopyAll size={25} />
                  </CopyToClipboard>
                </button>
                <button
                  className="rounded-lg bg-slate-700 p-2 text-white shadow-2xl"
                  onClick={resetData}>
                  <MdClose size={25} />
                </button>
              </div>
            </div>
            <div className="absolute h-screen w-screen cursor-zoom-out bg-gray-600 opacity-90" />
            <TransformComponent>
              <div className="relative flex h-screen w-screen flex-col items-center justify-center">
                <div className="relative px-20">
                  <img alt={data.imageAlt} src={data.imageUrl} />
                </div>
              </div>
            </TransformComponent>
          </div>
        </div>
      )}
    </TransformWrapper>
  );
}
