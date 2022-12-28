import clsx from 'clsx';
import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useEvent } from 'react-use';

export default function ScrollUpButton() {
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
                type="button"
                aria-label="Scroll To Top"
                style={{
                    opacity: showScrollUpBtn ? 1 : 0,
                    visibility: showScrollUpBtn ? 'visible' : 'hidden',
                }}
                onClick={scrollToTop}
                className={clsx(
                    'text-white shadow-lg transition-all ease-linear',
                    'rounded-lg bg-blue-500 p-2 hover:bg-blue-700 dark:bg-blue-900 hover:dark:bg-blue-700',
                )}>
                <FaArrowUp />
            </button>
        </div>
    );
}
