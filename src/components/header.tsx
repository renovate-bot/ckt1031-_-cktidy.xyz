import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import config from '../constants/config.json';
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

export default function Header() {
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const scrollEvent = () => {
      setShowShadow(window.scrollY > 200);
    };

    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

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
