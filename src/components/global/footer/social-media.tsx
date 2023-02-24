import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandYoutube,
  IconRss,
} from '@tabler/icons-react';

import { config } from '$lib/constants';

const footerSocialLinks = [
  {
    href: config.author.social.instagram,
    icon: <IconBrandInstagram />,
  },
  {
    href: config.author.social.github,
    icon: <IconBrandGithub />,
  },
  {
    href: config.author.social.youtube,
    icon: <IconBrandYoutube />,
  },
  {
    href: config.author.social.feed,
    icon: <IconRss />,
  },
];

export default function SocialMediaRow() {
  return (
    <div className="flex flex-row gap-3">
      {footerSocialLinks.map(({ href, icon }) => (
        <a href={href} key={href}>
          {icon}
        </a>
      ))}
    </div>
  );
}
