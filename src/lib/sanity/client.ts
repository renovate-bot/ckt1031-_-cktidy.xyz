import { createClient } from 'next-sanity';

export const sanityConfig = {
  apiVersion: '2021-10-21',
  dataset: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
};

export default createClient(sanityConfig);
