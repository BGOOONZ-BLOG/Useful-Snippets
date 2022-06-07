import { ApplicationInsights, ITelemetryItem } from '@microsoft/applicationinsights-web';

const defaultObject = { trackException: () => {} };

/** Adds custom properties to all outbound telemetry */
const telemetryInitializer = (envelope: ITelemetryItem) => {
  if (envelope.data) {
    envelope.data.app = 'dxt-jss-public';
  }
};

const AppInsights = () => {
  if (typeof window !== 'undefined') {
    const appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: globalConfig.AppInsightsKey,
        enableAutoRouteTracking: true,
      },
    });
    appInsights.loadAppInsights();
    appInsights.addTelemetryInitializer(telemetryInitializer);

    return appInsights;
  } else {
    return defaultObject;
  }
};

const appInsights = AppInsights();

export default appInsights;
