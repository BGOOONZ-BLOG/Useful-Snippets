import pipe from "./pipe";
import {
  noExtraSpaces,
  onlyUniqueWords,
  removeSpecialCharacters,
  stripCurlyBraces,
  stripHTMLTags,
  stripQueryStringsFromSrc,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toTitleCase,
} from "./strings";
import { maxFlat } from "./maxFlat";
import getCookies from "src/lib/Cookies";

interface A11yActionKeyDownType {
  (
    event: React.KeyboardEvent<HTMLElement>,
    clickHandler: (event?: any) => void
  ): void | null;
}

const a11yActionKeyDown: A11yActionKeyDownType = ({ code }, clickHandler) => {
  if (code !== "Enter" && code !== "NumpadEnter") return null;
  return clickHandler();
};

// Visible, non-interactive elements with click handlers must have at least one keyboard listener
// use this if using a div or span with a click handler ie: <span {...a11yAction(clickHandler)}>click me</span>
const a11yAction = (clickHandler: (event?: any) => void) => ({
  onClick: clickHandler,
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) =>
    a11yActionKeyDown(event, clickHandler),
  role: "button",
  tabIndex: 0,
});

/**
 * Turn single array into a multi-dimensional array that can be
 * used to create options in stories that display iterated components
 * of differing lengths
 * @param arr The array you wish to turn into a multi-dimensional
 * options array
 * @param amount The number of options you wish to have in your array
 * @returns a new multi-dimensional options array
 */
const createStoryOptions = (arr: Array<any>, amount?: number) => {
  const optionsArray: Array<any> = amount ? arr.slice(0, amount) : arr;
  return optionsArray.reduce(
    (acc, _, index, source) => ({
      [index + 1]: source.slice(0, index + 1),
      ...acc,
    }),
    {}
  );
};

// get Segment from DEC cookie, returns 'RES' or 'BUS'
const getSectionSegment = () => {
  const cookies = getCookies();
  return cookies && cookies.DEC ? JSON.parse(cookies.DEC).SEGMENT : null;
};

const getBackgroundColor = (fields?: { [key: string]: any }) => {
  const bgColor =
    fields?.backgroundColor || fields?.Background?.fields?.Setting?.value;
  return bgColor?.toLowerCase() === "shaded" ? "gray" : "white";
};

const getChild =
  (source: Array<{ [key: string]: any }>) => (parentId: string) => {
    return source.filter((child) => child?.params?.parent === parentId);
  };

const formatModalId = (arg = "") =>
  pipe(
    stripCurlyBraces,
    removeSpecialCharacters,
    (str) => str.replace(/[-#]/gi, ""),
    (str) => str.toLowerCase()
  )(arg);

// Searches the fields in NavCards or CallToAction for 'Modal Triggers' properties to match
// with a modal component.
const getModal = (fields: any) => {
  if (!fields?.["Modal Triggers"]?.id) return null;
  return { id: formatModalId(fields["Modal Triggers"].id) };
};

/**
 * Smoosh variant props into class declaration, each with prefix
 * @param classes Array ['primary', 'small']
 * @param prefix String 'btn-'
 * @returns 'btn-primary btn-small'
 */
const makeClasses = (classes: Array<string>, prefix = "") => {
  if (!classes) return "";

  return classes
    .reduce((acc, prop) => (prop ? `${acc} ${prefix}${prop}` : `${acc}`), "")
    .toLowerCase()
    .trim();
};

/**
 * Will either remove ALL PROPS from the Storybook Controls table except
 * for props listed in the exceptionArr or ONLY RETURN the exceptionArray
 * @param props An array of strings that are prop names returned from the composition function
 * @param Component The Component used in the Storybook story
 * @param exceptionArray An array of props that will ONLY BE included OR NOT be included in the output
 * @param exclude A flag to determine whether to exclude exceptionArray or return only the exceptionArray
 */
const storybookCustomArgs = (
  props: Array<string>,
  Component: any,
  exceptionArr: Array<string>,
  exclude = true
) => {
  // props returned from the composition function
  const keys1 = Object.keys(props);
  // all props from the component
  const keys2 = Object.keys(Component.__docgenInfo.props);
  return keys1
    .concat(keys2)
    .filter((x) => exceptionArr.includes(x) === exclude)
    .reduce((acc, curr) => {
      return { ...acc, [curr]: { table: { disable: true } } };
    }, {});
};

export {
  a11yAction,
  a11yActionKeyDown,
  createStoryOptions,
  formatModalId,
  getBackgroundColor,
  getChild,
  getModal,
  getSectionSegment,
  makeClasses,
  maxFlat,
  noExtraSpaces,
  onlyUniqueWords,
  pipe,
  removeSpecialCharacters,
  storybookCustomArgs,
  stripCurlyBraces,
  stripHTMLTags,
  stripQueryStringsFromSrc,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toTitleCase,
};
