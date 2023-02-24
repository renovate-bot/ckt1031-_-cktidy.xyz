import { Fragment } from 'react';
import Link from 'next/link';

import { config } from '$lib/constants';

export default function FooterLinks() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-3">
      {config.footer.routes.map(item => {
        return (
          <Fragment key={item.name.trim()}>
            <span>
              <Link href={item.href} className="text-sm text-blue-600 dark:text-blue-400">
                {item.name}
              </Link>
            </span>
          </Fragment>
        );
      })}
    </div>
  );
}
