import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { MdComputer, MdDarkMode, MdLightMode } from 'react-icons/md';

import config from '../data/config.json';
import MobileMenu from './mobile-menu';
import Link from './text/link';

interface ThemeData {
  name: string;
  index: number;
}

enum Themes {
  Dark = 'dark',
  System = 'system',
  Light = 'light',
}

function ThemeSwitcher() {
  const { setTheme, theme, themes } = useTheme();
  const [themeData, setThemeData] = useState<ThemeData>({
    name: Themes.System,
    index: themes.indexOf(Themes.System),
  });

  useEffect(() => {
    if (theme) {
      setThemeData({
        name: theme,
        index: themes.indexOf(theme),
      });
    }
  }, [theme, themes]);

  const toggleThemes = useCallback(() => {
    const themeIndex = themeData.index + 1;
    setTheme(themes[themeIndex % 3]);
  }, [setTheme, themeData.index, themes]);

  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-lg ring-gray-300 transition-all hover:bg-gray-200 hover:dark:bg-gray-800"
      onClick={toggleThemes}>
      {themeData.name === Themes.System ? (
        <MdComputer />
      ) : themeData.name === Themes.Dark ? (
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
      {config.headbar.routes.map((item, index) => {
        const _className = classnames(
          item.href === route && 'text-orange-500',
          ' hover:bg-gray-200 dark:hover:bg-gray-600 rounded',
          'block py-2 px-3 text-center link-underline',
        );

        return (
          <Link href={item.href} key={`NAVBAR-LINKS-${index}`}>
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
