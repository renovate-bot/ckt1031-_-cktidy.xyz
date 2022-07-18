import type { FallbackProps } from 'react-error-boundary';

export function ErrorDemostrationPage({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="error-page">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mt-10">
          <h1 className="text-6xl">Error occurred!</h1>
          <div className="mt-6 block max-w-md overflow-auto rounded bg-gray-300 text-xl text-red-600 shadow ring-1 ring-gray-400">
            <p className="p-2">{error.message}</p>
          </div>
          <button
            type="button"
            className="button-normal mt-5"
            onClick={resetErrorBoundary}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
