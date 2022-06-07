import { useEffect, useRef, useState } from "react";

interface useDebounceType {
  (callback: () => void, delay: number): () => void;
}

// Fires off a function only after the delay has passed
// https://gist.github.com/mudge/eb9178a4b6d595ffde8f9cb31744afcf#gistcomment-3007060
const useDebounce: useDebounceType = (callback, delay) => {
  const latestCallback = useRef<() => void>();
  const [callCount, setCallCount] = useState(0);

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (callCount <= 0) return () => {};

    const fire = () => {
      setCallCount(0);
      latestCallback.current && latestCallback.current();
    };

    const id = setTimeout(fire, delay);
    return () => clearTimeout(id);
  }, [callCount, delay]);

  return () => setCallCount((callCount) => callCount + 1);
};

export { useDebounce };
