import type { ErrorProps } from 'next/error';
import NextErrorComponent from 'next/error';

import { captureException, flush } from '@sentry/nextjs';
import type { NextPageContext } from 'next';

interface ErrorExtraProps {
  hasGetInitialPropsRun?: boolean;
}

const MyError = ({
  statusCode,
  hasGetInitialPropsRun,
  err,
}: ErrorExtraProps & {
  statusCode: number;
  err: Error;
}) => {
  if (!hasGetInitialPropsRun) {
    captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

MyError.getInitialProps = async (context: NextPageContext) => {
  const errorInitialProps: ErrorProps & ErrorExtraProps = await NextErrorComponent.getInitialProps(
    context,
  );

  const { res, err, asPath } = context;

  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) {
    return errorInitialProps;
  }
  if (err) {
    captureException(err);

    await flush(2000);

    return errorInitialProps;
  }

  if (asPath) {
    captureException(new Error(`_error.js getInitialProps missing data at path: ${asPath}`));
  }

  await flush(2000);

  return errorInitialProps;
};

export default MyError;
