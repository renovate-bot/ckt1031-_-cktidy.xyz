import { NextSeo } from 'next-seo';

import Image from '$components/image';

export default function HomePage() {
  const title = 'Home';
  const description = 'A cool website by ckt1031!';

  return (
    <>
      <NextSeo title={title} description={description} openGraph={{ description, title }} />
      <div className="mt-5 mb-10 flex flex-col items-start justify-start">
        <div className="flex h-full flex-row justify-between space-x-10">
          <div className="mt-2 max-w-xl text-gray-700 dark:text-gray-400">
            <h1 className="bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-4xl font-bold text-transparent dark:from-gray-200 dark:to-gray-500">
              cktsun
            </h1>
            <p className="mt-3 text-black dark:text-white">
              A secondary school (Form 5) student in Hong Kong.
            </p>
            <div className="mt-3 space-y-1">
              <p>I love programming and reading.</p>
              <p>Written this website for sharing what I have found in my life.</p>
            </div>
          </div>
          <Image
            alt="ckt"
            src="/media/avatar.png"
            // Disable image shrinking when screen width is less than 150px
            className="h-32 w-32 rounded-full"
            height={150}
            width={150}
          />
        </div>
      </div>
    </>
  );
}
