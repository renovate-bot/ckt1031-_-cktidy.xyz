/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { lightboxAtom } from '../recoil/image';

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
    <div
      className={cn(
        data.display ? 'scale-100' : 'scale-0',
        'fixed inset-0 z-[100] h-screen w-screen duration-150',
      )}>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <button
          type="button"
          className="absolute h-screen w-screen bg-gray-700 opacity-90"
          onClick={resetData}
        />
        <div className="relative px-20">
          <img alt={data.imageAlt} src={data.imageUrl} />
        </div>
      </div>
    </div>
  );
}
