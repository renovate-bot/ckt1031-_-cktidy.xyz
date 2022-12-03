import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';

import Footer from '$components/global/footer';
import Header from '$components/global/header';

const ScollUpButton = dynamic(() => import('$components/scroll-up-button'));

export default function ApplicationLayout({ children }: PropsWithChildren) {
    return (
        <div className="layout-default">
            <Header />
            <div className="page-container">{children}</div>
            <Footer />
            <ScollUpButton />
        </div>
    );
}
