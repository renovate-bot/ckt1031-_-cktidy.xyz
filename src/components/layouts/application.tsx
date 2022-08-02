import type { PropsWithChildren } from 'react';

import Footer from '../footer';
import Header from '../header';
import ScollUpButton from '../scroll-up-button';

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
