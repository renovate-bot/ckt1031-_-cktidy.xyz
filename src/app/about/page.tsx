import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
} from '@tabler/icons-react';

import PageTitle from '$components/page-title';
import { config } from '$lib/constants';

export function generateMetadata() {
  return {
    title: 'About Me',
    description:
      '👋 Hey there! I am cktsun, here is the information about me and messages which is going to tell you! This is the place where you can find out more about me.',
  };
}

export default function AboutPage() {
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
    <div className="mt-5 flex flex-col items-center">
      <PageTitle
        title="About Me"
        description="👋 Hey there! I'm cktsun 😁, here's' the information about me and messages which is going to tell you! This is the place where you can find out more about me."
      />
      <div className="mb-10 mt-3 w-full space-y-6 text-left">
        <p>I am a High School Student from Hong Kong, currently F5, 16 yrs.</p>
        <p>
          I love reading, writing, and coding. I enjoy investigating philosophical questions and the
          intersection between technology and ethics
        </p>
        <p>
          I am passionate about exploring ideas and discussing them with others, and I enjoy sharing
          my thoughts and knowledge with people online.
        </p>
        <p>
          Additionally, I find programming to be a fascinating way to create and problem-solve, and
          I love the feeling of accomplishment that comes from building something new and useful
          with code.
        </p>
        <div className="flex flex-row flex-wrap gap-2 text-gray-800 dark:text-gray-300">
          {socialMedia.map(item => (
            <a
              key={item.name}
              href={item.link}
              className="base-border flex flex-row items-center gap-2 rounded-lg border bg-gray-100 p-2 dark:bg-gray-900"
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
  );
}
