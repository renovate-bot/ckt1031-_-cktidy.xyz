import Link from 'next/link';
import { FaRegSadTear } from 'react-icons/fa';

import { DefaultMetaData } from '../components/seo';

export default function NotFoundPage() {
  return (
    <>
      <DefaultMetaData disableIndex title="404" />

      <div className="flex flex-col items-center justify-center">
        <div className="xs:mt-40 flex flex-col items-center justify-center md:flex-row">
          <div className="flex flex-col text-center">
            <div className="mb-4 flex flex-row items-center justify-center space-x-4 text-8xl">
              <div className="hidden md:block">
                <FaRegSadTear />
              </div>

              <p className="mb-4 md:text-left">404</p>
            </div>

            <p className="text-3xl md:text-5xl">
              URL request cannot be found from the server!
            </p>

            <div className="mt-4 text-2xl text-green-500">
              <p>Have you double check the URL?</p>
            </div>
          </div>
        </div>

        <Link href="/" passHref>
          <button className="button-normal mt-5" type="button">
            Navigate to HOME
          </button>
        </Link>
      </div>
    </>
  );
}
