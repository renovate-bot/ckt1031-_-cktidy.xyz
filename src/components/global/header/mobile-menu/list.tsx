import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import { config } from '$lib/constants';

interface PagesProp {
  showMenu: boolean;
  toggleMenu: () => void;
}

export default function MenuNavigationList({ showMenu, toggleMenu }: PagesProp) {
  const pathname = usePathname() ?? '/';

  return (
    <div
      className={clsx(
        showMenu ? 'translate-y-0' : 'translate-y-full',
        'fixed left-0 z-10 mt-3 flex h-screen w-screen flex-col bg-gray-100 duration-150 ease-in-out dark:bg-gray-900',
      )}
    >
      <div className="overflow-auto">
        <div className="grid space-y-2 divide-y divide-gray-300 p-3 dark:divide-gray-700">
          {config.headbar.routes.map(item => (
            <Link href={item.href} key={item.name} onClick={toggleMenu}>
              <p
                className={clsx(
                  (pathname === '/'
                    ? pathname === item.href
                    : pathname.startsWith(item.href) && item.href !== '/') && 'text-orange-600',
                  'cursor-pointer p-3 text-center',
                )}
              >
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
