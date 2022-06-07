import React, { useEffect, useRef } from "react";
import { State, Mutate } from "src/types/routeHandler";
import { getNavItems } from "./getNavItems";
import { getSectionSegment } from "src/lib/helpers";
import { Jurisdictions } from "src/lib/constants";

type Context = {
  status: {
    jurisdiction?: {
      serviceKey: "01" | "02";
      jurisdictionCode: keyof typeof Jurisdictions;
      abbreviation: "IN" | "NC" | "SC" | "FL" | "KY" | "OH";
      stateName: string;
    };
    language?: "en" | "es";
    site?: {
      name: string;
    };
    page: {
      jurisdictions?: (keyof typeof Jurisdictions)[];
      isJurisdictionallyLocked: boolean;
      navItems?: any;
      segment?: "BUS" | "RES";
    };
  };
  mutate: Mutate;
};

const AppContext = React.createContext<Context>({
  mutate: () => new Promise((resolve) => resolve()),
  status: {
    page: {
      isJurisdictionallyLocked: false,
    },
  },
});

const useAppContext = () => React.useContext(AppContext);

const getPrimaryNav = (routeData: State["routeData"]) =>
  routeData?.sitecore?.route?.placeholders?.["jss-public-header"]?.find(
    ({ componentName }) => componentName === "PrimaryNav"
  );

const getSegment = (primaryNav: ReturnType<typeof getPrimaryNav>) =>
  (primaryNav?.fields?.userSegment?.value ||
    getSectionSegment()) as Context["status"]["page"]["segment"];

const getJurisdiction = (primaryNav: ReturnType<typeof getPrimaryNav>) =>
  primaryNav?.fields?.selectedJurisdiction as Context["status"]["jurisdiction"];

const getPageJurisdictions = (routeData: State["routeData"]) =>
  routeData?.sitecore?.route?.fields?.Jurisdictions?.map(
    (item) => item.fields?.["Jurisdiction Code"]?.value
  );

const getIsJurisdictionallyLocked = (routeData: State["routeData"]) =>
  routeData?.sitecore?.route?.fields?.["Is Jurisdictionally Locked"]
    ?.value as boolean;

const getComponent = (routeData: State["routeData"]) => {
  const placeholders = Object.values(
    routeData?.sitecore?.route?.placeholders || {}
  ).flat();
  return placeholders?.find(
    ({ componentName }) => componentName === "NavItems"
  );
};

const AppContextProvider = ({
  children,
  mutate,
  routeData,
  route,
}: React.PropsWithChildren<{
  mutate: Mutate;
  routeData: State["routeData"];
  route?: string;
}>) => {
  const prevJurisdiction = useRef<string | undefined>();

  const primaryNav = getPrimaryNav(routeData);
  // current user jurisdiction settings
  const jurisdiction = getJurisdiction(primaryNav);
  // isJurisdictionallyLocked: tells us that some jurisdiction is required to be set, but it doesn't matter which
  const isJurisdictionallyLocked = getIsJurisdictionallyLocked(routeData);
  // jurisdictions: tells us the page is limited to specific jurisdictions
  const jurisdictions = getPageJurisdictions(routeData);
  // section segment
  const segment = getSegment(primaryNav);
  // navItems used for SecondaryNav
  const navItems = getNavItems(
    getComponent(routeData),
    jurisdiction?.jurisdictionCode,
    route
  );

  const status = {
    ...routeData?.sitecore?.context,
    jurisdiction,
    page: {
      route,
      jurisdictions,
      isJurisdictionallyLocked,
      navItems,
      segment,
    },
  };

  // TODO Remove need to reload entire page to refresh App Component jurisdiction.
  // Dispatch new CustomEvent('jurisdictionchange', { detail: { ju: jurisdictionCode }}) instead and listen for the event
  // in the application component.
  useEffect(() => {
    if (prevJurisdiction.current) {
      const didChange =
        prevJurisdiction.current !== status.jurisdiction?.jurisdictionCode;

      if (didChange) {
        window.dispatchEvent(
          new CustomEvent("jurisdictionchange", {
            detail: { ju: status.jurisdiction?.jurisdictionCode },
          })
        );
      }
    }
    prevJurisdiction.current = status.jurisdiction?.jurisdictionCode;
  }, [status.jurisdiction?.jurisdictionCode]);

  return (
    <AppContext.Provider value={{ mutate, status }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext as default, AppContextProvider, useAppContext };
