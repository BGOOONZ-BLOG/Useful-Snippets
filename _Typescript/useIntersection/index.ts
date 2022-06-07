import { useEffect, useState, useRef } from "react";
import { ObserverOptions } from "./types";

// Simplified version of this idea, sharing IntersectionObserver instance
// https://github.com/thebuilder/react-intersection-observer/blob/master/src/observers.ts

const ObserverMap = new Map<
  string,
  {
    observer: IntersectionObserver;
    elements: Map<Element, Function>;
  }
>();

// Sort opts object by key and stringify it.
// This is used as the name of the IntersectionObserver in ObserverMap.
// If the options are the same we can share that observer instance.
const makeKey = (opts: ObserverOptions) =>
  JSON.stringify(
    Object.keys(opts)
      .sort()
      .reduce((acc, val) => ({ ...acc, [val]: opts[val] }), {})
  );

const createObserver = (opts: ObserverOptions) => {
  let instance = ObserverMap.get(makeKey(opts));

  // If the observer instance doesn't exist create one
  if (!instance) {
    const elements = new Map<Element, Function>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Appy callback with entry passed thru as arg
        elements.get(entry.target)?.(entry);
      });
    }, opts);
    instance = { observer, elements };
    ObserverMap.set(makeKey(opts), instance);
  }

  return instance;
};

const observer = (opts: ObserverOptions) => {
  const { observer, elements } = createObserver(opts);

  const observe = (el: Element | null, cb: Function) => {
    if (!el) {
      return;
    }

    elements.set(el, cb);
    observer.observe(el);
  };

  const unobserve = (el: Element | null) => {
    if (!el) {
      return;
    }

    // Unobserve and remove element from Map
    observer.unobserve(el);
    elements.delete(el);

    // No more elements, disconnect and remove observer from Map
    if (!elements.size) {
      observer.disconnect();
      ObserverMap.delete(makeKey(opts));
    }
  };

  return {
    observe,
    unobserve,
  };
};

/**
 * shouldUnobserve - set to TRUE to stop tracking once its entered the viewport and
 * set to FALSE for something like a slider where you need to track
 * items as they go in and out of the viewport repeatedly
 * */
const useIntersection = <ObservedElement extends HTMLElement>(
  opts: ObserverOptions = {},
  shouldUnobserve = true
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<ObservedElement>(null);

  useEffect(() => {
    let isActive = true;

    const { observe, unobserve } = observer(opts);

    const handleIntersecting = (entry: IntersectionObserverEntry) => {
      // check isActive to prevent setState on unmounted component when using `shouldUnobserve = false`
      if (isActive) {
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && shouldUnobserve) {
          unobserve(ref.current);
        }
      }
    };

    if (ref.current) {
      observe(ref.current, handleIntersecting);
    }

    return () => {
      isActive = false;
    };
  }, []);

  return { isIntersecting, ref };
};

export { makeKey };
export default useIntersection;
