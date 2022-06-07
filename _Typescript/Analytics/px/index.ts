import { cleanData } from "src/lib/Analytics/gtm";

const pxPush = ({
  clickText,
  eventName,
}: {
  clickText?: string;
  eventName: string;
}) => {
  if (typeof window !== "undefined" && "pxDataLayer" in window) {
    const payload = {
      event: `px-event-${cleanData(eventName)}`,
      // text displayed by clickable element
      "click-text": cleanData(clickText),
      // relative url of current page
      "page-name": window.location.pathname,
    };

    (window as any).pxDataLayer.push(payload);
  }
};

export { pxPush };
