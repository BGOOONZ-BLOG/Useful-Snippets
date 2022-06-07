import { useEffect, useRef } from 'react';

const useOutsideClick = (element: HTMLElement | null, callback: (e: MouseEvent) => void) => {
  const handler = useRef(callback);

  useEffect(() => {
    handler.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleEvent = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && !event.target.contains(element)) {
        handler.current(event);
      }
    };

    window.addEventListener('click', handleEvent);

    return () => {
      window.removeEventListener('click', handleEvent);
    };
  }, []);
};

export { useOutsideClick };
