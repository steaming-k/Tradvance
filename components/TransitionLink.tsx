'use client';

import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { usePageTransition } from './PageTransitionProvider';

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

export function TransitionLink({ href, children, onClick, ...rest }: Props) {
  const { navigate } = usePageTransition();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    navigate(typeof href === 'string' ? href : href.toString());
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
