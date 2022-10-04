import { NextSeo } from 'next-seo';

import Image from '../components/image';

export default function HomePage() {
  const title = 'Home';
  const description = 'A cool website by cktsun1031!';

  return (
    <>
      <NextSeo title={title} description={description} openGraph={{ title, description }} />
      <div className="mt-5 mb-10 flex flex-col items-start justify-start">
        <h1 className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-center text-4xl font-extrabold text-transparent">
          Chan Ka Tsun
        </h1>
        <div className="flex h-full flex-row justify-between space-x-10">
          <div className="mt-2 max-w-xl text-gray-700 dark:text-gray-400">
            <p className="text-black dark:text-white">A secondary school (Form 5) student in Hong Kong.</p>
            <div className="mt-3 space-y-1">
              <p>I started programming since 2022.</p>
              <p>Also love reading especially philosophy.</p>
              <p>Written this website for sharing my stuff and what I have found in my life.</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <Image lightboxEnabled alt="ckt" src="/media/ckt-face.png" height={1850 / 12} width={1470 / 12} />
          </div>
        </div>
      </div>
    </>
  );
}
