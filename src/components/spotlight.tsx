import trim from 'lodash/trim';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import useAsyncEffect from 'use-async-effect';

import { pageList, PageListProp } from '../data/pages';

export default function Spotlight() {
  const { push } = useRouter();
  const [display, setDisplay] = useState(false);
  const [searchList, setSearchList] = useState<PageListProp[]>([]);

  useAsyncEffect(() => {
    setSearchList(pageList);
  }, []);

  const toggleSpotlightDisplay = useCallback(() => {
    setDisplay(value => !value);
  }, []);

  const onType = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) setSearchList(pageList);
    else {
      setSearchList(list => {
        return list.filter(page => {
          return page.name.toLowerCase().includes(value.toLowerCase());
        });
      });
    }
  }, []);

  return (
    <>
      <button
        type="button"
        className="rounded-lg p-2 ring-gray-300 hover:bg-gray-200 hover:dark:bg-gray-800"
        onClick={toggleSpotlightDisplay}>
        <FiSearch />
      </button>
      {display && (
        <div className="bbackdrop-blur fixed inset-0 z-50 h-screen w-screen bg-white/70 dark:bg-black/70">
          <div className="relative flex h-screen w-screen items-center justify-center">
            <div className="p-5">
              <div className="min-w-[450px] rounded-lg bg-gray-400 p-3 dark:bg-gray-600">
                <div className="border-b border-gray-500">
                  <div className="flex flex-row items-center justify-start space-x-4 px-3 py-1">
                    <FiSearch />
                    <input
                      onChange={onType}
                      placeholder="Search Here"
                      className="w-full bg-transparent p-1 placeholder:items-center"
                    />
                    <button type="button" onClick={toggleSpotlightDisplay}>
                      <IoMdClose />
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  {searchList.map(value => {
                    return (
                      <div
                        key={`SEARCHITEM-${trim(value.name)}`}
                        className="py-2 px-3">
                        <button
                          type="button"
                          onClick={() => {
                            push(value.href);
                            toggleSpotlightDisplay();
                          }}>
                          {value.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
