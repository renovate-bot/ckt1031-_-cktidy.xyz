import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';

import Footer from '../components/footer';
import Header from '../components/header';

const ScollUpButton = dynamic(() => import('../components/scroll-up-button'));

export default function ApplicationLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className="layout-default">
      <Header />
      <div className="page-container">{children}</div>
      <Footer />
      <ScollUpButton />
    </div>
  );
}
