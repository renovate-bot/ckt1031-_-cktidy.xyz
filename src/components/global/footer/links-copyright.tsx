import Link from 'next/link';
import { Fragment } from 'react';

import { config } from '$data/constants';

export default function FooterLinksAndCopyright() {
    return (
        <div className="mt-1 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 md:mt-0">
            {config.footer.routes.map((item, index) => {
                return (
                    <Fragment key={`FOOTER-LINKS-${item.name.trim()}`}>
                        <span className="footer-text-interaction">
                            <Link href={item.href as never}>{item.name}</Link>
                        </span>

                        {config.footer.routes.length - 1 !== index && (
                            <span className="hidden text-gray-400 dark:text-gray-500 sm:block">
                                &#8226;
                            </span>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
}
