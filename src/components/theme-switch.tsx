import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { MdComputer, MdDarkMode, MdLightMode } from 'react-icons/md';

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
            <motion.button
                id="theme-switcher"
                type="button"
                aria-label="Toggle Theme Mode"
                className="p-2"
                whileTap={{
                    scale: 1.1,
                    rotate: 90,
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                onClick={toggleThemes}>
                {themeName === 'system' ? (
                    <MdComputer />
                ) : themeName === 'dark' ? (
                    <MdDarkMode />
                ) : (
                    <MdLightMode />
                )}
            </motion.button>
        </div>
    );
}
