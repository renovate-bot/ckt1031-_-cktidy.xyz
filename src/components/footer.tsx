import randomString from 'randomstring';
import { Fragment } from 'react';
import { BsGithub, BsInstagram, BsYoutube } from 'react-icons/bs';

import config from '../data/config.json';
import Link from './text/link';

function SocialMediaRow() {
  return (
    <div className="flex flex-row space-x-3 text-xl">
      <div className="cursor-pointer">
        <a href={config.author.social.instagram}>
          <BsInstagram />
        </a>
      </div>
      <div className="cursor-pointer">
        <a href={config.author.social.github}>
          <BsGithub />
        </a>
      </div>
      <div className="cursor-pointer">
        <a href={config.author.social.youtube}>
          <BsYoutube />
        </a>
      </div>
    </div>
  );
}

function FooterLinksAndCopyright() {
  return (
    <div>
      <div className="mb-1 flex flex-col items-center justify-center space-y-2 text-lg sm:flex-row sm:space-y-0 sm:space-x-2 md:text-xl">
        {config.footer.routes.map((item, index) => {
          return (
            <Fragment key={randomString.generate(5)}>
              <p className="footer-text-interaction">
                <Link href={item.href}>{item.name}</Link>
              </p>

              {config.footer.routes.length - 1 !== index && (
                <p className="hidden sm:block"> | </p>
              )}
            </Fragment>
          );
        })}
      </div>
      <p className="text-2xl">
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
