import Link from 'next/link';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import { config } from '$lib/constants';

export default function NavigationBarPages() {
  const router = useRouter();

  return (
    <nav className="hidden flex-row gap-1 md:flex">
      {config.headbar.routes.map(item => (
        <Link href={item.href as never} key={item.name}>
          <p
            className={clsx(
              (router.asPath === '/'
                ? router.asPath === item.href
                : router.asPath.startsWith(item.href) && item.href !== '/') && 'text-orange-500',
              ' rounded hover:bg-gray-200 dark:hover:bg-gray-600',
              'block px-3 text-center',
            )}>
            {item.name}
          </p>
        </Link>
      ))}
    </nav>
  );
}
