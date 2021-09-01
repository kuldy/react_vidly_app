import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  // Sentry.init({
  //   dsn: "https://a8606420e9374a7b87852073723cd585@o984570.ingest.sentry.io/5940377",
  //   integrations: [new Integrations.BrowserTracing()],
  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0,
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.log(error);
}

export default {
  init,
  log,
};
