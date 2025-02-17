import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import { config } from '$lib/constants';

export default function NavigationBarPages() {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-row gap-1 md:flex">
      {config.headbar.routes.map(item => (
        <Link href={item.href} key={item.name}>
          <p
            className={clsx(
              (pathname === '/'
                ? pathname === item.href.pathname
                : pathname.startsWith(item.href.pathname ?? '') && item.href.pathname !== '/') &&
                'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
              'text-gray-500 dark:text-gray-400',
              'rounded hover:text-gray-700 dark:hover:text-gray-200',
              'block px-2 py-0.5 text-center',
            )}
          >
            {item.name}
          </p>
        </Link>
      ))}
    </nav>
  );
}
