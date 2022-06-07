import React, { useEffect, useState } from 'react';
import { assertElement } from 'src/lib/helpers/assert';

const ObserverMap = new Map<
  string,
  {
    observer: ResizeObserver;
    elements: Map<Element, Function>;
  }
>();

const createObserver = () => {
  let instance = ObserverMap.get('observer');

  // If the observer instance doesn't exist create one
  if (!instance) {
    const elements = new Map<Element, Function>();
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      entries.forEach(entry => {
        // Appy callback with entry passed thru as arg
        elements.get(entry.target)?.(entry);
      });
    });
    instance = { observer, elements };
    ObserverMap.set('observer', instance);
  }

  return instance;
};

const observer = () => {
  if (typeof ResizeObserver === 'undefined') {
    return { observe: () => {}, disconnect: () => {} };
  }

  const { observer, elements } = createObserver();

  const observe = (el: Element | null, cb: () => void) => {
    assertElement(el);
    elements.set(el, cb);
    observer.observe(el);
  };

  const disconnect = () => {
    observer.disconnect();
  };

  return {
    observe,
    disconnect,
  };
};

const useResize = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  determineSize: (arg: typeof ref) => boolean
) => {
  const [isSize, setSize] = useState(false);

  useEffect(() => {
    const { observe, disconnect } = observer();
    observe(ref.current, () => setSize(determineSize(ref)));
    return () => disconnect();
  }, []);

  return isSize;
};

export default useResize;
