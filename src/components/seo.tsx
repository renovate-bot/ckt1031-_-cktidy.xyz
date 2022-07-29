import Head from 'next/head';

import config from '../data/config.json';

const isProduction = process.env.NODE_ENV === 'production';

interface DefaultMetaDataType {
  title: string;
  description?: string;
  disableIndex?: boolean;
}

export function DefaultMetaData({
  title,
  description = '',
  disableIndex = false,
}: DefaultMetaDataType) {
  const titleDisplayName = `${title} - ${config.name}`;

  return (
    <Head>
      <title>{titleDisplayName}</title>
      <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible" />
      <meta content={title} property="og:title" />
      <meta content={config.name} property="og:site_name" />
      {description && description.length > 0 && (
        <>
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
        </>
      )}
      <meta
        content={
          !isProduction || disableIndex
            ? 'noindex, nofollow, noarchive, nosnippet'
            : 'follow, index'
        }
        name="robots"
      />
    </Head>
  );
}
