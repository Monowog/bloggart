import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'https://b382fd88928a513a6b5f4c9d4731b7f5@o4510865395351552.ingest.us.sentry.io/4510865408065536',

  tracesSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: import.meta.env.DEV,
});