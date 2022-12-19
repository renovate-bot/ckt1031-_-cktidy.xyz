import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

import { NormalSwitch } from '$components/switch';
import { COUNTDOWN_BANNER_2023_CLOSED_KEY } from '$lib/constants';

export default function SettingsHide2023CountDownBanner() {
    const [hidden, setHidden] = useState(false);
    const [hideBanner, setDisableSnowfall] = useLocalStorage(
        COUNTDOWN_BANNER_2023_CLOSED_KEY,
        false,
    );

    useEffect(() => {
        if (hideBanner) setHidden(hideBanner);
    }, [hideBanner]);

    return (
        <div className="flex w-full flex-row items-center justify-between space-x-20">
            <p>Hide to-2023 countdown banner: </p>
            <NormalSwitch
                checked={hidden}
                onChange={status => {
                    setHidden(status);
                    setDisableSnowfall(status);
                    alert('You need to refresh the page to see the changes. (F5)');
                }}
            />
        </div>
    );
}
