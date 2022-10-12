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
          'border border-gray-400 transition-all ease-linear dark:border-gray-500',
          'rounded-lg bg-blue-100 p-2 shadow-2xl hover:bg-blue-200 dark:bg-blue-900 hover:dark:bg-blue-700',
        )}>
        <FaArrowUp />
      </button>
    </div>
  );
}
