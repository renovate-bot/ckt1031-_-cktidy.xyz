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
      <div className="m-auto mt-20 mb-10 max-w-4xl flex-1 overflow-y-auto px-4 sm:px-6 md:max-w-5xl xl:max-w-6xl xl:px-0">
        {children}
      </div>
      <Footer />
      <ScollUpButton />
    </div>
  );
}
