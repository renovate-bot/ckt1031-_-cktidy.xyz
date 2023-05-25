import { createClient } from '@sanity/client';

import 'server-only';
import { env } from '$env.mjs';
import { isDevelopment } from '$lib/constants';

export default createClient({
  apiVersion: '2021-03-25',
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: isDevelopment ? 'development' : 'production',
  useCdn: true,
});
