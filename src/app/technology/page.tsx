import type { Metadata } from 'next/types';

import PageTitle from '$components/page-title';
import { config } from '$lib/constants';

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'You can have a quick look of what technologies I have been using when building this website.',
};

export default function TechnologyPage() {
  const blueText = 'text-blue-500 dark:text-blue-300';

  return (
    <div className="mt-5 flex flex-col items-center text-left">
      <PageTitle
        title="Technology"
        description="You can have a quick look of what technologies I have been using when building this website."
      />
      <div className="mb-10 mt-3 w-full space-y-6 text-left">
        <p>
          This website is made with{' '}
          <a href="https://www.typescriptlang.org/" className={blueText}>
            TypeScript
          </a>
          ,{' '}
          <a href="https://tailwindcss.com/" className={blueText}>
            TailwindCSS
          </a>
          ,{' '}
          <a href="https://nextjs.org/" className={blueText}>
            Next.js
          </a>{' '}
          and <a href="https://reactjs.org/">React</a>.
        </p>
        <p>
          The source code is hosted on{' '}
          <a href={config.github_project_url} className={blueText}>
            Github Repository
          </a>
          .
        </p>
      </div>
    </div>
  );
}
