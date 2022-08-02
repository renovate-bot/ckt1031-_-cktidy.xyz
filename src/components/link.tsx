import cn from 'classnames';
import Link from 'next/link';
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { HiExternalLink } from 'react-icons/hi';

export default function Textlink({
  children,
  href,
  noDefaultColours = false,
  enableExternalIcon = false,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  noDefaultColours?: boolean;
  enableExternalIcon?: boolean;
}) {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  const pathname = href as never;

  if (isInternalLink) {
    return (
      <Link passHref href={{ pathname }}>
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
          'link-underline',
          noDefaultColours ? '' : 'text-blue-600 dark:text-blue-300',
        )}>
        {children}
      </span>
      {enableExternalIcon && (
        <span className="relative inline-block align-middle">
          <HiExternalLink />
        </span>
      )}
    </a>
  );
}
