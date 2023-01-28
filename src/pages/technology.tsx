import { NextSeo } from 'next-seo';

import TextLink from '$components/link';
import { config } from '$lib/constants';

function DetailBlock() {
  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold">Technology</h1>
      <div className="my-5 max-w-2xl space-y-8">
        <div>
          <div className="base-border mb-3 border-b">
            <h2 className="mb-1 text-2xl">Quick Look</h2>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            <p>
              I have started this website since 06/07/2022
              <br />
              This is an experimental site and also a portifolio for me to learn new things.
            </p>
          </div>
        </div>
        <div className="mb-5">
          <div className="base-border mb-3 border-b">
            <h2 className="mb-1 text-2xl">Languages?</h2>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            <p>We only provide the English version at this moment.</p>
            <p>
              Written in HTML, CSS, JavaScript and{' '}
              <TextLink enableExternalIcon href="https://www.typescriptlang.org/">
                TypeScript
              </TextLink>
              .
            </p>
          </div>
        </div>
        <div>
          <div className="base-border mb-3 border-b">
            <h2 className="mb-1 text-2xl">Frameworks?</h2>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            <p>
              <TextLink enableExternalIcon href="https://nextjs.org/">
                Next.js
              </TextLink>{' '}
              which is based on{' '}
              <TextLink enableExternalIcon href="https://reactjs.org/">
                React
              </TextLink>
              .
            </p>
            <p>
              Styling with{' '}
              <TextLink enableExternalIcon href="https://tailwindcss.com/">
                TailwindCSS
              </TextLink>
              .
            </p>
            <p>
              Built with{' '}
              <TextLink enableExternalIcon href="https://nodejs.org/">
                Node.js
              </TextLink>
              .
            </p>
          </div>
        </div>
        <div>
          <div className="base-border mb-3 border-b">
            <h2 className="mb-1 text-2xl">How does this work?</h2>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            <p>
              Check our source code on{' '}
              <TextLink enableExternalIcon href={config.github_project_url}>
                Github Repository
              </TextLink>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TechnologyPage() {
  const title = 'Technology';
  const description =
    'You can have a quick look of what technologies I have been using when building this website.';

  return (
    <>
      <NextSeo title={title} description={description} openGraph={{ description, title }} />
      <DetailBlock />
    </>
  );
}
