'use client';

import { memo } from 'react';

import MobileMenu from '$components/global/header/mobile-menu';
import ThemeSwitcher from '$components/theme-switcher';

import NavigationBarPages from './page-navigation';

function Header() {
  return (
    <header className="flex w-screen justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full max-w-[800px] flex-row items-center justify-between px-5 py-1 text-lg md:py-2">
        <div className="flex flex-row items-center">
          <MobileMenu />
          <NavigationBarPages />
        </div>
        <div className="flex flex-row">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
