import type { UrlObject } from 'node:url';
import Link from 'next/link';

import clsx from 'clsx';

interface Props {
  className?: string;
  href: UrlObject | __next_route_internal_types__.RouteImpl<''>;
  children?: React.ReactNode;
  [x: string]: unknown;
}

export default function LinkComponent({ href, children, className, ...rest }: Props) {
  const blueText = 'text-blue-500 dark:text-blue-300 hover:underline';

  return (
    <Link href={href} className={clsx(blueText, className)} {...rest}>
      {children}
    </Link>
  );
}
