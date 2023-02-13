import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
} from '@tabler/icons-react';
import { NextSeo } from 'next-seo';

import PageTitle from '$components/page-title';
import { config } from '$lib/constants';

export default function AboutPage() {
  const title = 'About Me';
  const description = 'Information about cktsun and messages which is going to tell you!';

  const socialMedia = [
    {
      name: 'Discord',
      icon: IconBrandDiscord,
      link: config.author.social.discordServer,
    },
    {
      name: 'Github',
      icon: IconBrandGithub,
      link: config.author.social.github,
    },
    {
      name: 'Instagram',
      icon: IconBrandInstagram,
      link: config.author.social.instagram,
    },
    {
      name: 'Twitter',
      icon: IconBrandTwitter,
      link: config.author.social.twitter,
    },
  ];

  return (
    <>
      <NextSeo title={title} description={description} openGraph={{ description, title }} />
      <div className="mt-5 flex flex-col items-center">
        <PageTitle
          title="About Me"
          description="👋 Hey there! I'm cktsun 😁, here's' the information about me and messages which is going to tell you! This is the place where you can find out more about me."
        />
        <div className="mb-10 w-full space-y-10 text-left">
          <div className="mt-4 flex flex-row flex-wrap gap-6 text-gray-800 dark:text-gray-300">
            {socialMedia.map(item => (
              <a
                key={item.name}
                href={item.link}
                className="base-border flex flex-row items-center gap-2 rounded border bg-gray-100 p-2 dark:bg-gray-900"
                target="_blank"
                rel="noreferrer"
              >
                <item.icon size={23} />
                <p className="text-xl">{item.name}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
