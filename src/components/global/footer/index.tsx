import { memo } from 'react';

import { config } from '$lib/constants';

import LinksAndCopyright from './links-copyright';
import SocialMediaRow from './social-media';

function DefaultFooter() {
    return (
        <footer className="footer-default text-base">
            <SocialMediaRow />
            <LinksAndCopyright />
            <p>
                &copy; {new Date().getFullYear()} &#x2022; {config.author.name}
            </p>
        </footer>
    );
}

export default memo(DefaultFooter);
