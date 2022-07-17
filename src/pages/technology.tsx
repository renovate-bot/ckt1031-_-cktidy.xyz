import dayjs from 'dayjs';
import { InferGetStaticPropsType } from 'next';
import { version } from 'react';

import packageInfo from '../../package.json';
import { DefaultMetaData } from '../components/seo';
import TextLink from '../components/text/link';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function TechnologyPage({
  nodeVersion,
  buildDate,
  reactVersion,
}: Props) {
  return (
    <>
      <DefaultMetaData
        description="Technologies used in this website and kind of toys I am playing with"
        title="Technology"
      />

      <div className="flex flex-col items-center text-2xl">
        <h1 className="text-5xl">Technology</h1>

        <div className="mt-10 space-y-8">
          <div className="mb-5">
            <p className="italic text-green-600 dark:text-green-500">
              This site was last modified at {buildDate}
            </p>

            <p>Edition: v{packageInfo.version}</p>
          </div>

          <div>
            <div className="mb-3 border-b-2 border-gray-500">
              <h2 className="mb-1 text-4xl">Quick Look</h2>
            </div>

            <div className="text-gray-600 dark:text-gray-400">
              <p>I have started this website since 06/07/2022</p>
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-3 border-b-2 border-gray-500">
              <h2 className="mb-1 text-4xl">Language</h2>
            </div>

            <div className="text-gray-600 dark:text-gray-400">
              <p>We will only provide English version at this moment.</p>

              <p>Programmed with TypeScript and HTML.</p>
            </div>
          </div>

          <div>
            <div className="mb-3 border-b-2 border-gray-500">
              <h2 className="mb-1 text-4xl">Frameworks</h2>
            </div>

            <div className="text-gray-600 dark:text-gray-400">
              <p>
                <TextLink href="https://nextjs.org/">Next.js</TextLink> which is
                based on <TextLink href="https://reactjs.org/">React</TextLink>{' '}
                v{reactVersion}.
              </p>

              <p>
                Built with{' '}
                <TextLink href="https://nodejs.org/">Node.js</TextLink>{' '}
                {nodeVersion}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function getStaticProps() {
  const _nodejsVersion = process.version;
  const _buildDate = dayjs(Date.now()).format('YYYY/MM/DD hh:mm');

  return {
    props: {
      nodeVersion: _nodejsVersion,
      buildDate: _buildDate,
      reactVersion: version,
    },
  };
}
