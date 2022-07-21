import { Fragment } from 'react';
import { BsGithub, BsInstagram, BsYoutube } from 'react-icons/bs';

import config from '../data/config.json';
import Link from './text/link';

function SocialMediaRow() {
  return (
    <div className="flex flex-row space-x-3 text-xl">
      <Link noDefaultColours href={config.author.social.instagram}>
        <BsInstagram />
      </Link>
      <Link noDefaultColours href={config.author.social.github}>
        <BsGithub />
      </Link>
      <Link noDefaultColours href={config.author.social.youtube}>
        <BsYoutube />
      </Link>
    </div>
  );
}

function FooterLinksAndCopyright() {
  return (
    <div>
      <div className="mt-1 mb-1 flex flex-col items-center justify-center space-y-2 text-lg sm:flex-row sm:space-y-0 sm:space-x-2 md:mt-0 md:text-xl">
        {config.footer.routes.map((item, index) => {
          return (
            <Fragment key={`FOOTER-LINKS-${index}`}>
              <p className="footer-text-interaction">
                <Link href={item.href}>{item.name}</Link>
              </p>
              
              {config.footer.routes.length - 1 !== index && (
                <p className="hidden text-gray-400 dark:text-gray-500 sm:block">
                  {' '}
                  |{' '}
                </p>
              )}
            </Fragment>
          );
        })}
      </div>
      <p className="text-xl">
        &copy; {new Date().getFullYear()} &#x2022; {config.author.name}
      </p>
    </div>
  );
}

export default function DefaultFooter() {
  return (
    <footer className="footer-theme">
      <SocialMediaRow />
      <FooterLinksAndCopyright />
    </footer>
  );
}
