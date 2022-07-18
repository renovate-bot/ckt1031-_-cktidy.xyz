import { Ring } from '@uiball/loaders';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function LoadingPage() {
  const { resolvedTheme } = useTheme();
  const [themeName, setThemeName] = useState('light');

  useEffect(() => {
    if (resolvedTheme) setThemeName(resolvedTheme);
  }, [resolvedTheme, themeName]);

  return (
    <div className="mt-10 md:mt-20">
      <Ring color={themeName === 'dark' ? 'white' : 'black'} size={75} />
    </div>
  );
}

export function LoadingComponent() {
  const { resolvedTheme } = useTheme();
  const [themeName, setThemeName] = useState('light');

  useEffect(() => {
    if (resolvedTheme) setThemeName(resolvedTheme);
  }, [resolvedTheme, themeName]);

  return <Ring color={themeName === 'dark' ? 'white' : 'black'} size={50} />;
}
