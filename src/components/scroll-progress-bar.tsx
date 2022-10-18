import { useEffect, useState } from 'react';
import { useEvent } from 'react-use';

export default function ScrollProgressBar() {
    const [display, setDisplay] = useState(false);
    const [barPercentage, setPercentage] = useState(0);

    useEvent('scroll', () => {
        const windowHeight = document.documentElement.offsetHeight - window.innerHeight;

        window.requestAnimationFrame(() => {
            setPercentage(Math.floor((window.pageYOffset / windowHeight) * 100));
        });
    });

    useEffect(() => {
        const scrollbarHeight =
            window.innerHeight * (window.innerHeight / document.body.offsetHeight);

        setDisplay(scrollbarHeight < 500);
    }, []);

    return (
        <>
            {display && (
                <div
                    className="fixed top-0 left-0 z-50 h-1 bg-blue-700 shadow-xl dark:bg-blue-200"
                    style={{
                        width: `${barPercentage}%`,
                    }}
                />
            )}
        </>
    );
}
