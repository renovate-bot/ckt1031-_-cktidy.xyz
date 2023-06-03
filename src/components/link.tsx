import type { LinkProps } from 'next/link';
import Link from 'next/link';

import clsx from 'clsx';

interface Props extends LinkProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LinkComponent({ href, children, className, ...rest }: Props) {
  const blueText = 'text-blue-500 dark:text-blue-300 hover:underline';

  return (
    <Link href={href} className={clsx(blueText, className)} {...rest}>
      {children}
    </Link>
  );
}
