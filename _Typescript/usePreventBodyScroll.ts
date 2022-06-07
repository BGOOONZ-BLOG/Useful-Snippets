import { useEffect } from "react";

const usePreventBodyScroll = (shouldPrevent: boolean) => {
  useEffect(() => {
    if (shouldPrevent) {
      document
        .querySelector("#maybe-hidden-content")
        ?.setAttribute("aria-hidden", "true");
      document.documentElement.classList.add("overflow-hidden", "touch-none");
    }
    return () => {
      document
        .querySelector("#maybe-hidden-content")
        ?.setAttribute("aria-hidden", "false");
      document.documentElement.classList.remove(
        "overflow-hidden",
        "touch-none"
      );
    };
  }, [shouldPrevent]);
};

export default usePreventBodyScroll;
