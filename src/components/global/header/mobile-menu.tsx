import { useState } from 'react';
import { useRouter } from 'next/router';

import clsx from 'clsx';
import { MdClose, MdMenu } from 'react-icons/md';

import { config } from '$lib/constants';

import Link from '../../link';

interface PagesProp {
  showMenu: boolean;
  toggleMenu: () => void;
}

function MenuNavigationPages({ showMenu, toggleMenu }: PagesProp) {
  const { route } = useRouter();

  return (
    <div
      className={clsx(
        showMenu ? 'translate-y-0' : 'translate-y-full',
        'fixed left-0 z-10 mt-3 flex h-screen w-screen flex-col bg-gray-100 duration-150 ease-in-out dark:bg-gray-900',
      )}>
      <div className="overflow-auto">
        <div className="grid space-y-2 divide-y divide-gray-300 p-3 dark:divide-gray-700">
          {config.headbar.routes.map(item => (
            <button
              type="button"
              key={item.name}
              className={clsx(
                item.href === route && 'text-orange-600 dark:text-orange-300',
                'cursor-pointer p-3 text-center',
              )}
              onClick={toggleMenu}>
              <Link href={item.href}>{item.name}</Link>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NavigationBarMobileMenu() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(state => {
      document.body.style.overflow = state ? 'auto' : 'hidden';
      return !state;
    });
  };

  return (
    <div className="md:hidden">
      <button
        id="mobile-nav-menu"
        aria-label="Mobile Menu"
        type="button"
        className="flex items-center"
        onClick={toggleMenu}>
        {showMenu ? <MdClose /> : <MdMenu />}
      </button>
      <MenuNavigationPages showMenu={showMenu} toggleMenu={toggleMenu} />
    </div>
  );
}
