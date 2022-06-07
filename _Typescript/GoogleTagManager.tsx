import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import track from 'src/lib/Analytics';
import { useAppContext } from 'src/lib/Contexts/AppContext';
import { getSectionSegment } from './helpers';

const useTrackRouteChange = () => {
  const location = useLocation();
  const { status } = useAppContext();

  const jurisdiction = status.jurisdiction?.jurisdictionCode;
  useEffect(() => {
    const currentPage = document.location.pathname + document.location.search;
    if ((window as any).currentPage !== currentPage) {
      (window as any).prevPage = (window as any).currentPage ?? '';
      (window as any).currentPage = currentPage;
    }

    track.navigation({
      event: 'send-page',
      page: location.pathname,
      segment: getSectionSegment(),
      jurisdiction,
    });
  }, [location.pathname]);
};

const GoogleTagManager = () => {
  useEffect(() => {
    if (globalConfig?.GoogleTagManagerId) {
      TagManager.initialize({ gtmId: globalConfig.GoogleTagManagerId });
    }
  }, []);

  useTrackRouteChange();
  // Return a fragment so that we can use GoogleTagManager as a JSX element, even tho it has no visual interface
  // it responds to route data like more typical, UI components.
  return <></>;
};

export default GoogleTagManager;
