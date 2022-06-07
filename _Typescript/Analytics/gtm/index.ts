import TagManager from "react-gtm-module";
import {
  pipe,
  removeSpecialCharacters,
  toKebabCase,
  toSnakeCase,
  stripHTMLTags,
} from "src/lib/helpers";
import { trackForm } from "./events/form";
import { ComponentEvent, NavEvent, VideoEvent } from "./types";

const pushData = (dataToPush: { [Key: string]: string }) => {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.ANALYTICS_LOGGING !== "false"
  ) {
    // eslint-disable-next-line no-console
    return console.log("%c GTM", "color: green", dataToPush);
  } else {
    return TagManager.dataLayer({
      dataLayer: dataToPush,
    });
  }
};

const cleanData = (value?: string) => {
  const transform = pipe(removeSpecialCharacters, stripHTMLTags, toKebabCase);
  return transform(value) || "(not-set)";
};

const cleanArray = (arr: Array<any>) =>
  arr.filter(Boolean).map(cleanData).join(" | ");

const trackComponent = ({
  action,
  category,
  event,
  guid,
  label,
}: ComponentEvent) =>
  pushData({
    "event-action": cleanData(action),
    "event-category": pipe(
      (str = "") => str.toLowerCase(),
      removeSpecialCharacters,
      stripHTMLTags,
      toSnakeCase
    )(category),
    "event-label": cleanData(label),
    guid: cleanData(guid),
    event: event ? cleanData(event) : "event-click",
  });

const trackVideo = ({ id, target, videoType, page }: VideoEvent) => {
  const currentTime = target.getCurrentTime();
  if (currentTime) {
    const percentagePlayed = Math.floor(
      (currentTime / target.getDuration()) * 100
    );
    const analytics = {
      action: `${target.getVideoUrl()}-|-${percentagePlayed} percent played`,
      category: videoType ? `${videoType}-video` : "video",
      event: "event-click",
      guid: id,
      label: page || "",
    };
    track.component(analytics);
  }
};

const trackNavigation = ({ event = "send-page", page, ...rest }: NavEvent) =>
  pushData({ event: event, "page-name": page, ...rest });

const trackScroll = ({
  page,
  length,
  scroll,
}: {
  page: string;
  length: string;
  scroll: string;
}) => {
  pushData({
    event: "scroll",
    "page-name": page,
    scroll,
    length,
    "non-in": scroll === "0%" ? "1" : "0",
  });
};

const track = (() => {
  const main = (args: { [Key: string]: string }) => pushData(args);
  main.component = trackComponent;
  main.form = trackForm;
  main.navigation = trackNavigation;
  main.video = trackVideo;
  main.scroll = trackScroll;

  return main;
})();

export { cleanArray, cleanData, pushData };
export default track;
