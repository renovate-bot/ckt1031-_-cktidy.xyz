import Head from 'next/head';

import config from '../data/config.json';

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
      {description && description.length > 0 ? (
        <>
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
        </>
      ) : undefined}
      {disableIndex ? (
        <meta content="noindex, nofollow, noarchive, nosnippet" name="robots" />
      ) : (
        <meta content="follow, index" name="robots" />
      )}
    </Head>
  );
}
