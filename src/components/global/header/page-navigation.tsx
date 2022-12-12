import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { config } from '$data/constants';

export default function NavigationBarPages() {
    const { route } = useRouter();

    return (
        <nav className="hidden flex-row gap-1 md:flex">
            {config.headbar.routes.map(item => {
                const className = clsx(
                    item.href === route && 'text-orange-500',
                    ' rounded hover:bg-gray-200 dark:hover:bg-gray-600',
                    'block px-3 text-center',
                );

                return (
                    <Link href={item.href as never} key={`NAVBAR-LINKS-${item.name.trim()}`}>
                        <p className={className}>{item.name}</p>
                    </Link>
                );
            })}
        </nav>
    );
}
