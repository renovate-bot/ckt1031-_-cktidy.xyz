import type { Metadata } from 'next/types';

import LinkComponent from '$components/link';
import PageTitle from '$components/page-title';
import { config } from '$lib/constants';

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'You can have a quick look of what technologies I have been using when building this website.',
};

export default function TechnologyPage() {
  return (
    <div className="mt-5 flex w-full flex-col items-center text-left">
      <PageTitle
        title="Technology"
        description="You can have a quick look of what technologies I have been using when building this website."
      />
      <div className="mb-10 mt-3 w-full space-y-6 text-left">
        <p>
          This website is crafted using{' '}
          <LinkComponent
            href={{
              pathname: 'https://www.typescriptlang.org/',
            }}
          >
            TypeScript
          </LinkComponent>
          ,{' '}
          <LinkComponent
            href={{
              pathname: 'https://tailwindcss.com/',
            }}
          >
            TailwindCSS
          </LinkComponent>
          ,{' '}
          <LinkComponent
            href={{
              pathname: 'https://nextjs.org/',
            }}
          >
            Next.js
          </LinkComponent>{' '}
          and{' '}
          <LinkComponent
            href={{
              pathname: 'https://reactjs.org/',
            }}
          >
            React
          </LinkComponent>
          .
        </p>
        <p>
          <LinkComponent
            href={{
              pathname: 'https://www.sanity.io/',
            }}
          >
            Sanity.io
          </LinkComponent>{' '}
          is utilized to manage the contents of my website&apos;s posts.
        </p>
        <p>
          The source code is hosted on{' '}
          <LinkComponent
            href={{
              pathname: config.github_project_url,
            }}
          >
            Github Repository
          </LinkComponent>
          .
        </p>
      </div>
    </div>
  );
}
