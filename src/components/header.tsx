import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import randomString from 'randomstring';
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
      className="has-tooltip flex h-9 w-9 items-center justify-center rounded-lg ring-gray-300 transition-all hover:bg-gray-200 hover:dark:bg-gray-800"
      onClick={toggleThemes}>
      <div className="tooltip mt-20 mr-5">
        <p>{themeData.name}</p>
      </div>
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
    <div className="hidden flex-row space-x-1 md:flex">
      <div className="hidden flex-row space-x-1 md:flex">
        {config.headbar.routes.map(item => {
          const _className = classnames(
            item.href === route
              ? 'bg-gray-300 dark:bg-gray-800'
              : 'hover:bg-gray-200 dark:hover:bg-gray-600',
            'block py-2 px-3 rounded-lg duration-150 cursor-pointer text-center',
          );

          return (
            <Link href={item.href} key={randomString.generate(5)}>
              <span className={_className}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header>
      <div className="headbar-default">
        <div className="flex flex-row items-center justify-between py-3 px-5 text-2xl">
          <MobileMenu />
          <NavigationBarPages />
          <div className="flex flex-row">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
