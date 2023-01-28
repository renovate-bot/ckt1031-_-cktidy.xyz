import Link from 'next/link';

import clsx from 'clsx';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';

import type { BlogPostLobbyProps } from '$lib/types';

export default function Pagination({
  pagination,
}: Omit<BlogPostLobbyProps, 'allPosts' | 'displayPosts'>) {
  const isTopPage = pagination.currentPage - 1 === 1;
  const toPagePath = '/blog/page/[number]';

  return (
    <div className="border-t-2 border-gray-400 dark:border-gray-600">
      <div className="mt-3 flex flex-row justify-between px-2 py-1">
        <div>
          {pagination.currentPage - 1 > 0 && (
            <Link
              passHref
              href={{
                pathname: isTopPage ? '/blog' : toPagePath,
                query: {
                  number: (pagination.currentPage - 1).toString(),
                },
              }}>
              <button
                type="button"
                className="flex flex-row items-center space-x-2 rounded-lg p-1 hover:bg-gray-200 hover:dark:bg-gray-700">
                <FaRegArrowAltCircleLeft />
                <p className="hidden md:block">Previous</p>
              </button>
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center justify-center space-x-1">
          {pagination.currentPage - 2 > 0 && <div>...</div>}
          {Array.from({ length: pagination.totalPages }).map((_, index) => {
            const pageNumber = index + 1;

            if (
              pageNumber >= pagination.currentPage - 3 &&
              pageNumber <= pagination.currentPage + 3
            ) {
              return (
                <div
                  className={clsx(
                    pagination.currentPage === pageNumber && 'bg-orange-400 dark:bg-orange-700',
                    'rounded-lg px-2 py-1',
                  )}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}>
                  <Link
                    passHref
                    href={{
                      pathname: toPagePath,
                      query: {
                        number: pageNumber.toString(),
                      },
                    }}>
                    {pageNumber}
                  </Link>
                </div>
              );
            }

            return <></>;
          })}
          {pagination.currentPage + 2 - pagination.totalPages < 0 && <div>...</div>}
        </div>
        <div>
          {pagination.currentPage + 1 <= pagination.totalPages && (
            <Link
              passHref
              href={{
                pathname: toPagePath,
                query: {
                  number: (pagination.currentPage + 1).toString(),
                },
              }}>
              <button
                type="button"
                className="flex flex-row items-center space-x-2 rounded-lg p-1 hover:bg-gray-200 hover:dark:bg-gray-700">
                <p className="hidden md:block">Next</p>
                <FaRegArrowAltCircleRight />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
