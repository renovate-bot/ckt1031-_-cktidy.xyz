import { BsFillRssFill, BsGithub, BsInstagram, BsYoutube } from 'react-icons/bs';

import { config } from '$lib/constants';

import Link from '../../link';

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
  {
    href: config.author.social.feed,
    icon: <BsFillRssFill />,
  },
];

export default function SocialMediaRow() {
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
