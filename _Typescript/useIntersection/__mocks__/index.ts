import { useRef } from "react";

const useIntersection = () => {
  const isIntersecting = true;
  const ref = useRef(null);

  return { isIntersecting, ref };
};

export default useIntersection;
