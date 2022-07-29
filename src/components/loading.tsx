import { Ring } from '@uiball/loaders';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

export function LoadingPage() {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  const themeStyle = useMemo(() => {
    return {
      color: isDark ? 'white' : 'black',
    };
  }, [isDark]);

  return (
    <div className="mt-10 overflow-hidden md:mt-20">
      <Ring color={themeStyle.color} size={75} />
    </div>
  );
}
