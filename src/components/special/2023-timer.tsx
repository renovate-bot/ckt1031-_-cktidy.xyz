import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

import { COUNTDOWN_BANNER_2023_CLOSED_KEY } from '$data/constants';

export default function TimerTo2023() {
    const [timer, setTimer] = useState('N/A');
    const [closed, setClosed] = useState<boolean>();

    useEffect(() => {
        const isClosed = localStorage.getItem(COUNTDOWN_BANNER_2023_CLOSED_KEY);

        // Automatically close the banner after 2023/01/01
        setClosed(isClosed === 'true' || new Date() > new Date('2023/01/01'));

        const timer = setInterval(() => {
            const now = new Date();
            const target = new Date('2023/01/01');

            const diff = target.getTime() - now.getTime();

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(timer);
    }, [setClosed]);

    const onClose = () => {
        setClosed(true);
        localStorage.setItem(COUNTDOWN_BANNER_2023_CLOSED_KEY, 'true');
    };

    return (
        <>
            {typeof closed === 'boolean' && !closed && (
                <div className="flex h-[50px] w-full flex-row bg-green-400 px-6 shadow dark:bg-green-800">
                    <Image
                        src="/media/christmas-tree.png"
                        alt="ornaments"
                        // Disable image to be sketcherized and ignore the upper h-[50px] limit of the parent and let it cross the parent's border
                        className="z-10 mt-2 h-[50px] object-contain md:h-[70px]"
                        width={70}
                        height={128}
                    />
                    <div className="flex w-full flex-row items-center justify-between md:py-2">
                        <div className="flex flex-row items-center">
                            <p className="text-sm font-extrabold md:text-2xl">2023 Countdown!</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <p className="base-border rounded-md border bg-gray-100 py-1 px-2    text-xs font-bold dark:bg-gray-800 md:text-xl">
                                {timer}
                            </p>
                            <button type="button" onClick={onClose}>
                                <IoCloseSharp size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
