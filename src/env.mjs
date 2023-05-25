import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PRODUCTION_URL: z.string().default('http://localhost:4072'),
  },
  client: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
  },
  runtimeEnv: {
    PRODUCTION_URL: process.env.PRODUCTION_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  },
});
