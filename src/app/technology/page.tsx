import type { Metadata } from 'next';

import TextLink from '$components/link';
import PageTitle from '$components/page-title';
import { config } from '$lib/constants';

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'You can have a quick look of what technologies I have been using when building this website.',
};

export default function TechnologyPage() {
  return (
    <div className="mt-5 flex flex-col items-center text-left">
      <PageTitle
        title="Technology"
        description="You can have a quick look of what technologies I have been using when building this website."
      />
      <div className="mb-10 mt-3 w-full space-y-6 text-left">
        <p>
          This website is made with{' '}
          <TextLink href="https://www.typescriptlang.org/">TypeScript</TextLink>,{' '}
          <TextLink href="https://tailwindcss.com/">TailwindCSS</TextLink>,{' '}
          <TextLink href="https://nextjs.org/">Next.js</TextLink> and{' '}
          <TextLink href="https://reactjs.org/">React</TextLink>.
        </p>
        <p>
          The source code is hosted on{' '}
          <TextLink href={config.github_project_url}>Github Repository</TextLink>.
        </p>
      </div>
    </div>
  );
}
