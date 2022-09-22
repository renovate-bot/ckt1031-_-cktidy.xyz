import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useEvent } from 'react-use';

import classnames from '../utils/classnames';

export default function ScollUpButton() {
  const [showScrollUpBtn, setShowScrollUpBtn] = useState(false);

  useEvent('scroll', () => {
    setShowScrollUpBtn(window.scrollY > 400);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        className={classnames(
          'transition-all ease-linear',
          'rounded-lg bg-gray-300 p-2 shadow-2xl hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-600',
        )}>
        <FaArrowUp />
      </button>
    </div>
  );
}
