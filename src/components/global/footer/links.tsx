import { Fragment } from 'react';
import Link from 'next/link';

import { config } from '$lib/constants';

export default function FooterLinks() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-3">
      {config.footer.routes.map(item => {
        return (
          <Fragment key={item.name.trim()}>
            <span className="footer-text-interaction">
              <Link href={item.href as never}>{item.name}</Link>
            </span>
          </Fragment>
        );
      })}
    </div>
  );
}
