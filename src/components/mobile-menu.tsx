import classnames from 'classnames';
import { useRouter } from 'next/router';
import randomString from 'randomstring';
import { useCallback, useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';

import config from '../data/config.json';
import Link from './text/link';

type NavPages = {
  showMenu: boolean;
  toggleMenu: () => void;
};

function MenuNavigationPages({ showMenu, toggleMenu }: NavPages) {
  const { route } = useRouter();

  return (
    <div
      className={classnames(
        showMenu ? 'translate-y-0' : 'translate-y-full',
        'fixed left-0 z-10 mt-3 flex h-screen w-screen flex-col bg-gray-100 duration-150 ease-in-out dark:bg-gray-900',
      )}>
      <div className="flex flex-col items-center justify-center space-y-2 overflow-auto">
        {config.headbar.routes.map(item => {
          const _className = classnames(
            item.href === route
              ? 'bg-gray-300 dark:bg-gray-800'
              : 'hover:bg-gray-200 dark:hover:bg-gray-600',
            'block py-2 px-3 rounded-lg duration-150 cursor-pointer text-center',
          );

          return (
            <button
              type="button"
              className={_className}
              key={randomString.generate(5)}
              onClick={toggleMenu}>
              <Link href={item.href}>{item.name}</Link>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function NavigationBarMobileMenu() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = useCallback(() => {
    setShowMenu(state => {
      document.body.style.overflow = state ? 'auto' : 'hidden';
      return !state;
    });
  }, []);

  return (
    <div className="has-tooltip md:hidden">
      <button className="item-center flex" onClick={toggleMenu} type="button">
        {showMenu ? <MdClose /> : <MdMenu />}
      </button>
      <div className="tooltip z-10">
        <p>Navigation Menu</p>
      </div>
      <MenuNavigationPages showMenu={showMenu} toggleMenu={toggleMenu} />
    </div>
  );
}
