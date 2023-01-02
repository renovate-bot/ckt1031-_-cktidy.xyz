import { NextSeo } from 'next-seo';

import SettingsDisableSnowFall from '$components/settings/disable-snowfall';
import SettingsThemeMode from '$components/settings/theme-mode';

export default function Settings() {
    return (
        <>
            <NextSeo title="Settings" openGraph={{ title: 'Settings' }} />
            <div className="mt-5 flex flex-col items-center">
                <h1 className="mb-5 text-3xl font-bold">Settings</h1>
                <div className="mb-10 flex flex-col gap-5">
                    <SettingsThemeMode />
                    <SettingsDisableSnowFall />
                </div>
            </div>
        </>
    );
}
