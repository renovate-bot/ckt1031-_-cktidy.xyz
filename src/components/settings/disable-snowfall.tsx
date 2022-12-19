import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

import { NormalSwitch } from '$components/switch';
import { DISABLE_SNOWFALL_EFFECT_KEY } from '$lib/constants';

export default function SettingsDisableSnowFall() {
    const [disabled, setDisabled] = useState(false);
    const [disableSnowfall, setDisableSnowfall] = useLocalStorage(
        DISABLE_SNOWFALL_EFFECT_KEY,
        false,
    );

    useEffect(() => {
        if (disableSnowfall) setDisabled(disableSnowfall);
    }, [disableSnowfall]);

    return (
        <div className="flex w-full flex-row items-center justify-between space-x-20">
            <p>Disable snowfall effect: </p>
            <NormalSwitch
                checked={disabled}
                onChange={status => {
                    setDisabled(status);
                    setDisableSnowfall(status);
                    alert('You need to refresh the page to see the changes. (F5)');
                }}
            />
        </div>
    );
}
