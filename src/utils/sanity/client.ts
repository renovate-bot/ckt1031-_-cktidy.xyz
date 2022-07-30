import { createClient } from 'next-sanity';

export const sanityConfig = {
  apiVersion: '2021-10-21',
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: false,
  dataset: 'production',
};

export default createClient(sanityConfig);
