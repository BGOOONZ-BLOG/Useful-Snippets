/* eslint-disable no-console */
import appInsights from 'src/lib/AppInsights';
import { SeverityLevel } from '@microsoft/applicationinsights-web';

const Logger = (
  error: Error | string | unknown,
  options?: { message?: string; errorId?: string; componentName?: string }
) => {
  if (process.env.NODE_ENV !== 'production') {
    return console.error(error);
  }

  return appInsights.trackException({
    // The default type for a try/catch error in typescript is `unknown`
    // (https://devblogs.microsoft.com/typescript/announcing-typescript-4-4/#using-unknown-in-catch-variables).
    // We add a exhaustive check for the exception property so we can support accepting this `unknown` type.
    exception:
      // if it's already an Error just send it
      // if it's a string, make a new error with that string
      // if it's something else, create a generic Error('error')
      error instanceof Error
        ? error
        : typeof error === 'string'
        ? new Error(error)
        : new Error('error'),
    severityLevel: SeverityLevel.Error,
    properties: {
      componentName: options?.componentName,
      errorId: options?.errorId,
      message: options?.message,
    },
  });
};

export default Logger;
