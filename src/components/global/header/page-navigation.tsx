import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { config } from '$lib/constants';

export default function NavigationBarPages() {
    const router = useRouter();

    return (
        <nav className="hidden flex-row gap-1 md:flex">
            {config.headbar.routes.map(item => (
                <Link href={item.href as never} key={item.name}>
                    <p
                        className={clsx(
                            item.href === router.pathname && 'text-orange-500',
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
