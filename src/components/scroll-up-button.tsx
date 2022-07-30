import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScollUpButton() {
  const [showScrollUpBtn, setShowScrollUpBtn] = useState(false);

  useEffect(() => {
    const scrollEvent = () => {
      setShowScrollUpBtn(window.scrollY > 400);
    };

    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [showScrollUpBtn]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="fixed right-6 bottom-6 flex flex-row">
      <button
        aria-label="Scroll To Top"
        type="button"
        style={{
          opacity: showScrollUpBtn ? 1 : 0,
          visibility: showScrollUpBtn ? 'visible' : 'hidden',
        }}
        onClick={scrollToTop}
        className={cn(
          'transition-all ease-linear',
          'rounded-lg bg-gray-300 p-2 shadow-2xl hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-600',
        )}>
        <FaArrowUp />
      </button>
    </div>
  );
}
