import dayjs from 'dayjs';
import type { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import packageInfo from '../../package.json';
import TextLink from '../components/link';
import config from '../data/config.json';

function Details(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex flex-col items-center text-2xl">
      <h1 className="text-5xl">Technology</h1>
      <div className="mt-10 space-y-8">
        <div className="mb-5">
          <p className="italic text-green-600 dark:text-green-500">
            Last built at {props.buildDate}
          </p>
          <p>Edition: v{packageInfo.version}</p>
        </div>
        <div>
          <div className="mb-3 border-b-2 border-gray-500">
            <h2 className="mb-1 text-4xl">Quick Look</h2>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            <p>
              I have started this website since 06/07/2022
              <br />
              Actually this is an experimental site
            </p>
          </div>
        </div>
        <div className="mb-5">
          <div className="mb-3 border-b-2 border-gray-500">
            <h2 className="mb-1 text-4xl">Language</h2>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            <p>We only provide English version at this moment.</p>
            <p>Programmed with HTML and TypeScript.</p>
          </div>
        </div>
        <div>
          <div className="mb-3 border-b-2 border-gray-500">
            <h2 className="mb-1 text-4xl">Frameworks</h2>
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
              Built with{' '}
              <TextLink enableExternalIcon href="https://nodejs.org/">
                Node.js
              </TextLink>
              .
            </p>
          </div>
        </div>
        <div>
          <div className="mb-3 border-b-2 border-gray-500">
            <h2 className="mb-1 text-4xl">How this works</h2>
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

export default function TechnologyPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const title = 'Technology';
  const description =
    'You can have a quick look of what technologies I have been using when building this website.';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <Details {...props} />
    </>
  );
}

export function getStaticProps() {
  const buildDate = dayjs(Date.now()).format('YYYY/MM/DD hh:mm');

  return {
    props: {
      buildDate,
    },
  };
}
