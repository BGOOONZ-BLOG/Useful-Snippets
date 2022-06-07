// 'too    much  space' => 'too much space'
const noExtraSpaces = (str: string = "") => str.replace(/\s(?=\s)/g, "");

// filters out duplicated words in a string
const onlyUniqueWords = (str: string) => {
  const strArray = new Set(str.trim().split(" "));
  return Array.from(strArray).join(" ");
};

const removeSpecialCharacters = (str: string = "") =>
  str.replace(/[&\\,+()$~%'"*?!{}.]/gi, "");

// {123-456} returns 123-456
const stripCurlyBraces = (str: string) => str.replace(/[{}]/g, "");

// Strips and then returns pure text from a string containing HTML elements
const stripHTMLTags = (rawString: string) => {
  const noSingleQuotes = (str: string) => {
    if (str.charAt(0) === "'" && str.charAt(rawString.length - 1) === "'") {
      return str.substring(1, str.length - 1);
    }
    return str;
  };

  return noSingleQuotes(rawString).replace(/(<([^>]+)>)/gi, "");
};

// returns the src from a url without an querystring params
const stripQueryStringsFromSrc = (url: string) => url.split("?")[0];

// kebab-case
const toKebabCase = (str: string = "") =>
  noExtraSpaces(str).toLowerCase().split(" ").join("-");

// PascalCase
const toPascalCase = (str: string) => {
  const strArray = str.split(" ");
  // single word
  if (strArray.length === 1) return str.charAt(0).toUpperCase() + str.slice(1);
  // multiple words
  return strArray.reduce(
    (acc, curr) =>
      acc + curr.charAt(0).toUpperCase() + curr.substr(1).toLowerCase(),
    ""
  );
};

// snake_case
const toSnakeCase = (str: string) => str.split(" ").join("_");

// All Words Start With Uppercase
const toTitleCase = (str: string) =>
  str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());

const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export {
  capitalizeFirstLetter,
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
};
