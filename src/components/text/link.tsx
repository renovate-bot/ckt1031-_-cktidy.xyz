import cn from 'classnames';
import Link from 'next/link';
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { HiExternalLink } from 'react-icons/hi';

export default function Textlink({
  children,
  href,
  noDefaultColours = false,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  noDefaultColours?: boolean;
}) {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} rel="noopener noreferrer" target="_blank" {...rest}>
      <span
        className={cn(
          noDefaultColours ? '' : 'text-blue-600 dark:text-blue-300',
        )}>
        {children}
      </span>

      <span className="relative inline-block align-middle">
        <HiExternalLink />
      </span>
    </a>
  );
}
