import classnames from 'classnames';
import trim from 'lodash/trim';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { MdComputer, MdDarkMode, MdLightMode } from 'react-icons/md';

import config from '../data/config.json';
import MobileMenu from './mobile-menu';
import Link from './text/link';

enum Themes {
  Dark = 'dark',
  System = 'system',
  Light = 'light',
}

function ThemeSwitcher() {
  const { setTheme, theme, themes } = useTheme();
  const [themeName, setThemeName] = useState<string>(Themes.System);

  const toggleThemes = useCallback(() => {
    if (theme) {
      const themeIndex = themes.indexOf(theme) + 1;
      setTheme(themes[themeIndex % 3]);
    }
  }, [setTheme, theme, themes]);

  useEffect(() => {
    if (theme) setThemeName(theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-lg ring-gray-300 transition-all hover:bg-gray-200 hover:dark:bg-gray-800"
      onClick={toggleThemes}>
      {themeName === Themes.System ? (
        <MdComputer />
      ) : themeName === Themes.Dark ? (
        <MdDarkMode />
      ) : (
        <MdLightMode />
      )}
    </button>
  );
}

function NavigationBarPages() {
  const { route } = useRouter();

  return (
    <nav className="hidden flex-row space-x-1 md:flex">
      {config.headbar.routes.map(item => {
        const _className = classnames(
          item.href === route && 'text-orange-500',
          ' hover:bg-gray-200 dark:hover:bg-gray-600 rounded',
          'block py-2 px-3 text-center link-underline',
        );

        return (
          <Link href={item.href} key={`NAVBAR-LINKS-${trim(item.name)}`}>
            <p className={_className}>{item.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Header() {
  return (
    <header>
      <div className="headbar-default fixed w-screen backdrop-blur-lg">
        <div className="absolute bg-gray-500" />
        <div className="relative flex flex-row items-center justify-between py-3 px-6 text-2xl md:px-16">
          <div className="flex flex-row items-center">
            {/* <p className='hidden md:block md:mr-5'>{config.sitename}</p> */}
            <MobileMenu />
            <NavigationBarPages />
          </div>
          <div className="flex flex-row">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
