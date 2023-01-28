import Link from 'next/link';

import clsx from 'clsx';
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { HiExternalLink } from 'react-icons/hi';

type TextLinkProp = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  noDefaultColours?: boolean;
  enableExternalIcon?: boolean;
};

export default function Textlink({
  children,
  href,
  noDefaultColours = false,
  enableExternalIcon = false,
  ...rest
}: TextLinkProp) {
  const isInternalLink = href?.startsWith('/');
  const isAnchorLink = href?.startsWith('#');

  if (isInternalLink) {
    return (
      <Link passHref href={href as never}>
        <span {...rest}>{children}</span>
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
      <span className={clsx(noDefaultColours ? '' : 'text-blue-600 dark:text-blue-300')}>
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
