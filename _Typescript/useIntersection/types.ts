type ValueOf<T> = T[keyof T];
// TS doesn't like union index signatures, eg "root" | "rootMargin" | "threshold" so we do so that we
// can still leverage the IntersectionObserverInit init but with a string index signature
// that is needed for makeKey().

type ObserverOptions = {
  [key in keyof IntersectionObserverInit | string]: ValueOf<IntersectionObserverInit>;
};

export type { ObserverOptions };
