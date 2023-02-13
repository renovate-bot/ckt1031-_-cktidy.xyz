import { NextSeo } from 'next-seo';

import Image from '$components/image';

export default function HomePage() {
  const title = 'Home';
  const description = 'A cool website by ckt1031!';

  return (
    <>
      <NextSeo title={title} description={description} openGraph={{ description, title }} />
      <div className="my-10 flex flex-col items-center justify-center">
        <Image
          alt="ckt"
          src="/media/avatar.png"
          className="h-32 w-32 rounded-full"
          height={150}
          width={150}
        />
        <h1 className="mt-4 text-4xl font-bold">Chan Ka Tsun</h1>
        <p className="mt-2 text-center text-lg font-medium italic text-gray-600 dark:text-gray-300">
          A secondary school (Form 5) student in Hong Kong.
        </p>
      </div>
    </>
  );
}
