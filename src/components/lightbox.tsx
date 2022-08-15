/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import {
  MdClose,
  MdCopyAll,
  MdRestorePage,
  MdZoomIn,
  MdZoomOut,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { lightboxAtom } from '../recoil/image';

export default function Lightbox() {
  const data = useRecoilValue(lightboxAtom);
  const resetData = useResetRecoilState(lightboxAtom);

  const imageUrlForCopy = data.imageUrl.startsWith('/')
    ? window.location.origin + data.imageUrl
    : data.imageUrl;

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

  const onCopy = useCallback(async (content: string) => {
    await navigator.clipboard.writeText(content);
    toast.success('Copied');
  }, []);

  return (
    <AnimatePresence>
      {data.display && (
        <motion.div
          className="fixed inset-0 z-[100] h-screen w-screen"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeIn' }}>
          <TransformWrapper initialScale={1} maxScale={30}>
            {({ zoomIn, zoomOut, resetTransform }) => (
              <div className="flex h-screen w-screen flex-col items-center justify-between">
                <div className="absolute z-10 w-full p-3 md:p-4">
                  <div className="flex flex-row justify-end space-x-2 md:space-x-4">
                    <button
                      data-tip
                      data-for="reset-zoom"
                      type="button"
                      className="rounded-lg bg-slate-700 p-2 text-white shadow-2xl"
                      onClick={() => resetTransform()}>
                      <MdRestorePage size={21} />
                      <ReactTooltip id="reset-zoom">
                        <span className="text-2xl">Reset Zoom</span>
                      </ReactTooltip>
                    </button>
                    <button
                      data-tip
                      data-for="zoom-in"
                      type="button"
                      className="rounded-lg bg-slate-700 p-2 text-white shadow-2xl"
                      onClick={() => zoomIn()}>
                      <MdZoomIn size={21} />
                      <ReactTooltip id="zoom-in">
                        <span className="text-2xl">Zoom in</span>
                      </ReactTooltip>
                    </button>
                    <button
                      data-tip
                      data-for="zoom-out"
                      type="button"
                      className="rounded-lg bg-slate-700 p-2 text-white shadow-2xl"
                      onClick={() => zoomOut()}>
                      <MdZoomOut size={21} />
                      <ReactTooltip id="zoom-out">
                        <span className="text-2xl">Zoom Out</span>
                      </ReactTooltip>
                    </button>
                    <button
                      data-tip
                      data-for="copy-url"
                      type="button"
                      className="rounded-lg bg-slate-700 p-2 text-white shadow-2xl">
                      <button
                        type="button"
                        onClick={() => onCopy(imageUrlForCopy)}>
                        <MdCopyAll size={21} />
                      </button>
                      <ReactTooltip id="copy-url">
                        <span className="text-2xl">Copy URL</span>
                      </ReactTooltip>
                    </button>
                    <button
                      data-tip
                      data-for="close-lb"
                      type="button"
                      className="rounded-lg bg-slate-700 p-2 text-white shadow-2xl"
                      onClick={resetData}>
                      <MdClose size={21} />
                      <ReactTooltip id="close-lb" effect="solid">
                        <span className="text-2xl">Close Lightbox</span>
                      </ReactTooltip>
                    </button>
                  </div>
                </div>
                <div className="absolute h-screen w-screen cursor-zoom-out bg-gray-600 opacity-90" />
                <TransformComponent>
                  <div className="relative flex h-screen w-screen flex-col items-center justify-center">
                    <div className="px-20">
                      <img
                        className="img-lightbox"
                        alt={data.imageAlt}
                        src={data.imageUrl}
                      />
                    </div>
                  </div>
                </TransformComponent>
              </div>
            )}
          </TransformWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
