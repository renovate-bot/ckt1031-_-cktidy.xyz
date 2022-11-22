import { createClient } from 'next-sanity';

export const sanityConfig = {
    apiVersion: '2021-10-21',
    projectId: process.env.SANITY_PROJECT_ID ?? 'n2cwm9uv',
    useCdn: false,
    dataset: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};

export default createClient(sanityConfig);
