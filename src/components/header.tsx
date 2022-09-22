import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { useEvent } from 'react-use';

import config from '../data/config.json';
import classnames from '../utils/classnames';
import Link from './link';
import MobileMenu from './mobile-menu';
import Spotlight from './spotlight';
import ThemeSwitcher from './theme-switch';

function NavigationBarPages() {
  const { route } = useRouter();

  return (
    <nav className="hidden flex-row gap-1 md:flex">
      {config.headbar.routes.map(item => {
        const className = classnames(
          item.href === route && 'text-orange-500',
          ' hover:bg-gray-200 dark:hover:bg-gray-600 rounded',
          'block py-1 px-3 text-center link-underline',
        );

        return (
          <Link href={item.href} key={`NAVBAR-LINKS-${item.name.trim()}`}>
            <p className={className}>{item.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}

function Header() {
  const [showShadow, setShowShadow] = useState(false);

  useEvent('scroll', () => {
    setShowShadow(window.scrollY > 200);
  });

  return (
    <header
      className={classnames(
        showShadow && 'shadow-md',
        'headbar-default fixed w-screen bg-gray-100 dark:bg-gray-900',
      )}>
      <div className="flex flex-row items-center justify-between py-2 px-6 text-lg md:py-3 md:px-16">
        <div className="flex flex-row items-center">
          <MobileMenu />
          <NavigationBarPages />
        </div>
        <div className="flex flex-row">
          <Spotlight />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
