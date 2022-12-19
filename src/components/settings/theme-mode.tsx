import { useTheme } from 'next-themes';

export default function SettingsThemeMode() {
    const { setTheme, theme, themes } = useTheme();

    return (
        <div className="flex w-full flex-row items-center justify-between space-x-20">
            <p>Theme Mode: </p>
            <select
                className="base-input-box"
                value={theme}
                onChange={e => {
                    setTheme(e.target.value);
                }}>
                {themes.map(theme => (
                    <option key={theme} value={theme}>
                        {theme}
                    </option>
                ))}
            </select>
        </div>
    );
}
