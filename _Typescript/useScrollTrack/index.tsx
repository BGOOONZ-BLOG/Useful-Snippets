/* eslint-disable no-undefined */
import { useEffect, useRef } from 'react';
import track from 'src/lib/Analytics';
import useMediaQuery from 'src/lib/useMediaQuery';
import { useSitecoreContext } from '../SitecoreContextFactory';
import { ScrollDistances } from './types';

let scrollEvents: ScrollDistances = { 0: false, 25: false, 50: false, 75: false, 100: false };
let isNavigating = false;
let isLoaded = false;

const trackScroll = (percent: keyof ScrollDistances, length = '') => {
  const scroll = `${percent}%`;

  track.scroll({
    page: window.location.pathname,
    length,
    scroll,
  });
};

const useScrollTrack = () => {
  const isDesktop = useMediaQuery('lg');
  const isTablet = useMediaQuery('md');
  const screenSize = [isDesktop, isTablet].every(value => typeof value !== 'undefined')
    ? isDesktop
      ? 'D'
      : isTablet
      ? 'T'
      : 'M'
    : undefined;
  const { context } = useSitecoreContext();
  const prev = useRef<string | null | undefined>(null);

  useEffect(() => {
    isNavigating = true;
    scrollEvents = { 0: false, 25: false, 50: false, 75: false, 100: false };
  }, [context.route?.name]);

  useEffect(() => {
    const documentSize = document.body.scrollHeight;

    const scrollHandler = () => {
      if (isNavigating) {
        isNavigating = false;
        return;
      }
      const currentScroll = window.scrollY + window.outerHeight;
      const scrollPercent = (currentScroll / documentSize) * 100;

      (Object.keys(scrollEvents) as Array<Extract<keyof ScrollDistances, string>>).forEach(
        (val: keyof ScrollDistances) => {
          const percent = Number(val);
          if (scrollPercent >= percent && !scrollEvents[val]) {
            if (Number(percent) !== 0) {
              trackScroll(val, `${documentSize}${screenSize}`);
              scrollEvents[percent as keyof typeof scrollEvents] = true;
            }

            // If we have already sent all the events, just unload the handler
            if (Number(percent) === 100 && isLoaded) {
              window.removeEventListener('scroll', scrollHandler);
              isLoaded = false;
            }
          }
        }
      );
    };

    // We need to send the 0% event on load, but only if we have a valid screen size
    if (typeof screenSize !== 'undefined') {
      if (prev.current !== context.route?.name) {
        trackScroll(0, `${documentSize}${screenSize}`);
      }
      prev.current = context.route?.name;
    }

    // We only want to load the handler if we have a valid screen size and it isn't loaded
    if (!isLoaded && typeof screenSize !== 'undefined') {
      window.addEventListener('scroll', scrollHandler, { passive: true });
      isLoaded = true;
    }

    return () => {
      // We only need to unload the handler if it wasn't already unloaded
      if (isLoaded) {
        window.removeEventListener('scroll', scrollHandler);
        isLoaded = false;
      }
    };
  }, [context.route?.name, screenSize]);
};

export default useScrollTrack;
