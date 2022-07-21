import Link from 'next/link';

import { DefaultMetaData } from '../components/seo';

export default function NotFoundPage() {
  return (
    <>
      <DefaultMetaData disableIndex title="404" />
      <div className="flex flex-col items-center justify-center">
        <div className="xs:mt-40 flex flex-col items-center justify-center md:flex-row">
          <div className="flex flex-col text-center">
            <div className="mb-4 text-8xl">
              <p>404</p>
            </div>
            <p className="text-3xl md:text-5xl">Did you get lost?</p>
            <div className="mt-4 text-2xl text-red-500">
              <p>URL requested cannot be found!</p>
            </div>
          </div>
        </div>
        <Link passHref href="/">
          <button className="button-normal mt-6" type="button">
            Return to home
          </button>
        </Link>
      </div>
    </>
  );
}
