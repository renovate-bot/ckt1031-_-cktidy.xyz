'use client';

import { IconBug } from '@tabler/icons-react';

interface ErrorProps {
  error: Error;
  reset: unknown;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="mt-10 flex flex-col items-center text-center">
      <IconBug size={70} />
      <h2 className="mt-3 text-2xl font-bold">Something went wrong!</h2>
      <code className="mt-3 rounded-md bg-gray-700 p-2 text-sm text-white">{error.message}</code>
      <button
        type="button"
        onClick={reset as () => void}
        className="mt-5 rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}
