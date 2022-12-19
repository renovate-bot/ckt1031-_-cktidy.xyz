import clsx from 'clsx';
import { memo, useState } from 'react';
import { useEvent } from 'react-use';

import MobileMenu from '$components/global/header/mobile-menu';
import TimerTo2023 from '$components/special/2023-timer';
import ThemeSwitcher from '$components/theme-switch';

import NavigationBarPages from './page-navigation';

function Header() {
    const [showShadow, setShowShadow] = useState(false);

    useEvent('scroll', () => {
        setShowShadow(window.scrollY > 200);
    });

    return (
        <header
            className={clsx(
                showShadow && 'shadow-md',
                'headbar-default w-screen bg-gray-100 dark:bg-gray-900',
            )}>
            <TimerTo2023 />
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
