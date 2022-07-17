import type { ReactNode } from 'react';

import Footer from '../footer';
import Header from '../header';

interface LayoutArgs {
  children: ReactNode;
}

export default function ApplicationLayout({ children }: LayoutArgs) {
  return (
    <div className="layout-default xl:px-20">
      <Header />

      <div className="m-auto mb-10 max-w-4xl flex-1 overflow-y-auto px-4 sm:px-6 md:max-w-5xl xl:max-w-6xl xl:px-0">
        {children}
      </div>

      <Footer />
    </div>
  );
}
