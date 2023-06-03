import { env } from '$env.mjs';

export function getNextImageUrl(url: string, quality: number) {
  const base = env.PRODUCTION_URL;

  return `${base}/_next/image?url=${encodeURI(url)}&amp;w=1920&amp;q=${quality}`;
}
