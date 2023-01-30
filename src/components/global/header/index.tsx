import { memo } from 'react';

import MobileMenu from '$components/global/header/mobile-menu';
import ThemeSwitcher from '$components/theme-switcher';

import NavigationBarPages from './page-navigation';

function Header() {
  return (
    <header className="w-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-row items-center justify-between py-1 px-6 text-lg md:py-2 md:px-16">
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
