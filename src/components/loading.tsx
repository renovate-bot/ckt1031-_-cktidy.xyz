import { Ring } from '@uiball/loaders';
import { useTheme } from 'next-themes';

export function LoadingPage() {
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <div className="mt-10 md:mt-20">
      <Ring color={isDarkMode ? 'white' : 'black'} size={75} />
    </div>
  );
}

export function LoadingComponent() {
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === 'dark';

  return <Ring color={isDarkMode ? 'white' : 'black'} size={50} />;
}
