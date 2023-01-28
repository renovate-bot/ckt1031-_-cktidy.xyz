import { memo } from 'react';

import { config } from '$lib/constants';

import FooterLinks from './links';
import SocialMediaRow from './social-media';

function DefaultFooter() {
  return (
    <footer className="footer-default">
      <SocialMediaRow />
      <FooterLinks />
      <p>
        &copy; {new Date().getFullYear()} {config.author.name}
      </p>
    </footer>
  );
}

export default memo(DefaultFooter);
