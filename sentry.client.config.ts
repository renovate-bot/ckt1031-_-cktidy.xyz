import { init } from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

init({
  dsn: SENTRY_DSN || 'https://76c1cee1202a41d9b84b48f8f3fc536c@o1186045.ingest.sentry.io/4503959566942208',
  tracesSampleRate: 1.0,
});
