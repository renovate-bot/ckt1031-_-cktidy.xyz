import clsx from 'clsx';
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';

import Footer from '$components/global/footer';
import Header from '$components/global/header';

const ScollUpButton = dynamic(() => import('$components/scroll-up-button'));

export default function ApplicationLayout({
    children,
    className,
}: PropsWithChildren<{
    className?: string;
}>) {
    return (
        <div className={clsx('layout-default', className)}>
            <Header />
            <div className="page-container">{children}</div>
            <Footer />
            <ScollUpButton />
        </div>
    );
}
