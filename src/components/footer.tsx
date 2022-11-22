import { Fragment, memo } from 'react';
import { BsGithub, BsInstagram, BsYoutube } from 'react-icons/bs';

import config from '$data/config.json';

import Link from './link';

const footerSocialLinks = [
    {
        href: config.author.social.instagram,
        icon: <BsInstagram />,
    },
    {
        href: config.author.social.github,
        icon: <BsGithub />,
    },
    {
        href: config.author.social.youtube,
        icon: <BsYoutube />,
    },
];

function SocialMediaRow() {
    return (
        <div className="flex flex-row gap-3">
            {footerSocialLinks.map(({ href, icon }) => (
                <Link noDefaultColours href={href} key={href}>
                    {icon}
                </Link>
            ))}
        </div>
    );
}

function FooterLinksAndCopyright() {
    return (
        <div className="mt-1 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 md:mt-0">
            {config.footer.routes.map((item, index) => {
                return (
                    <Fragment key={`FOOTER-LINKS-${item.name.trim()}`}>
                        <span className="footer-text-interaction">
                            <Link href={item.href}>{item.name}</Link>
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

function DefaultFooter() {
    return (
        <footer className="footer-default text-base">
            <SocialMediaRow />
            <FooterLinksAndCopyright />
            <p>
                &copy; {new Date().getFullYear()} &#x2022; {config.author.name}
            </p>
        </footer>
    );
}

export default memo(DefaultFooter);
