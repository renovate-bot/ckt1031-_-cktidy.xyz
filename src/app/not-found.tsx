import Link from 'next/link';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: '404',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="mb-10 mt-5 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <p className="mb-4 text-6xl font-bold">404</p>
        <p className="text-xl md:text-2xl">
          Oops! It seems like the page you were searching for does not exist.
        </p>
      </div>
      <Link href="/">
        <button className="button-normal mt-6" type="button">
          Back to home
        </button>
      </Link>
    </div>
  );
}
