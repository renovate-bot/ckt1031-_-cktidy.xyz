import clsx from 'clsx';
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';

import Footer from '$components/global/footer';
import Header from '$components/global/header';

const ScrollUpButton = dynamic(() => import('$components/scroll-up-button'));

export default function ApplicationLayout({ children }: PropsWithChildren) {
    return (
        <div className={clsx('flex h-screen flex-col justify-between overflow-x-hidden')}>
            <Header />
            <main className="m-auto flex w-full grow flex-col items-center px-5">{children}</main>
            <Footer />
            <ScrollUpButton />
        </div>
    );
}
