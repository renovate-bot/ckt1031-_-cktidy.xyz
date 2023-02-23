import { useCallback, useEffect, useState } from 'react';

import { IconDeviceLaptop, IconMoon, IconSunHigh } from '@tabler/icons-react';
import { useTheme } from '@wits/next-themes';

type ThemeNames = 'system' | 'light' | 'dark';

export default function ThemeSwitcher() {
  const { setTheme, theme, themes } = useTheme();
  const [themeName, setThemeName] = useState<ThemeNames>('system');

  const toggleThemes = useCallback(() => {
    if (theme) {
      const themeIndex = themes.indexOf(theme) + 1;
      setTheme(themes[themeIndex % 3]);
    }
  }, [setTheme, theme, themes]);

  useEffect(() => {
    if (theme) setThemeName(theme as ThemeNames);
  }, [theme]);

  return (
    <div className="flex items-center justify-center rounded-lg ring-gray-300 hover:bg-gray-200 hover:dark:bg-gray-800">
      <button
        type="button"
        aria-label="Toggle Theme Mode"
        className="base-button-animation p-2"
        onClick={toggleThemes}
      >
        {themeName === 'system' && <IconDeviceLaptop />}
        {themeName === 'dark' && <IconMoon />}
        {themeName === 'light' && <IconSunHigh />}
      </button>
    </div>
  );
}
