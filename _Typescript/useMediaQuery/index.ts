import { useLayoutEffect, useState } from 'react';
import { screens } from 'src/lib/Theme';

type Screens = keyof typeof screens;
type QueryProps<T> = T extends String ? (T extends Screens ? T : never) : never;

// # How to use
// ## Use tailwind screens
// const isMedium = useMediQuery('md');

// ## Use custom media query
// const isCustomSize = useMediaQuery('(max-width: 321px)');

// ## Use other media feature
// const hasHover = useMediQuery('(hover: hover)');

const agnosticMatchMedia = (query: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  const cleanedQuery = query.replace(/@media(\s+screen and)?\s+/g, '');
  return window.matchMedia(cleanedQuery);
};

const useMediaQuery: { (mq: Screens): boolean | undefined; (mq: string): boolean | undefined } = <
  T
>(
  mq: QueryProps<T>
) => {
  // eslint-disable-next-line no-undefined
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useLayoutEffect(() => {
    const query = (() => {
      const q = screens[mq] ? `(min-width: ${screens[mq]})` : mq;
      return agnosticMatchMedia(q) as MediaQueryList;
    })();

    const handleUpdate = () => {
      setMatches(query.matches);
    };

    handleUpdate();

    query.addEventListener('change', handleUpdate);
    return () => {
      query.removeEventListener('change', handleUpdate);
    };
  }, [mq]);

  return matches;
};

export default useMediaQuery;
