import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { MdComputer, MdDarkMode, MdLightMode } from 'react-icons/md';

enum Themes {
  Dark = 'dark',
  System = 'system',
  Light = 'light',
}

export default function ThemeSwitcher() {
  const { setTheme, theme, themes } = useTheme();
  const [themeName, setThemeName] = useState<string>(Themes.System);

  const toggleThemes = useCallback(() => {
    if (theme) {
      const themeIndex = themes.indexOf(theme) + 1;
      setTheme(themes[themeIndex % 3]);
    }
  }, [setTheme, theme, themes]);

  useEffect(() => {
    if (theme) setThemeName(theme);
  }, [theme]);

  return (
    <div className="flex items-center justify-center rounded-lg ring-gray-300 hover:bg-gray-200 hover:dark:bg-gray-800">
      <motion.button
        aria-label="Toggle Theme Mode"
        type="button"
        className="p-2"
        whileTap={{
          scale: 1.5,
          rotate: 180,
        }}
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        onClick={toggleThemes}>
        {themeName === Themes.System ? (
          <MdComputer />
        ) : themeName === Themes.Dark ? (
          <MdDarkMode />
        ) : (
          <MdLightMode />
        )}
      </motion.button>
    </div>
  );
}
