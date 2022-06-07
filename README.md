# Useful-Snippets-js

A collection of snippets that might come in handy, inspired by 30 seconds of code and similar projects

# [Website](https://bgoonz.github.io/Useful-Snippets/)

---

### ↡↡↡ 30 Seconds of Code Snippets Below ↡↡

# CSVToArray

Converts a comma-separated values (CSV) string to a 2D array.

- Use `Array.prototype.slice()` and `Array.prototype.indexOf('\n')` to remove the first row (title row) if `omitFirstRow` is `true`.
- Use `String.prototype.split('\n')` to create a string for each row, then `String.prototype.split(delimiter)` to separate the values in each row.
- Omit the second argument, `delimiter`, to use a default delimiter of `','`.
- Omit the third argument, `omitFirstRow`, to include the first row (title row) of the CSV string.

```js
const CSVToArray = (data, delimiter = ",", omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf("\n") + 1 : 0)
    .split("\n")
    .map((v) => v.split(delimiter));
```

```js
CSVToArray("a,b\nc,d"); // [['a', 'b'], ['c', 'd']];
CSVToArray("a;b\nc;d", ";"); // [['a', 'b'], ['c', 'd']];
CSVToArray("col1,col2\na,b\nc,d", ",", true); // [['a', 'b'], ['c', 'd']];
```

---

## title: CSVToJSON

Converts a comma-separated values (CSV) string to a 2D array of objects.
The first row of the string is used as the title row.

- Use `Array.prototype.slice()` and `Array.prototype.indexOf('\n')` and `String.prototype.split(delimiter)` to separate the first row (title row) into values.
- Use `String.prototype.split('\n')` to create a string for each row, then `Array.prototype.map()` and `String.prototype.split(delimiter)` to separate the values in each row.
- Use `Array.prototype.reduce()` to create an object for each row's values, with the keys parsed from the title row.
- Omit the second argument, `delimiter`, to use a default delimiter of `,`.

```js
const CSVToJSON = (data, delimiter = ",") => {
  const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
  return data
    .slice(data.indexOf("\n") + 1)
    .split("\n")
    .map((v) => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
};
```

```js
CSVToJSON("col1,col2\na,b\nc,d");
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
CSVToJSON("col1;col2\na;b\nc;d", ";");
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
```

---

## title: CSVToArray

Converts a comma-separated values (CSV) string to a 2D array.

- Use `Array.prototype.slice()` and `Array.prototype.indexOf('\n')` to remove the first row (title row) if `omitFirstRow` is `true`.
- Use `String.prototype.split('\n')` to create a string for each row, then `String.prototype.split(delimiter)` to separate the values in each row.
- Omit the second argument, `delimiter`, to use a default delimiter of `','`.
- Omit the third argument, `omitFirstRow`, to include the first row (title row) of the CSV string.

```js
const CSVToArray = (data, delimiter = ",", omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf("\n") + 1 : 0)
    .split("\n")
    .map((v) => v.split(delimiter));
```

```js
CSVToArray("a,b\nc,d"); // [['a', 'b'], ['c', 'd']];
CSVToArray("a;b\nc;d", ";"); // [['a', 'b'], ['c', 'd']];
CSVToArray("col1,col2\na,b\nc,d", ",", true); // [['a', 'b'], ['c', 'd']];
```

---

## title: CSVToJSON

Converts a comma-separated values (CSV) string to a 2D array of objects.
The first row of the string is used as the title row.

- Use `Array.prototype.slice()` and `Array.prototype.indexOf('\n')` and `String.prototype.split(delimiter)` to separate the first row (title row) into values.
- Use `String.prototype.split('\n')` to create a string for each row, then `Array.prototype.map()` and `String.prototype.split(delimiter)` to separate the values in each row.
- Use `Array.prototype.reduce()` to create an object for each row's values, with the keys parsed from the title row.
- Omit the second argument, `delimiter`, to use a default delimiter of `,`.

```js
const CSVToJSON = (data, delimiter = ",") => {
  const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
  return data
    .slice(data.indexOf("\n") + 1)
    .split("\n")
    .map((v) => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
};
```

```js
CSVToJSON("col1,col2\na,b\nc,d");
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
CSVToJSON("col1;col2\na;b\nc;d", ";");
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
```

---

## title: HSBToRGB

Converts a HSB color tuple to RGB format.

- Use the [HSB to RGB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB) to convert to the appropriate format.
- The range of the input parameters is H: [0, 360], S: [0, 100], B: [0, 100].
- The range of all output values is [0, 255].

```js
const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};
```

```js
HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]
```

---

## title: HSLToRGB

Converts a HSL color tuple to RGB format.

- Use the [HSL to RGB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB) to convert to the appropriate format.
- The range of the input parameters is H: [0, 360], S: [0, 100], L: [0, 100].
- The range of all output values is [0, 255].

```js
const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};
```

```js
HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]
```

---

## title: JSONToFile

Writes a JSON object to a file.

- Use `fs.writeFileSync()`, template literals and `JSON.stringify()` to write a `json` object to a `.json` file.

```js
const fs = require("fs");

const JSONToFile = (obj, filename) =>
  fs.writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));
```

```js
JSONToFile({ test: "is passed" }, "testJsonFile");
// writes the object to 'testJsonFile.json'
```

---

## title: JSONtoCSV

Converts an array of objects to a comma-separated values (CSV) string that contains only the `columns` specified.

- Use `Array.prototype.join(delimiter)` to combine all the names in `columns` to create the first row.
- Use `Array.prototype.map()` and `Array.prototype.reduce()` to create a row for each object. Substitute non-existent values with empty strings and only mapping values in `columns`.
- Use `Array.prototype.join('\n')` to combine all rows into a string.
- Omit the third argument, `delimiter`, to use a default delimiter of `','`.

```js
const JSONtoCSV = (arr, columns, delimiter = ",") =>
  [
    columns.join(delimiter),
    ...arr.map((obj) =>
      columns.reduce(
        (acc, key) =>
          `${acc}${!acc.length ? "" : delimiter}"${!obj[key] ? "" : obj[key]}"`,
        ""
      )
    ),
  ].join("\n");
```

```js
JSONtoCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
  ["a", "b"]
); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
JSONtoCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
  ["a", "b"],
  ";"
); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
```

---

## title: RGBToHSB

Converts a RGB color tuple to HSB format.

- Use the [RGB to HSB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB) to convert to the appropriate format.
- The range of all input parameters is [0, 255].
- The range of the resulting values is H: [0, 360], S: [0, 100], B: [0, 100].

```js
const RGBToHSB = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n === 0
      ? 0
      : n && v === r
      ? (g - b) / n
      : v === g
      ? 2 + (b - r) / n
      : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};
```

```js
RGBToHSB(252, 111, 48);
// [18.529411764705856, 80.95238095238095, 98.82352941176471]
```

---

## title: RGBToHSL

Converts a RGB color tuple to HSL format.

- Use the [RGB to HSL conversion formula](https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/) to convert to the appropriate format.
- The range of all input parameters is [0, 255].
- The range of the resulting values is H: [0, 360], S: [0, 100], L: [0, 100].

```js
const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};
```

```js
RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]
```

---

## title: RGBToHex

Converts the values of RGB components to a hexadecimal color code.

- Convert given RGB parameters to hexadecimal string using bitwise left-shift operator (`<<`) and `Number.prototype.toString(16)`.
- Use `String.prototype.padStart(6, '0')` to get a 6-digit hexadecimal value.

```js
const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
```

```js
RGBToHex(255, 165, 1); // 'ffa501'
```

---

## title: URLJoin

Joins all given URL segments together, then normalizes the resulting URL.

- Use `String.prototype.join('/')` to combine URL segments.
- Use a series of `String.prototype.replace()` calls with various regexps to normalize the resulting URL (remove double slashes, add proper slashes for protocol, remove slashes before parameters, combine parameters with `'&'` and normalize first parameter delimiter).

```js
const URLJoin = (...args) =>
  args
    .join("/")
    .replace(/[\/]+/g, "/")
    .replace(/^(.+):\//, "$1://")
    .replace(/^file:/, "file:/")
    .replace(/\/(\?|&|#[^!])/g, "$1")
    .replace(/\?/g, "&")
    .replace("&", "?");
```

```js
URLJoin("http://www.google.com", "a", "/b/cd", "?foo=123", "?bar=foo");
// 'http://www.google.com/a/b/cd?foo=123&bar=foo'
```

---

## title: UUIDGeneratorBrowser

Generates a UUID in a browser.

- Use `Crypto.getRandomValues()` to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.
- Use `Number.prototype.toString(16)` to convert it to a proper UUID.

```js
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
```

```js
UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'
```

---

## title: UUIDGeneratorNode

Generates a UUID in Node.JS.

- Use `crypto.randomBytes()` to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.
- Use `Number.prototype.toString(16)` to convert it to a proper UUID.

```js
const crypto = require("crypto");

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );
```

```js
UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'
```

---

## title: accumulate

Creates an array of partial sums.

- Use `Array.prototype.reduce()`, initialized with an empty array accumulator to iterate over `nums`.
- Use `Array.prototype.slice(-1)`, the spread operator (`...`) and the unary `+` operator to add each value to the accumulator array containing the previous sums.

```js
const accumulate = (...nums) =>
  nums.reduce((acc, n) => [...acc, n + +acc.slice(-1)], []);
```

```js
accumulate(1, 2, 3, 4); // [1, 3, 6, 10]
accumulate(...[1, 2, 3, 4]); // [1, 3, 6, 10]
```

---

## title: addClass

Adds a class to an HTML element.

- Use `Element.classList` and `DOMTokenList.add()` to add the specified class to the element.

```js
const addClass = (el, className) => el.classList.add(className);
```

```js
addClass(document.querySelector("p"), "special");
// The paragraph will now have the 'special' class
```

---

## title: addDaysToDate

Calculates the date of `n` days from the given date, returning its string representation.

- Use `new Date()` to create a date object from the first argument.
- Use `Date.prototype.getDate()` and `Date.prototype.setDate()` to add `n` days to the given date.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const addDaysToDate = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
};
```

```js
addDaysToDate("2020-10-15", 10); // '2020-10-25'
addDaysToDate("2020-10-15", -10); // '2020-10-05'
```

---

## title: addEventListenerAll

Attaches an event listener to all the provided targets.

- Use `Array.prototype.forEach()` and `EventTarget.addEventListener()` to attach the provided `listener` for the given event `type` to all `targets`.

```js
const addEventListenerAll = (targets, type, listener, options, useCapture) => {
  targets.forEach((target) =>
    target.addEventListener(type, listener, options, useCapture)
  );
};
```

```js
addEventListenerAll(document.querySelectorAll("a"), "click", () =>
  console.log("Clicked a link")
);
// Logs 'Clicked a link' whenever any anchor element is clicked
```

---

## title: addMinutesToDate

Calculates the date of `n` minutes from the given date, returning its string representation.

- Use `new Date()` to create a date object from the first argument.
- Use `Date.prototype.getTime()` and `Date.prototype.setTime()` to add `n` minutes to the given date.
- Use `Date.prototype.toISOString()`, `String.prototype.split()` and `String.prototype.replace()` to return a string in `yyyy-mm-dd HH:MM:SS` format.

```js
const addMinutesToDate = (date, n) => {
  const d = new Date(date);
  d.setTime(d.getTime() + n * 60000);
  return d.toISOString().split(".")[0].replace("T", " ");
};
```

```js
addMinutesToDate("2020-10-19 12:00:00", 10); // '2020-10-19 12:10:00'
addMinutesToDate("2020-10-19", -10); // '2020-10-18 23:50:00'
```

---

## title: addMultipleListeners

Adds multiple event listeners with the same handler to an element.

- Use `Array.prototype.forEach()` and `EventTarget.addEventListener()` to add multiple event listeners with an assigned callback function to an element.

```js
const addMultipleListeners = (el, types, listener, options, useCapture) => {
  types.forEach((type) =>
    el.addEventListener(type, listener, options, useCapture)
  );
};
```

```js
addMultipleListeners(
  document.querySelector(".my-element"),
  ["click", "mousedown"],
  () => {
    console.log("hello!");
  }
);
```

---

## title: addStyles

Adds the provided styles to the given element.

- Use `Object.assign()` and `ElementCSSInlineStyle.style` to merge the provided `styles` object into the style of the given element.

```js
const addStyles = (el, styles) => Object.assign(el.style, styles);
```

```js
addStyles(document.getElementById("my-element"), {
  background: "red",
  color: "#ffff00",
  fontSize: "3rem",
});
```

---

## title: addWeekDays

Calculates the date after adding the given number of business days.

- Use `Array.from()` to construct an array with `length` equal to the `count` of business days to be added.
- Use `Array.prototype.reduce()` to iterate over the array, starting from `startDate` and incrementing, using `Date.prototype.getDate()` and `Date.prototype.setDate()`.
- If the current `date` is on a weekend, update it again by adding either one day or two days to make it a weekday.
- **NOTE:** Does not take official holidays into account.

```js
const addWeekDays = (startDate, count) =>
  Array.from({ length: count }).reduce((date) => {
    date = new Date(date.setDate(date.getDate() + 1));
    if (date.getDay() % 6 === 0)
      date = new Date(date.setDate(date.getDate() + (date.getDay() / 6 + 1)));
    return date;
  }, startDate);
```

```js
addWeekDays(new Date("Oct 09, 2020"), 5); // 'Oct 16, 2020'
addWeekDays(new Date("Oct 12, 2020"), 5); // 'Oct 19, 2020'
```

---

## title: all

Checks if the provided predicate function returns `true` for all elements in a collection.

- Use `Array.prototype.every()` to test if all elements in the collection return `true` based on `fn`.
- Omit the second argument, `fn`, to use `Boolean` as a default.

```js
const all = (arr, fn = Boolean) => arr.every(fn);
```

```js
all([4, 2, 3], (x) => x > 1); // true
all([1, 2, 3]); // true
```

---

## title: allEqual

Checks if all elements in an array are equal.

- Use `Array.prototype.every()` to check if all the elements of the array are the same as the first one.
- Elements in the array are compared using the strict comparison operator, which does not account for `NaN` self-inequality.

```js
const allEqual = (arr) => arr.every((val) => val === arr[0]);
```

```js
allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```

---

## title: allEqualBy

Checks if all elements in an array are equal, based on the provided mapping function.

- Apply `fn` to the first element of `arr`.
- Use `Array.prototype.every()` to check if `fn` returns the same value for all elements in the array as it did for the first one.
- Elements in the array are compared using the strict comparison operator, which does not account for `NaN` self-inequality.

```js
const allEqualBy = (arr, fn) => {
  const eql = fn(arr[0]);
  return arr.every((val) => fn(val) === eql);
};
```

```js
allEqualBy([1.1, 1.2, 1.3], Math.round); // true
allEqualBy([1.1, 1.3, 1.6], Math.round); // false
```

---

## title: allUnique

Checks if all elements in an array are unique.

- Create a new `Set` from the mapped values to keep only unique occurrences.
- Use `Array.prototype.length` and `Set.prototype.size` to compare the length of the unique values to the original array.

```js
const allUnique = (arr) => arr.length === new Set(arr).size;
```

```js
allUnique([1, 2, 3, 4]); // true
allUnique([1, 1, 2, 3]); // false
```

---

## title: allUniqueBy

Checks if all elements in an array are unique, based on the provided mapping function.

- Use `Array.prototype.map()` to apply `fn` to all elements in `arr`.
- Create a new `Set` from the mapped values to keep only unique occurrences.
- Use `Array.prototype.length` and `Set.prototype.size` to compare the length of the unique mapped values to the original array.

```js
const allUniqueBy = (arr, fn) => arr.length === new Set(arr.map(fn)).size;
```

```js
allUniqueBy([1.2, 2.4, 2.9], Math.round); // true
allUniqueBy([1.2, 2.3, 2.4], Math.round); // false
```

---

title: and
unlisted: true

---

Checks if both arguments are `true`.

- Use the logical and (`&&`) operator on the two given values.

```js
const and = (a, b) => a && b;
```

```js
and(true, true); // true
and(true, false); // false
and(false, false); // false
```

---

## title: any

Checks if the provided predicate function returns `true` for at least one element in a collection.

- Use `Array.prototype.some()` to test if any elements in the collection return `true` based on `fn`.
- Omit the second argument, `fn`, to use `Boolean` as a default.

```js
const any = (arr, fn = Boolean) => arr.some(fn);
```

```js
any([0, 1, 2, 0], (x) => x >= 2); // true
any([0, 0, 1, 0]); // true
```

---

## title: aperture

Creates an array of `n`-tuples of consecutive elements.

- Use `Array.prototype.slice()` and `Array.prototype.map()` to create an array of appropriate length.
- Populate the array with `n`-tuples of consecutive elements from `arr`.
- If `n` is greater than the length of `arr`, return an empty array.

```js
const aperture = (n, arr) =>
  n > arr.length ? [] : arr.slice(n - 1).map((v, i) => arr.slice(i, i + n));
```

```js
aperture(2, [1, 2, 3, 4]); // [[1, 2], [2, 3], [3, 4]]
aperture(3, [1, 2, 3, 4]); // [[1, 2, 3], [2, 3, 4]]
aperture(5, [1, 2, 3, 4]); // []
```

---

## title: approximatelyEqual

Checks if two numbers are approximately equal to each other.

- Use `Math.abs()` to compare the absolute difference of the two values to `epsilon`.
- Omit the third argument, `epsilon`, to use a default value of `0.001`.

```js
const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;
```

```js
approximatelyEqual(Math.PI / 2.0, 1.5708); // true
```

---

## title: arithmeticProgression

Creates an array of numbers in the arithmetic progression, starting with the given positive integer and up to the specified limit.

- Use `Array.from()` to create an array of the desired length, `lim/n`. Use a map function to fill it with the desired values in the given range.

```js
const arithmeticProgression = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n);
```

```js
arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]
```

---

## title: arrayToCSV

Converts a 2D array to a comma-separated values (CSV) string.

- Use `Array.prototype.map()` and `Array.prototype.join(delimiter)` to combine individual 1D arrays (rows) into strings.
- Use `Array.prototype.join('\n')` to combine all rows into a CSV string, separating each row with a newline.
- Omit the second argument, `delimiter`, to use a default delimiter of `,`.

```js
const arrayToCSV = (arr, delimiter = ",") =>
  arr
    .map((v) =>
      v
        .map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x))
        .join(delimiter)
    )
    .join("\n");
```

```js
arrayToCSV([
  ["a", "b"],
  ["c", "d"],
]); // '"a","b"\n"c","d"'
arrayToCSV(
  [
    ["a", "b"],
    ["c", "d"],
  ],
  ";"
); // '"a";"b"\n"c";"d"'
arrayToCSV([
  ["a", '"b" great'],
  ["c", 3.1415],
]);
// '"a","""b"" great"\n"c",3.1415'
```

---

## title: arrayToHTMLList

Converts the given array elements into `<li>` tags and appends them to the list of the given id.

- Use `Array.prototype.map()` and `Document.querySelector()` to create a list of html tags.

```js
const arrayToHTMLList = (arr, listID) =>
  (document.querySelector(`#${listID}`).innerHTML += arr
    .map((item) => `<li>${item}</li>`)
    .join(""));
```

```js
arrayToHTMLList(["item 1", "item 2"], "myListID");
```

---

## title: ary

Creates a function that accepts up to `n` arguments, ignoring any additional arguments.

- Call the provided function, `fn`, with up to `n` arguments, using `Array.prototype.slice(0, n)` and the spread operator (`...`).

```js
const ary =
  (fn, n) =>
  (...args) =>
    fn(...args.slice(0, n));
```

```js
const firstTwoMax = ary(Math.max, 2);
[[2, 6, "a"], [6, 4, 8], [10]].map((x) => firstTwoMax(...x)); // [6, 6, 10]
```

---

## title: assertValidKeys

Validates all keys in an object match the given `keys`.

- Use `Object.keys()` to get the keys of the given object, `obj`.
- Use `Array.prototype.every()` and `Array.prototype.includes()` to validate that each key in the object is specified in the `keys` array.

```js
const assertValidKeys = (obj, keys) =>
  Object.keys(obj).every((key) => keys.includes(key));
```

```js
assertValidKeys({ id: 10, name: "apple" }, ["id", "name"]); // true
assertValidKeys({ id: 10, name: "apple" }, ["id", "type"]); // false
```

---

## title: atob

Decodes a string of data which has been encoded using base-64 encoding.

- Create a `Buffer` for the given string with base-64 encoding and use `Buffer.toString('binary')` to return the decoded string.

```js
const atob = (str) => Buffer.from(str, "base64").toString("binary");
```

```js
atob("Zm9vYmFy"); // 'foobar'
```

---

## title: attempt

Attempts to invoke a function with the provided arguments, returning either the result or the caught error object.

- Use a `try... catch` block to return either the result of the function or an appropriate error.
- If the caught object is not an `Error`, use it to create a new `Error`.

```js
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
};
```

```js
let elements = attempt(function (selector) {
  return document.querySelectorAll(selector);
}, ">_>");
if (elements instanceof Error) elements = []; // elements = []
```

---

## title: average

Calculates the average of two or more numbers.

- Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`.
- Divide the resulting array by its length.

```js
const average = (...nums) =>
  nums.reduce((acc, val) => acc + val, 0) / nums.length;
```

```js
average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2
```

---

## title: averageBy

Calculates the average of an array, after mapping each element to a value using the provided function.

- Use `Array.prototype.map()` to map each element to the value returned by `fn`.
- Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`.
- Divide the resulting array by its length.

```js
const averageBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val) => acc + val, 0) / arr.length;
```

```js
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (o) => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 5
```

---

## title: bifurcate

Splits values into two groups, based on the result of the given `filter` array.

- Use `Array.prototype.reduce()` and `Array.prototype.push()` to add elements to groups, based on `filter`.
- If `filter` has a truthy value for any element, add it to the first group, otherwise add it to the second group.

```js
const bifurcate = (arr, filter) =>
  arr.reduce(
    (acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc),
    [[], []]
  );
```

```js
bifurcate(["beep", "boop", "foo", "bar"], [true, true, false, true]);
// [ ['beep', 'boop', 'bar'], ['foo'] ]
```

---

## title: bifurcateBy

Splits values into two groups, based on the result of the given filtering function.

- Use `Array.prototype.reduce()` and `Array.prototype.push()` to add elements to groups, based on the value returned by `fn` for each element.
- If `fn` returns a truthy value for any element, add it to the first group, otherwise add it to the second group.

```js
const bifurcateBy = (arr, fn) =>
  arr.reduce(
    (acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc),
    [[], []]
  );
```

```js
bifurcateBy(["beep", "boop", "foo", "bar"], (x) => x[0] === "b");
// [ ['beep', 'boop', 'bar'], ['foo'] ]
```

---

## title: binary

Creates a function that accepts up to two arguments, ignoring any additional arguments.

- Call the provided function, `fn`, with the first two arguments given.

```js
const binary = (fn) => (a, b) => fn(a, b);
```

```js
["2", "1", "0"].map(binary(Math.max)); // [2, 1, 2]
```

---

## title: binarySearch

Finds the index of a given element in a sorted array using the binary search algorithm.

- Declare the left and right search boundaries, `l` and `r`, initialized to `0` and the `length` of the array respectively.
- Use a `while` loop to repeatedly narrow down the search subarray, using `Math.floor()` to cut it in half.
- Return the index of the element if found, otherwise return `-1`.
- **Note:** Does not account for duplicate values in the array.

```js
const binarySearch = (arr, item) => {
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const guess = arr[mid];
    if (guess === item) return mid;
    if (guess > item) r = mid - 1;
    else l = mid + 1;
  }
  return -1;
};
```

```js
binarySearch([1, 2, 3, 4, 5], 1); // 0
binarySearch([1, 2, 3, 4, 5], 5); // 4
binarySearch([1, 2, 3, 4, 5], 6); // -1
```

---

## title: bind

Creates a function that invokes `fn` with a given context, optionally prepending any additional supplied parameters to the arguments.

- Return a `function` that uses `Function.prototype.apply()` to apply the given `context` to `fn`.
- Use the spread operator (`...`) to prepend any additional supplied parameters to the arguments.

```js
const bind =
  (fn, context, ...boundArgs) =>
  (...args) =>
    fn.apply(context, [...boundArgs, ...args]);
```

```js
function greet(greeting, punctuation) {
  return greeting + " " + this.user + punctuation;
}
const freddy = { user: "fred" };
const freddyBound = bind(greet, freddy);
console.log(freddyBound("hi", "!")); // 'hi fred!'
```

---

## title: bindAll

Binds methods of an object to the object itself, overwriting the existing method.

- Use `Array.prototype.forEach()` to iterate over the given `fns`.
- Return a function for each one, using `Function.prototype.apply()` to apply the given context (`obj`) to `fn`.

```js
const bindAll = (obj, ...fns) =>
  fns.forEach(
    (fn) => (
      (f = obj[fn]),
      (obj[fn] = function () {
        return f.apply(obj);
      })
    )
  );
```

```js
let view = {
  label: "docs",
  click: function () {
    console.log("clicked " + this.label);
  },
};
bindAll(view, "click");
document.body.addEventListener("click", view.click);
// Log 'clicked docs' when clicked.
```

---

## title: bindKey

Creates a function that invokes the method at a given key of an object, optionally prepending any additional supplied parameters to the arguments.

- Return a `function` that uses `Function.prototype.apply()` to bind `context[fn]` to `context`.
- Use the spread operator (`...`) to prepend any additional supplied parameters to the arguments.

```js
const bindKey =
  (context, fn, ...boundArgs) =>
  (...args) =>
    context[fn].apply(context, [...boundArgs, ...args]);
```

```js
const freddy = {
  user: "fred",
  greet: function (greeting, punctuation) {
    return greeting + " " + this.user + punctuation;
  },
};
const freddyBound = bindKey(freddy, "greet");
console.log(freddyBound("hi", "!")); // 'hi fred!'
```

---

## title: binomialCoefficient

Calculates the number of ways to choose `k` items from `n` items without repetition and without order.

- Use `Number.isNaN()` to check if any of the two values is `NaN`.
- Check if `k` is less than `0`, greater than or equal to `n`, equal to `1` or `n - 1` and return the appropriate result.
- Check if `n - k` is less than `k` and switch their values accordingly.
- Loop from `2` through `k` and calculate the binomial coefficient.
- Use `Math.round()` to account for rounding errors in the calculation.

```js
const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};
```

```js
binomialCoefficient(8, 2); // 28
```

---

title: both
unlisted: true

---

Checks if both of the given functions return `true` for a given set of arguments.

- Use the logical and (`&&`) operator on the result of calling the two functions with the supplied `args`.

```js
const both =
  (f, g) =>
  (...args) =>
    f(...args) && g(...args);
```

```js
const isEven = (num) => num % 2 === 0;
const isPositive = (num) => num > 0;
const isPositiveEven = both(isEven, isPositive);
isPositiveEven(4); // true
isPositiveEven(-2); // false
```

---

## title: HSBToRGB

Converts a HSB color tuple to RGB format.

- Use the [HSB to RGB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB) to convert to the appropriate format.
- The range of the input parameters is H: [0, 360], S: [0, 100], B: [0, 100].
- The range of all output values is [0, 255].

```js
const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};
```

```js
HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]
```

---

## title: HSLToRGB

Converts a HSL color tuple to RGB format.

- Use the [HSL to RGB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB) to convert to the appropriate format.
- The range of the input parameters is H: [0, 360], S: [0, 100], L: [0, 100].
- The range of all output values is [0, 255].

```js
const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};
```

```js
HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]
```

---

## title: JSONToFile

Writes a JSON object to a file.

- Use `fs.writeFileSync()`, template literals and `JSON.stringify()` to write a `json` object to a `.json` file.

```js
const fs = require("fs");

const JSONToFile = (obj, filename) =>
  fs.writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));
```

```js
JSONToFile({ test: "is passed" }, "testJsonFile");
// writes the object to 'testJsonFile.json'
```

---

## title: JSONtoCSV

Converts an array of objects to a comma-separated values (CSV) string that contains only the `columns` specified.

- Use `Array.prototype.join(delimiter)` to combine all the names in `columns` to create the first row.
- Use `Array.prototype.map()` and `Array.prototype.reduce()` to create a row for each object. Substitute non-existent values with empty strings and only mapping values in `columns`.
- Use `Array.prototype.join('\n')` to combine all rows into a string.
- Omit the third argument, `delimiter`, to use a default delimiter of `','`.

```js
const JSONtoCSV = (arr, columns, delimiter = ",") =>
  [
    columns.join(delimiter),
    ...arr.map((obj) =>
      columns.reduce(
        (acc, key) =>
          `${acc}${!acc.length ? "" : delimiter}"${!obj[key] ? "" : obj[key]}"`,
        ""
      )
    ),
  ].join("\n");
```

```js
JSONtoCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
  ["a", "b"]
); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
JSONtoCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
  ["a", "b"],
  ";"
); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
```

---

## title: RGBToHSB

Converts a RGB color tuple to HSB format.

- Use the [RGB to HSB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB) to convert to the appropriate format.
- The range of all input parameters is [0, 255].
- The range of the resulting values is H: [0, 360], S: [0, 100], B: [0, 100].

```js
const RGBToHSB = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n === 0
      ? 0
      : n && v === r
      ? (g - b) / n
      : v === g
      ? 2 + (b - r) / n
      : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};
```

```js
RGBToHSB(252, 111, 48);
// [18.529411764705856, 80.95238095238095, 98.82352941176471]
```

---

## title: RGBToHSL

Converts a RGB color tuple to HSL format.

- Use the [RGB to HSL conversion formula](https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/) to convert to the appropriate format.
- The range of all input parameters is [0, 255].
- The range of the resulting values is H: [0, 360], S: [0, 100], L: [0, 100].

```js
const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};
```

```js
RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]
```

---

## title: RGBToHex

Converts the values of RGB components to a hexadecimal color code.

- Convert given RGB parameters to hexadecimal string using bitwise left-shift operator (`<<`) and `Number.prototype.toString(16)`.
- Use `String.prototype.padStart(6, '0')` to get a 6-digit hexadecimal value.

```js
const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
```

```js
RGBToHex(255, 165, 1); // 'ffa501'
```

---

## title: URLJoin

Joins all given URL segments together, then normalizes the resulting URL.

- Use `String.prototype.join('/')` to combine URL segments.
- Use a series of `String.prototype.replace()` calls with various regexps to normalize the resulting URL (remove double slashes, add proper slashes for protocol, remove slashes before parameters, combine parameters with `'&'` and normalize first parameter delimiter).

```js
const URLJoin = (...args) =>
  args
    .join("/")
    .replace(/[\/]+/g, "/")
    .replace(/^(.+):\//, "$1://")
    .replace(/^file:/, "file:/")
    .replace(/\/(\?|&|#[^!])/g, "$1")
    .replace(/\?/g, "&")
    .replace("&", "?");
```

```js
URLJoin("http://www.google.com", "a", "/b/cd", "?foo=123", "?bar=foo");
// 'http://www.google.com/a/b/cd?foo=123&bar=foo'
```

---

## title: UUIDGeneratorBrowser

Generates a UUID in a browser.

- Use `Crypto.getRandomValues()` to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.
- Use `Number.prototype.toString(16)` to convert it to a proper UUID.

```js
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
```

```js
UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'
```

---

## title: UUIDGeneratorNode

Generates a UUID in Node.JS.

- Use `crypto.randomBytes()` to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.
- Use `Number.prototype.toString(16)` to convert it to a proper UUID.

```js
const crypto = require("crypto");

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );
```

```js
UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'
```

---

## title: accumulate

Creates an array of partial sums.

- Use `Array.prototype.reduce()`, initialized with an empty array accumulator to iterate over `nums`.
- Use `Array.prototype.slice(-1)`, the spread operator (`...`) and the unary `+` operator to add each value to the accumulator array containing the previous sums.

```js
const accumulate = (...nums) =>
  nums.reduce((acc, n) => [...acc, n + +acc.slice(-1)], []);
```

```js
accumulate(1, 2, 3, 4); // [1, 3, 6, 10]
accumulate(...[1, 2, 3, 4]); // [1, 3, 6, 10]
```

---

## title: addClass

Adds a class to an HTML element.

- Use `Element.classList` and `DOMTokenList.add()` to add the specified class to the element.

```js
const addClass = (el, className) => el.classList.add(className);
```

```js
addClass(document.querySelector("p"), "special");
// The paragraph will now have the 'special' class
```

---

## title: addDaysToDate

Calculates the date of `n` days from the given date, returning its string representation.

- Use `new Date()` to create a date object from the first argument.
- Use `Date.prototype.getDate()` and `Date.prototype.setDate()` to add `n` days to the given date.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const addDaysToDate = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
};
```

```js
addDaysToDate("2020-10-15", 10); // '2020-10-25'
addDaysToDate("2020-10-15", -10); // '2020-10-05'
```

---

## title: addEventListenerAll

Attaches an event listener to all the provided targets.

- Use `Array.prototype.forEach()` and `EventTarget.addEventListener()` to attach the provided `listener` for the given event `type` to all `targets`.

```js
const addEventListenerAll = (targets, type, listener, options, useCapture) => {
  targets.forEach((target) =>
    target.addEventListener(type, listener, options, useCapture)
  );
};
```

```js
addEventListenerAll(document.querySelectorAll("a"), "click", () =>
  console.log("Clicked a link")
);
// Logs 'Clicked a link' whenever any anchor element is clicked
```

---

## title: addMinutesToDate

Calculates the date of `n` minutes from the given date, returning its string representation.

- Use `new Date()` to create a date object from the first argument.
- Use `Date.prototype.getTime()` and `Date.prototype.setTime()` to add `n` minutes to the given date.
- Use `Date.prototype.toISOString()`, `String.prototype.split()` and `String.prototype.replace()` to return a string in `yyyy-mm-dd HH:MM:SS` format.

```js
const addMinutesToDate = (date, n) => {
  const d = new Date(date);
  d.setTime(d.getTime() + n * 60000);
  return d.toISOString().split(".")[0].replace("T", " ");
};
```

```js
addMinutesToDate("2020-10-19 12:00:00", 10); // '2020-10-19 12:10:00'
addMinutesToDate("2020-10-19", -10); // '2020-10-18 23:50:00'
```

---

## title: addMultipleListeners

Adds multiple event listeners with the same handler to an element.

- Use `Array.prototype.forEach()` and `EventTarget.addEventListener()` to add multiple event listeners with an assigned callback function to an element.

```js
const addMultipleListeners = (el, types, listener, options, useCapture) => {
  types.forEach((type) =>
    el.addEventListener(type, listener, options, useCapture)
  );
};
```

```js
addMultipleListeners(
  document.querySelector(".my-element"),
  ["click", "mousedown"],
  () => {
    console.log("hello!");
  }
);
```

---

## title: addStyles

Adds the provided styles to the given element.

- Use `Object.assign()` and `ElementCSSInlineStyle.style` to merge the provided `styles` object into the style of the given element.

```js
const addStyles = (el, styles) => Object.assign(el.style, styles);
```

```js
addStyles(document.getElementById("my-element"), {
  background: "red",
  color: "#ffff00",
  fontSize: "3rem",
});
```

---

## title: addWeekDays

Calculates the date after adding the given number of business days.

- Use `Array.from()` to construct an array with `length` equal to the `count` of business days to be added.
- Use `Array.prototype.reduce()` to iterate over the array, starting from `startDate` and incrementing, using `Date.prototype.getDate()` and `Date.prototype.setDate()`.
- If the current `date` is on a weekend, update it again by adding either one day or two days to make it a weekday.
- **NOTE:** Does not take official holidays into account.

```js
const addWeekDays = (startDate, count) =>
  Array.from({ length: count }).reduce((date) => {
    date = new Date(date.setDate(date.getDate() + 1));
    if (date.getDay() % 6 === 0)
      date = new Date(date.setDate(date.getDate() + (date.getDay() / 6 + 1)));
    return date;
  }, startDate);
```

```js
addWeekDays(new Date("Oct 09, 2020"), 5); // 'Oct 16, 2020'
addWeekDays(new Date("Oct 12, 2020"), 5); // 'Oct 19, 2020'
```

---

## title: all

Checks if the provided predicate function returns `true` for all elements in a collection.

- Use `Array.prototype.every()` to test if all elements in the collection return `true` based on `fn`.
- Omit the second argument, `fn`, to use `Boolean` as a default.

```js
const all = (arr, fn = Boolean) => arr.every(fn);
```

```js
all([4, 2, 3], (x) => x > 1); // true
all([1, 2, 3]); // true
```

---

## title: allEqual

Checks if all elements in an array are equal.

- Use `Array.prototype.every()` to check if all the elements of the array are the same as the first one.
- Elements in the array are compared using the strict comparison operator, which does not account for `NaN` self-inequality.

```js
const allEqual = (arr) => arr.every((val) => val === arr[0]);
```

```js
allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```

---

## title: allEqualBy

Checks if all elements in an array are equal, based on the provided mapping function.

- Apply `fn` to the first element of `arr`.
- Use `Array.prototype.every()` to check if `fn` returns the same value for all elements in the array as it did for the first one.
- Elements in the array are compared using the strict comparison operator, which does not account for `NaN` self-inequality.

```js
const allEqualBy = (arr, fn) => {
  const eql = fn(arr[0]);
  return arr.every((val) => fn(val) === eql);
};
```

```js
allEqualBy([1.1, 1.2, 1.3], Math.round); // true
allEqualBy([1.1, 1.3, 1.6], Math.round); // false
```

---

## title: allUnique

Checks if all elements in an array are unique.

- Create a new `Set` from the mapped values to keep only unique occurrences.
- Use `Array.prototype.length` and `Set.prototype.size` to compare the length of the unique values to the original array.

```js
const allUnique = (arr) => arr.length === new Set(arr).size;
```

```js
allUnique([1, 2, 3, 4]); // true
allUnique([1, 1, 2, 3]); // false
```

---

## title: allUniqueBy

Checks if all elements in an array are unique, based on the provided mapping function.

- Use `Array.prototype.map()` to apply `fn` to all elements in `arr`.
- Create a new `Set` from the mapped values to keep only unique occurrences.
- Use `Array.prototype.length` and `Set.prototype.size` to compare the length of the unique mapped values to the original array.

```js
const allUniqueBy = (arr, fn) => arr.length === new Set(arr.map(fn)).size;
```

```js
allUniqueBy([1.2, 2.4, 2.9], Math.round); // true
allUniqueBy([1.2, 2.3, 2.4], Math.round); // false
```

---

title: and
unlisted: true

---

Checks if both arguments are `true`.

- Use the logical and (`&&`) operator on the two given values.

```js
const and = (a, b) => a && b;
```

```js
and(true, true); // true
and(true, false); // false
and(false, false); // false
```

---

## title: any

Checks if the provided predicate function returns `true` for at least one element in a collection.

- Use `Array.prototype.some()` to test if any elements in the collection return `true` based on `fn`.
- Omit the second argument, `fn`, to use `Boolean` as a default.

```js
const any = (arr, fn = Boolean) => arr.some(fn);
```

```js
any([0, 1, 2, 0], (x) => x >= 2); // true
any([0, 0, 1, 0]); // true
```

---

## title: aperture

Creates an array of `n`-tuples of consecutive elements.

- Use `Array.prototype.slice()` and `Array.prototype.map()` to create an array of appropriate length.
- Populate the array with `n`-tuples of consecutive elements from `arr`.
- If `n` is greater than the length of `arr`, return an empty array.

```js
const aperture = (n, arr) =>
  n > arr.length ? [] : arr.slice(n - 1).map((v, i) => arr.slice(i, i + n));
```

```js
aperture(2, [1, 2, 3, 4]); // [[1, 2], [2, 3], [3, 4]]
aperture(3, [1, 2, 3, 4]); // [[1, 2, 3], [2, 3, 4]]
aperture(5, [1, 2, 3, 4]); // []
```

---

## title: approximatelyEqual

Checks if two numbers are approximately equal to each other.

- Use `Math.abs()` to compare the absolute difference of the two values to `epsilon`.
- Omit the third argument, `epsilon`, to use a default value of `0.001`.

```js
const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;
```

```js
approximatelyEqual(Math.PI / 2.0, 1.5708); // true
```

---

## title: arithmeticProgression

Creates an array of numbers in the arithmetic progression, starting with the given positive integer and up to the specified limit.

- Use `Array.from()` to create an array of the desired length, `lim/n`. Use a map function to fill it with the desired values in the given range.

```js
const arithmeticProgression = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n);
```

```js
arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]
```

---

## title: arrayToCSV

Converts a 2D array to a comma-separated values (CSV) string.

- Use `Array.prototype.map()` and `Array.prototype.join(delimiter)` to combine individual 1D arrays (rows) into strings.
- Use `Array.prototype.join('\n')` to combine all rows into a CSV string, separating each row with a newline.
- Omit the second argument, `delimiter`, to use a default delimiter of `,`.

```js
const arrayToCSV = (arr, delimiter = ",") =>
  arr
    .map((v) =>
      v
        .map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x))
        .join(delimiter)
    )
    .join("\n");
```

```js
arrayToCSV([
  ["a", "b"],
  ["c", "d"],
]); // '"a","b"\n"c","d"'
arrayToCSV(
  [
    ["a", "b"],
    ["c", "d"],
  ],
  ";"
); // '"a";"b"\n"c";"d"'
arrayToCSV([
  ["a", '"b" great'],
  ["c", 3.1415],
]);
// '"a","""b"" great"\n"c",3.1415'
```

---

## title: arrayToHTMLList

Converts the given array elements into `<li>` tags and appends them to the list of the given id.

- Use `Array.prototype.map()` and `Document.querySelector()` to create a list of html tags.

```js
const arrayToHTMLList = (arr, listID) =>
  (document.querySelector(`#${listID}`).innerHTML += arr
    .map((item) => `<li>${item}</li>`)
    .join(""));
```

```js
arrayToHTMLList(["item 1", "item 2"], "myListID");
```

---

## title: ary

Creates a function that accepts up to `n` arguments, ignoring any additional arguments.

- Call the provided function, `fn`, with up to `n` arguments, using `Array.prototype.slice(0, n)` and the spread operator (`...`).

```js
const ary =
  (fn, n) =>
  (...args) =>
    fn(...args.slice(0, n));
```

```js
const firstTwoMax = ary(Math.max, 2);
[[2, 6, "a"], [6, 4, 8], [10]].map((x) => firstTwoMax(...x)); // [6, 6, 10]
```

---

## title: assertValidKeys

Validates all keys in an object match the given `keys`.

- Use `Object.keys()` to get the keys of the given object, `obj`.
- Use `Array.prototype.every()` and `Array.prototype.includes()` to validate that each key in the object is specified in the `keys` array.

```js
const assertValidKeys = (obj, keys) =>
  Object.keys(obj).every((key) => keys.includes(key));
```

```js
assertValidKeys({ id: 10, name: "apple" }, ["id", "name"]); // true
assertValidKeys({ id: 10, name: "apple" }, ["id", "type"]); // false
```

---

## title: atob

Decodes a string of data which has been encoded using base-64 encoding.

- Create a `Buffer` for the given string with base-64 encoding and use `Buffer.toString('binary')` to return the decoded string.

```js
const atob = (str) => Buffer.from(str, "base64").toString("binary");
```

```js
atob("Zm9vYmFy"); // 'foobar'
```

---

## title: attempt

Attempts to invoke a function with the provided arguments, returning either the result or the caught error object.

- Use a `try... catch` block to return either the result of the function or an appropriate error.
- If the caught object is not an `Error`, use it to create a new `Error`.

```js
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
};
```

```js
let elements = attempt(function (selector) {
  return document.querySelectorAll(selector);
}, ">_>");
if (elements instanceof Error) elements = []; // elements = []
```

---

## title: average

Calculates the average of two or more numbers.

- Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`.
- Divide the resulting array by its length.

```js
const average = (...nums) =>
  nums.reduce((acc, val) => acc + val, 0) / nums.length;
```

```js
average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2
```

---

## title: averageBy

Calculates the average of an array, after mapping each element to a value using the provided function.

- Use `Array.prototype.map()` to map each element to the value returned by `fn`.
- Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`.
- Divide the resulting array by its length.

```js
const averageBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val) => acc + val, 0) / arr.length;
```

```js
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (o) => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 5
```

---

## title: bifurcate

Splits values into two groups, based on the result of the given `filter` array.

- Use `Array.prototype.reduce()` and `Array.prototype.push()` to add elements to groups, based on `filter`.
- If `filter` has a truthy value for any element, add it to the first group, otherwise add it to the second group.

```js
const bifurcate = (arr, filter) =>
  arr.reduce(
    (acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc),
    [[], []]
  );
```

```js
bifurcate(["beep", "boop", "foo", "bar"], [true, true, false, true]);
// [ ['beep', 'boop', 'bar'], ['foo'] ]
```

---

## title: bifurcateBy

Splits values into two groups, based on the result of the given filtering function.

- Use `Array.prototype.reduce()` and `Array.prototype.push()` to add elements to groups, based on the value returned by `fn` for each element.
- If `fn` returns a truthy value for any element, add it to the first group, otherwise add it to the second group.

```js
const bifurcateBy = (arr, fn) =>
  arr.reduce(
    (acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc),
    [[], []]
  );
```

```js
bifurcateBy(["beep", "boop", "foo", "bar"], (x) => x[0] === "b");
// [ ['beep', 'boop', 'bar'], ['foo'] ]
```

---

## title: binary

Creates a function that accepts up to two arguments, ignoring any additional arguments.

- Call the provided function, `fn`, with the first two arguments given.

```js
const binary = (fn) => (a, b) => fn(a, b);
```

```js
["2", "1", "0"].map(binary(Math.max)); // [2, 1, 2]
```

---

## title: binarySearch

Finds the index of a given element in a sorted array using the binary search algorithm.

- Declare the left and right search boundaries, `l` and `r`, initialized to `0` and the `length` of the array respectively.
- Use a `while` loop to repeatedly narrow down the search subarray, using `Math.floor()` to cut it in half.
- Return the index of the element if found, otherwise return `-1`.
- **Note:** Does not account for duplicate values in the array.

```js
const binarySearch = (arr, item) => {
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const guess = arr[mid];
    if (guess === item) return mid;
    if (guess > item) r = mid - 1;
    else l = mid + 1;
  }
  return -1;
};
```

```js
binarySearch([1, 2, 3, 4, 5], 1); // 0
binarySearch([1, 2, 3, 4, 5], 5); // 4
binarySearch([1, 2, 3, 4, 5], 6); // -1
```

---

## title: bind

Creates a function that invokes `fn` with a given context, optionally prepending any additional supplied parameters to the arguments.

- Return a `function` that uses `Function.prototype.apply()` to apply the given `context` to `fn`.
- Use the spread operator (`...`) to prepend any additional supplied parameters to the arguments.

```js
const bind =
  (fn, context, ...boundArgs) =>
  (...args) =>
    fn.apply(context, [...boundArgs, ...args]);
```

```js
function greet(greeting, punctuation) {
  return greeting + " " + this.user + punctuation;
}
const freddy = { user: "fred" };
const freddyBound = bind(greet, freddy);
console.log(freddyBound("hi", "!")); // 'hi fred!'
```

---

## title: bindAll

Binds methods of an object to the object itself, overwriting the existing method.

- Use `Array.prototype.forEach()` to iterate over the given `fns`.
- Return a function for each one, using `Function.prototype.apply()` to apply the given context (`obj`) to `fn`.

```js
const bindAll = (obj, ...fns) =>
  fns.forEach(
    (fn) => (
      (f = obj[fn]),
      (obj[fn] = function () {
        return f.apply(obj);
      })
    )
  );
```

```js
let view = {
  label: "docs",
  click: function () {
    console.log("clicked " + this.label);
  },
};
bindAll(view, "click");
document.body.addEventListener("click", view.click);
// Log 'clicked docs' when clicked.
```

---

## title: bindKey

Creates a function that invokes the method at a given key of an object, optionally prepending any additional supplied parameters to the arguments.

- Return a `function` that uses `Function.prototype.apply()` to bind `context[fn]` to `context`.
- Use the spread operator (`...`) to prepend any additional supplied parameters to the arguments.

```js
const bindKey =
  (context, fn, ...boundArgs) =>
  (...args) =>
    context[fn].apply(context, [...boundArgs, ...args]);
```

```js
const freddy = {
  user: "fred",
  greet: function (greeting, punctuation) {
    return greeting + " " + this.user + punctuation;
  },
};
const freddyBound = bindKey(freddy, "greet");
console.log(freddyBound("hi", "!")); // 'hi fred!'
```

---

## title: binomialCoefficient

Calculates the number of ways to choose `k` items from `n` items without repetition and without order.

- Use `Number.isNaN()` to check if any of the two values is `NaN`.
- Check if `k` is less than `0`, greater than or equal to `n`, equal to `1` or `n - 1` and return the appropriate result.
- Check if `n - k` is less than `k` and switch their values accordingly.
- Loop from `2` through `k` and calculate the binomial coefficient.
- Use `Math.round()` to account for rounding errors in the calculation.

```js
const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};
```

```js
binomialCoefficient(8, 2); // 28
```

---

title: both
unlisted: true

---

Checks if both of the given functions return `true` for a given set of arguments.

- Use the logical and (`&&`) operator on the result of calling the two functions with the supplied `args`.

```js
const both =
  (f, g) =>
  (...args) =>
    f(...args) && g(...args);
```

```js
const isEven = (num) => num % 2 === 0;
const isPositive = (num) => num > 0;
const isPositiveEven = both(isEven, isPositive);
isPositiveEven(4); // true
isPositiveEven(-2); // false
```

[Widgets](https://www.wappalyzer.com/technologies/widgets/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer) 
chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Moat.svg
chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Facebook.svg
![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Facebook.svg)

Facebook](https://www.wappalyzer.com/technologies/widgets/facebook/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/AddThis.svg)

AddThis](https://www.wappalyzer.com/technologies/widgets/addthis/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[Analytics](https://www.wappalyzer.com/technologies/analytics/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Moat.svg)

Moat](https://www.wappalyzer.com/technologies/analytics/moat/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Google%20Analytics.svg)

Google Analytics](https://www.wappalyzer.com/technologies/analytics/google-analytics/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Google.svg)

Google Ads Conversion Tracking](https://www.wappalyzer.com/technologies/analytics/google-ads-conversion-tracking/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[JavaScript frameworks](https://www.wappalyzer.com/technologies/javascript-frameworks/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/React.png)

React](https://www.wappalyzer.com/technologies/javascript-frameworks/react/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Gatsby.svg)

Gatsby2.25.4](https://www.wappalyzer.com/technologies/javascript-frameworks/gatsby/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[Font scripts](https://www.wappalyzer.com/technologies/font-scripts/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Google%20Font%20API.png)

Google Font API](https://www.wappalyzer.com/technologies/font-scripts/google-font-api/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[Miscellaneous](https://www.wappalyzer.com/technologies/miscellaneous/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/webpack.svg)

webpack](https://www.wappalyzer.com/technologies/miscellaneous/webpack/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Prism.svg)

Prism](https://www.wappalyzer.com/technologies/miscellaneous/prism/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[CDN](https://www.wappalyzer.com/technologies/cdn/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Unpkg.png)

Unpkg](https://www.wappalyzer.com/technologies/cdn/unpkg/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/jsdelivr-icon.svg)

jsDelivr](https://www.wappalyzer.com/technologies/cdn/jsdelivr/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/jQuery.svg)

jQuery CDN](https://www.wappalyzer.com/technologies/cdn/jquery-cdn/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Netlify.svg)

Netlify](https://www.wappalyzer.com/technologies/cdn/netlify/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[Marketing automation](https://www.wappalyzer.com/technologies/marketing-automation/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/mailchimp.svg)

MailChimp](https://www.wappalyzer.com/technologies/marketing-automation/mailchimp/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[Advertising](https://www.wappalyzer.com/technologies/advertising/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Google%20AdSense.svg)

Google AdSense](https://www.wappalyzer.com/technologies/advertising/google-adsense/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[Tag managers](https://www.wappalyzer.com/technologies/tag-managers/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Google%20Tag%20Manager.svg)

Google Tag Manager](https://www.wappalyzer.com/technologies/tag-managers/google-tag-manager/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[Live chat](https://www.wappalyzer.com/technologies/live-chat/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Smartsupp.svg)

Smartsupp1](https://www.wappalyzer.com/technologies/live-chat/smartsupp/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/LiveChat.png)

LiveChat](https://www.wappalyzer.com/technologies/live-chat/livechat/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[Static site generators](https://www.wappalyzer.com/technologies/static-site-generator/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Gatsby.svg)

Gatsby2.25.4](https://www.wappalyzer.com/technologies/static-site-generator/gatsby/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[JavaScript libraries](https://www.wappalyzer.com/technologies/javascript-libraries/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Lo-dash.png)

Lodash4.17.11](https://www.wappalyzer.com/technologies/javascript-libraries/lodash/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Dojo.png)

Dojo1](https://www.wappalyzer.com/technologies/javascript-libraries/dojo/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/core-js.png)

core-js3.10.2](https://www.wappalyzer.com/technologies/javascript-libraries/core-js/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/jQuery.svg)

jQuery3.1.1](https://www.wappalyzer.com/technologies/javascript-libraries/jquery/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[PaaS](https://www.wappalyzer.com/technologies/paas/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Netlify.svg)

Netlify](https://www.wappalyzer.com/technologies/paas/netlify/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[UI frameworks](https://www.wappalyzer.com/technologies/ui-frameworks/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Bootstrap.svg)

Bootstrap5.1.1](https://www.wappalyzer.com/technologies/ui-frameworks/bootstrap/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[Authentication](https://www.wappalyzer.com/technologies/authentication/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Facebook.svg)

Facebook Login](https://www.wappalyzer.com/technologies/authentication/facebook-login/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[Email](https://www.wappalyzer.com/technologies/email/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/mailchimp.svg)

MailChimp](https://www.wappalyzer.com/technologies/email/mailchimp/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[Retargeting](https://www.wappalyzer.com/technologies/retargeting/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

[![](chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/images/icons/Google%20Tag%20Manager.svg)

Google Remarketing Tag](https://www.wappalyzer.com/technologies/retargeting/google-remarketing-tag/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer)

---

## title: btoa

Creates a base-64 encoded ASCII string from a String object in which each character in the string is treated as a byte of binary data.

- Create a `Buffer` for the given string with binary encoding and use `Buffer.toString('base64')` to return the encoded string.

```js
const btoa = (str) => Buffer.from(str, "binary").toString("base64");
```

```js
btoa("foobar"); // 'Zm9vYmFy'
```

---

## title: bubbleSort

Sorts an array of numbers, using the bubble sort algorithm.

- Declare a variable, `swapped`, that indicates if any values were swapped during the current iteration.
- Use the spread operator (`...`) to clone the original array, `arr`.
- Use a `for` loop to iterate over the elements of the cloned array, terminating before the last element.
- Use a nested `for` loop to iterate over the segment of the array between `0` and `i`, swapping any adjacent out of order elements and setting `swapped` to `true`.
- If `swapped` is `false` after an iteration, no more changes are needed, so the cloned array is returned.

```js
const bubbleSort = (arr) => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};
```

```js
bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]
```

---

## title: bucketSort

Sorts an array of numbers, using the bucket sort algorithm.

- Use `Math.min(),` `Math.max()` and the spread operator (`...`) to find the minimum and maximum values of the given array.
- Use `Array.from()` and `Math.floor()` to create the appropriate number of `buckets` (empty arrays).
- Use `Array.prototype.forEach()` to populate each bucket with the appropriate elements from the array.
- Use `Array.prototype.reduce()`, the spread operator (`...`) and `Array.prototype.sort()` to sort each bucket and append it to the result.

```js
const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach((val) => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};
```

```js
bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]
```

---

## title: byteSize

Returns the length of a string in bytes.

- Convert a given string to a [`Blob` Object](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
- Use `Blob.size` to get the length of the string in bytes.

```js
const byteSize = (str) => new Blob([str]).size;
```

```js
byteSize("😀"); // 4
byteSize("Hello World"); // 11
```

---

## title: caesarCipher

Encrypts or decrypts a given string using the Caesar cipher.

- Use the modulo (`%`) operator and the ternary operator (`?`) to calculate the correct encryption/decryption key.
- Use the spread operator (`...`) and `Array.prototype.map()` to iterate over the letters of the given string.
- Use `String.prototype.charCodeAt()` and `String.fromCharCode()` to convert each letter appropriately, ignoring special characters, spaces etc.
- Use `Array.prototype.join()` to combine all the letters into a string.
- Pass `true` to the last parameter, `decrypt`, to decrypt an encrypted string.

```js
const caesarCipher = (str, shift, decrypt = false) => {
  const s = decrypt ? (26 - shift) % 26 : shift;
  const n = s > 0 ? s : 26 + (s % 26);
  return [...str]
    .map((l, i) => {
      const c = str.charCodeAt(i);
      if (c >= 65 && c <= 90)
        return String.fromCharCode(((c - 65 + n) % 26) + 65);
      if (c >= 97 && c <= 122)
        return String.fromCharCode(((c - 97 + n) % 26) + 97);
      return l;
    })
    .join("");
};
```

```js
caesarCipher("Hello World!", -3); // 'Ebiil Tloia!'
caesarCipher("Ebiil Tloia!", 23, true); // 'Hello World!'
```

---

## title: call

Given a key and a set of arguments, call them when given a context.

- Use a closure to call `key` with `args` for the given `context`.

```js
const call =
  (key, ...args) =>
  (context) =>
    context[key](...args);
```

```js
Promise.resolve([1, 2, 3])
  .then(call("map", (x) => 2 * x))
  .then(console.log); // [ 2, 4, 6 ]
const map = call.bind(null, "map");
Promise.resolve([1, 2, 3])
  .then(map((x) => 2 * x))
  .then(console.log); // [ 2, 4, 6 ]
```

---

## title: capitalize

Capitalizes the first letter of a string.

- Use array destructuring and `String.prototype.toUpperCase()` to capitalize the first letter of the string.
- Use `Array.prototype.join('')` to combine the capitalized `first` with the `...rest` of the characters.
- Omit the `lowerRest` argument to keep the rest of the string intact, or set it to `true` to convert to lowercase.

```js
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join("").toLowerCase() : rest.join(""));
```

```js
capitalize("fooBar"); // 'FooBar'
capitalize("fooBar", true); // 'Foobar'
```

---

## title: capitalizeEveryWord

Capitalizes the first letter of every word in a string.

- Use `String.prototype.replace()` to match the first character of each word and `String.prototype.toUpperCase()` to capitalize it.

```js
const capitalizeEveryWord = (str) =>
  str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
```

```js
capitalizeEveryWord("hello world!"); // 'Hello World!'
```

---

## title: cartesianProduct

Calculates the cartesian product of two arrays.

- Use `Array.prototype.reduce()`, `Array.prototype.map()` and the spread operator (`...`) to generate all possible element pairs from the two arrays.

```js
const cartesianProduct = (a, b) =>
  a.reduce((p, x) => [...p, ...b.map((y) => [x, y])], []);
```

```js
cartesianProduct(["x", "y"], [1, 2]);
// [['x', 1], ['x', 2], ['y', 1], ['y', 2]]
```

---

## title: castArray

Casts the provided value as an array if it's not one.

- Use `Array.prototype.isArray()` to determine if `val` is an array and return it as-is or encapsulated in an array accordingly.

```js
const castArray = (val) => (Array.isArray(val) ? val : [val]);
```

```js
castArray("foo"); // ['foo']
castArray([1]); // [1]
```

---

title: celsiusToFahrenheit
unlisted: true

---

Converts Celsius to Fahrenheit.

- Follow the conversion formula `F = 1.8 * C + 32`.

```js
const celsiusToFahrenheit = (degrees) => 1.8 * degrees + 32;
```

```js
celsiusToFahrenheit(33); // 91.4
```

---

## title: chainAsync

Chains asynchronous functions.

- Loop through an array of functions containing asynchronous events, calling `next` when each asynchronous event has completed.

```js
const chainAsync = (fns) => {
  let curr = 0;
  const last = fns[fns.length - 1];
  const next = () => {
    const fn = fns[curr++];
    fn === last ? fn() : fn(next);
  };
  next();
};
```

```js
chainAsync([
  (next) => {
    console.log("0 seconds");
    setTimeout(next, 1000);
  },
  (next) => {
    console.log("1 second");
    setTimeout(next, 1000);
  },
  () => {
    console.log("2 second");
  },
]);
```

---

## title: changeLightness

Changes the lightness value of an `hsl()` color string.

- Use `String.prototype.match()` to get an array of 3 strings with the numeric values.
- Use `Array.prototype.map()` in combination with `Number` to convert them into an array of numeric values.
- Make sure the lightness is within the valid range (between `0` and `100`), using `Math.max()` and `Math.min()`.
- Use a template literal to create a new `hsl()` string with the updated value.

```js
const changeLightness = (delta, hslStr) => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);

  const newLightness = Math.max(
    0,
    Math.min(100, lightness + parseFloat(delta))
  );

  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
};
```

```js
changeLightness(10, "hsl(330, 50%, 50%)"); // 'hsl(330, 50%, 60%)'
changeLightness(-10, "hsl(330, 50%, 50%)"); // 'hsl(330, 50%, 40%)'
```

---

## title: checkProp

Creates a function that will invoke a predicate function for the specified property on a given object.

- Return a curried function, that will invoke `predicate` for the specified `prop` on `obj` and return a boolean.

```js
const checkProp = (predicate, prop) => (obj) => !!predicate(obj[prop]);
```

```js
const lengthIs4 = checkProp((l) => l === 4, "length");
lengthIs4([]); // false
lengthIs4([1, 2, 3, 4]); // true
lengthIs4(new Set([1, 2, 3, 4])); // false (Set uses Size, not length)

const session = { user: {} };
const validUserSession = checkProp((u) => u.active && !u.disabled, "user");

validUserSession(session); // false

session.user.active = true;
validUserSession(session); // true

const noLength = checkProp((l) => l === undefined, "length");
noLength([]); // false
noLength({}); // true
noLength(new Set()); // true
```

---

## title: chunk

Chunks an array into smaller arrays of a specified size.

- Use `Array.from()` to create a new array, that fits the number of chunks that will be produced.
- Use `Array.prototype.slice()` to map each element of the new array to a chunk the length of `size`.
- If the original array can't be split evenly, the final chunk will contain the remaining elements.

```js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
```

```js
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

---

## title: chunkIntoN

Chunks an array into `n` smaller arrays.

- Use `Math.ceil()` and `Array.prototype.length` to get the size of each chunk.
- Use `Array.from()` to create a new array of size `n`.
- Use `Array.prototype.slice()` to map each element of the new array to a chunk the length of `size`.
- If the original array can't be split evenly, the final chunk will contain the remaining elements.

```js
const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};
```

```js
chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]
```

---

## title: chunkify

Chunks an iterable into smaller arrays of a specified size.

- Use a `for...of` loop over the given iterable, using `Array.prototype.push()` to add each new value to the current `chunk`.
- Use `Array.prototype.length` to check if the current `chunk` is of the desired `size` and `yield` the value if it is.
- Finally, use `Array.prototype.length` to check the final `chunk` and `yield` it if it's non-empty.

```js
const chunkify = function* (itr, size) {
  let chunk = [];
  for (const v of itr) {
    chunk.push(v);
    if (chunk.length === size) {
      yield chunk;
      chunk = [];
    }
  }
  if (chunk.length) yield chunk;
};
```

```js
const x = new Set([1, 2, 1, 3, 4, 1, 2, 5]);
[...chunkify(x, 2)]; // [[1, 2], [3, 4], [5]]
```

---

## title: clampNumber

Clamps `num` within the inclusive range specified by the boundary values `a` and `b`.

- If `num` falls within the range, return `num`.
- Otherwise, return the nearest number in the range.

```js
const clampNumber = (num, a, b) =>
  Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
```

```js
clampNumber(2, 3, 5); // 3
clampNumber(1, -1, -5); // -1
```

---

## title: cloneRegExp

Clones a regular expression.

- Use `new RegExp()`, `RegExp.prototype.source` and `RegExp.prototype.flags` to clone the given regular expression.

```js
const cloneRegExp = (regExp) => new RegExp(regExp.source, regExp.flags);
```

```js
const regExp = /lorem ipsum/gi;
const regExp2 = cloneRegExp(regExp); // regExp !== regExp2
```

---

## title: coalesce

Returns the first defined, non-null argument.

- Use `Array.prototype.find()` and `Array.prototype.includes()` to find the first value that is not equal to `undefined` or `null`.

```js
const coalesce = (...args) => args.find((v) => ![undefined, null].includes(v));
```

```js
coalesce(null, undefined, "", NaN, "Waldo"); // ''
```

---

## title: coalesceFactory

Customizes a coalesce function that returns the first argument which is true based on the given validator.

- Use `Array.prototype.find()` to return the first argument that returns `true` from the provided argument validation function, `valid`.

```js
const coalesceFactory =
  (valid) =>
  (...args) =>
    args.find(valid);
```

```js
const customCoalesce = coalesceFactory(
  (v) => ![null, undefined, "", NaN].includes(v)
);
customCoalesce(undefined, null, NaN, "", "Waldo"); // 'Waldo'
```

---

## title: collectInto

Changes a function that accepts an array into a variadic function.

- Given a function, return a closure that collects all inputs into an array-accepting function.

```js
const collectInto =
  (fn) =>
  (...args) =>
    fn(args);
```

```js
const Pall = collectInto(Promise.all.bind(Promise));
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = new Promise((resolve) => setTimeout(resolve, 2000, 3));
Pall(p1, p2, p3).then(console.log); // [1, 2, 3] (after about 2 seconds)
```

---

## title: colorize

Adds special characters to text to print in color in the console (combined with `console.log()`).

- Use template literals and special characters to add the appropriate color code to the string output.
- For background colors, add a special character that resets the background color at the end of the string.

```js
const colorize = (...args) => ({
  black: `\x1b[30m${args.join(" ")}`,
  red: `\x1b[31m${args.join(" ")}`,
  green: `\x1b[32m${args.join(" ")}`,
  yellow: `\x1b[33m${args.join(" ")}`,
  blue: `\x1b[34m${args.join(" ")}`,
  magenta: `\x1b[35m${args.join(" ")}`,
  cyan: `\x1b[36m${args.join(" ")}`,
  white: `\x1b[37m${args.join(" ")}`,
  bgBlack: `\x1b[40m${args.join(" ")}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(" ")}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(" ")}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(" ")}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(" ")}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(" ")}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(" ")}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(" ")}\x1b[0m`,
});
```

```js
console.log(colorize("foo").red); // 'foo' (red letters)
console.log(colorize("foo", "bar").bgBlue); // 'foo bar' (blue background)
console.log(colorize(colorize("foo").yellow, colorize("foo").green).bgWhite);
// 'foo bar' (first word in yellow letters, second word in green letters, white background for both)
```

---

## title: combine

Combines two arrays of objects, using the specified key to match objects.

- Use `Array.prototype.reduce()` with an object accumulator to combine all objects in both arrays based on the given `prop`.
- Use `Object.values()` to convert the resulting object to an array and return it.

```js
const combine = (a, b, prop) =>
  Object.values(
    [...a, ...b].reduce((acc, v) => {
      if (v[prop])
        acc[v[prop]] = acc[v[prop]] ? { ...acc[v[prop]], ...v } : { ...v };
      return acc;
    }, {})
  );
```

```js
const x = [
  { id: 1, name: "John" },
  { id: 2, name: "Maria" },
];
const y = [{ id: 1, age: 28 }, { id: 3, age: 26 }, { age: 3 }];
combine(x, y, "id");
// [
//  { id: 1, name: 'John', age: 28 },
//  { id: 2, name: 'Maria' },
//  { id: 3, age: 26 }
// ]
```

---

## title: compact

Removes falsy values from an array.

- Use `Array.prototype.filter()` to filter out falsy values (`false`, `null`, `0`, `""`, `undefined`, and `NaN`).

```js
const compact = (arr) => arr.filter(Boolean);
```

```js
compact([0, 1, false, 2, "", 3, "a", "e" * 23, NaN, "s", 34]);
// [ 1, 2, 3, 'a', 's', 34 ]
```

---

## title: compactObject

Deeply removes all falsy values from an object or array.

- Use recursion.
- Initialize the iterable data, using `Array.isArray()`, `Array.prototype.filter()` and `Boolean` for arrays in order to avoid sparse arrays.
- Use `Object.keys()` and `Array.prototype.reduce()` to iterate over each key with an appropriate initial value.
- Use `Boolean` to determine the truthiness of each key's value and add it to the accumulator if it's truthy.
- Use `typeof` to determine if a given value is an `object` and call the function again to deeply compact it.

```js
const compactObject = (val) => {
  const data = Array.isArray(val) ? val.filter(Boolean) : val;
  return Object.keys(data).reduce(
    (acc, key) => {
      const value = data[key];
      if (Boolean(value))
        acc[key] = typeof value === "object" ? compactObject(value) : value;
      return acc;
    },
    Array.isArray(val) ? [] : {}
  );
};
```

```js
const obj = {
  a: null,
  b: false,
  c: true,
  d: 0,
  e: 1,
  f: "",
  g: "a",
  h: [null, false, "", true, 1, "a"],
  i: { j: 0, k: false, l: "a" },
};
compactObject(obj);
// { c: true, e: 1, g: 'a', h: [ true, 1, 'a' ], i: { l: 'a' } }
```

---

## title: compactWhitespace

Compacts whitespaces in a string.

- Use `String.prototype.replace()` with a regular expression to replace all occurrences of 2 or more whitespace characters with a single space.

```js
const compactWhitespace = (str) => str.replace(/\s{2,}/g, " ");
```

```js
compactWhitespace("Lorem    Ipsum"); // 'Lorem Ipsum'
compactWhitespace("Lorem \n Ipsum"); // 'Lorem Ipsum'
```

---

## title: complement

Returns a function that is the logical complement of the given function, `fn`.

- Use the logical not (`!`) operator on the result of calling `fn` with any supplied `args`.

```js
const complement =
  (fn) =>
  (...args) =>
    !fn(...args);
```

```js
const isEven = (num) => num % 2 === 0;
const isOdd = complement(isEven);
isOdd(2); // false
isOdd(3); // true
```

---

## title: compose

Performs right-to-left function composition.

- Use `Array.prototype.reduce()` to perform right-to-left function composition.
- The last (rightmost) function can accept one or more arguments; the remaining functions must be unary.

```js
const compose = (...fns) =>
  fns.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args))
  );
```

```js
const add5 = (x) => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = compose(add5, multiply);
multiplyAndAdd5(5, 2); // 15
```

---

## title: composeRight

Performs left-to-right function composition.

- Use `Array.prototype.reduce()` to perform left-to-right function composition.
- The first (leftmost) function can accept one or more arguments; the remaining functions must be unary.

```js
const composeRight = (...fns) =>
  fns.reduce(
    (f, g) =>
      (...args) =>
        g(f(...args))
  );
```

```js
const add = (x, y) => x + y;
const square = (x) => x * x;
const addAndSquare = composeRight(add, square);
addAndSquare(1, 2); // 9
```

---

## title: containsWhitespace

Checks if the given string contains any whitespace characters.

- Use `RegExp.prototype.test()` with an appropriate regular expression to check if the given string contains any whitespace characters.

```js
const containsWhitespace = (str) => /\s/.test(str);
```

```js
containsWhitespace("lorem"); // false
containsWhitespace("lorem ipsum"); // true
```

---

## title: converge

Accepts a converging function and a list of branching functions and returns a function that applies each branching function to the arguments and the results of the branching functions are passed as arguments to the converging function.

- Use `Array.prototype.map()` and `Function.prototype.apply()` to apply each function to the given arguments.
- Use the spread operator (`...`) to call `converger` with the results of all other functions.

```js
const converge =
  (converger, fns) =>
  (...args) =>
    converger(...fns.map((fn) => fn.apply(null, args)));
```

```js
const average = converge(
  (a, b) => a / b,
  [(arr) => arr.reduce((a, v) => a + v, 0), (arr) => arr.length]
);
average([1, 2, 3, 4, 5, 6, 7]); // 4
```

---

## title: copySign

Returns the absolute value of the first number, but the sign of the second.

- Use `Math.sign()` to check if the two numbers have the same sign.
- Return `x` if they do, `-x` otherwise.

```js
const copySign = (x, y) => (Math.sign(x) === Math.sign(y) ? x : -x);
```

```js
copySign(2, 3); // 2
copySign(2, -3); // -2
copySign(-2, 3); // 2
copySign(-2, -3); // -2
```

---

## title: copyToClipboard

Copies a string to the clipboard.
Only works as a result of user action (i.e. inside a `click` event listener).

- Create a new `<textarea>` element, fill it with the supplied data and add it to the HTML document.
- Use `Selection.getRangeAt()`to store the selected range (if any).
- Use `Document.execCommand('copy')` to copy to the clipboard.
- Remove the `<textarea>` element from the HTML document.
- Finally, use `Selection().addRange()` to recover the original selected range (if any).
- **Note:** You can use the new asynchronous Clipboard API to implement the same functionality. It's experimental but should be used in the future instead of this snippet. Find out more about it [here](https://github.com/w3c/clipboard-apis/blob/master/explainer.adoc#writing-to-the-clipboard).

```js
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
```

```js
copyToClipboard("Lorem ipsum"); // 'Lorem ipsum' copied to clipboard.
```

---

## title: countBy

Groups the elements of an array based on the given function and returns the count of elements in each group.

- Use `Array.prototype.map()` to map the values of an array to a function or property name.
- Use `Array.prototype.reduce()` to create an object, where the keys are produced from the mapped results.

```js
const countBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
```

```js
countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
countBy(["one", "two", "three"], "length"); // {3: 2, 5: 1}
countBy([{ count: 5 }, { count: 10 }, { count: 5 }], (x) => x.count);
// {5: 2, 10: 1}
```

---

## title: countOccurrences

Counts the occurrences of a value in an array.

- Use `Array.prototype.reduce()` to increment a counter each time the specific value is encountered inside the array.

```js
const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
```

```js
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```

---

## title: countSubstrings

Counts the occurrences of a substring in a given string.

- Use `Array.prototype.indexOf()` to look for `searchValue` in `str`.
- Increment a counter if the value is found and update the index, `i`.
- Use a `while` loop that will return as soon as the value returned from `Array.prototype.indexOf()` is `-1`.

```js
const countSubstrings = (str, searchValue) => {
  let count = 0,
    i = 0;
  while (true) {
    const r = str.indexOf(searchValue, i);
    if (r !== -1) [count, i] = [count + 1, r + 1];
    else return count;
  }
};
```

```js
countSubstrings("tiktok tok tok tik tok tik", "tik"); // 3
countSubstrings("tutut tut tut", "tut"); // 4
```

---

## title: countWeekDaysBetween

Counts the weekdays between two dates.

- Use `Array.from()` to construct an array with `length` equal to the number of days between `startDate` and `endDate`.
- Use `Array.prototype.reduce()` to iterate over the array, checking if each date is a weekday and incrementing `count`.
- Update `startDate` with the next day each loop using `Date.prototype.getDate()` and `Date.prototype.setDate()` to advance it by one day.
- **NOTE:** Does not take official holidays into account.

```js
const countWeekDaysBetween = (startDate, endDate) =>
  Array.from({ length: (endDate - startDate) / (1000 * 3600 * 24) }).reduce(
    (count) => {
      if (startDate.getDay() % 6 !== 0) count++;
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      return count;
    },
    0
  );
```

```js
countWeekDaysBetween(new Date("Oct 05, 2020"), new Date("Oct 06, 2020")); // 1
countWeekDaysBetween(new Date("Oct 05, 2020"), new Date("Oct 14, 2020")); // 7
```

---

## title: counter

Creates a counter with the specified range, step and duration for the specified selector.

- Check if `step` has the proper sign and change it accordingly.
- Use `setInterval()` in combination with `Math.abs()` and `Math.floor()` to calculate the time between each new text draw.
- Use `Document.querySelector()`, `Element.innerHTML` to update the value of the selected element.
- Omit the fourth argument, `step`, to use a default step of `1`.
- Omit the fifth argument, `duration`, to use a default duration of `2000`ms.

```js
const counter = (selector, start, end, step = 1, duration = 2000) => {
  let current = start,
    _step = (end - start) * step < 0 ? -step : step,
    timer = setInterval(() => {
      current += _step;
      document.querySelector(selector).innerHTML = current;
      if (current >= end) document.querySelector(selector).innerHTML = end;
      if (current >= end) clearInterval(timer);
    }, Math.abs(Math.floor(duration / (end - start))));
  return timer;
};
```

```js
counter("#my-id", 1, 1000, 5, 2000);
// Creates a 2-second timer for the element with id="my-id"
```

---

## title: createDirIfNotExists

Creates a directory, if it does not exist.

- Use `fs.existsSync()` to check if the directory exists, `fs.mkdirSync()` to create it.

```js
const fs = require("fs");

const createDirIfNotExists = (dir) =>
  !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;
```

```js
createDirIfNotExists("test");
// creates the directory 'test', if it doesn't exist
```

---

## title: createElement

Creates an element from a string (without appending it to the document).
If the given string contains multiple elements, only the first one will be returned.

- Use `Document.createElement()` to create a new element.
- Use `Element.innerHTML` to set its inner HTML to the string supplied as the argument.
- Use `ParentNode.firstElementChild` to return the element version of the string.

```js
const createElement = (str) => {
  const el = document.createElement("div");
  el.innerHTML = str;
  return el.firstElementChild;
};
```

```js
const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
console.log(el.className); // 'container'
```

---

## title: createEventHub

Creates a pub/sub ([publish–subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)) event hub with `emit`, `on`, and `off` methods.

- Use `Object.create(null)` to create an empty `hub` object that does not inherit properties from `Object.prototype`.
- For `emit`, resolve the array of handlers based on the `event` argument and then run each one with `Array.prototype.forEach()` by passing in the data as an argument.
- For `on`, create an array for the event if it does not yet exist, then use `Array.prototype.push()` to add the handler
- to the array.
- For `off`, use `Array.prototype.findIndex()` to find the index of the handler in the event array and remove it using `Array.prototype.splice()`.

```js
const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach((handler) => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex((h) => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
    if (this.hub[event].length === 0) delete this.hub[event];
  },
});
```

```js
const handler = (data) => console.log(data);
const hub = createEventHub();
let increment = 0;

// Subscribe: listen for different types of events
hub.on("message", handler);
hub.on("message", () => console.log("Message event fired"));
hub.on("increment", () => increment++);

// Publish: emit events to invoke all handlers subscribed to them, passing the data to them as an argument
hub.emit("message", "hello world"); // logs 'hello world' and 'Message event fired'
hub.emit("message", { hello: "world" }); // logs the object and 'Message event fired'
hub.emit("increment"); // `increment` variable is now 1

// Unsubscribe: stop a specific handler from listening to the 'message' event
hub.off("message", handler);
```

---

## title: currentURL

Returns the current URL.

- Use `Window.location.href` to get the current URL.

```js
const currentURL = () => window.location.href;
```

```js
currentURL(); // 'https://www.google.com/'
```

---

## title: curry

Curries a function.

- Use recursion.
- If the number of provided arguments (`args`) is sufficient, call the passed function `fn`.
- Otherwise, use `Function.prototype.bind()` to return a curried function `fn` that expects the rest of the arguments.
- If you want to curry a function that accepts a variable number of arguments (a variadic function, e.g. `Math.min()`), you can optionally pass the number of arguments to the second parameter `arity`.

```js
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
```

```js
curry(Math.pow)(2)(10); // 1024
curry(Math.min, 3)(10)(50)(2); // 2
```

---

## title: cycleGenerator

Creates a generator, looping over the given array indefinitely.

- Use a non-terminating `while` loop, that will `yield` a value every time `Generator.prototype.next()` is called.
- Use the module operator (`%`) with `Array.prototype.length` to get the next value's index and increment the counter after each `yield` statement.

```js
const cycleGenerator = function* (arr) {
  let i = 0;
  while (true) {
    yield arr[i % arr.length];
    i++;
  }
};
```

```js
const binaryCycle = cycleGenerator([0, 1]);
binaryCycle.next(); // { value: 0, done: false }
binaryCycle.next(); // { value: 1, done: false }
binaryCycle.next(); // { value: 0, done: false }
binaryCycle.next(); // { value: 1, done: false }
```

---

## title: dateRangeGenerator

Creates a generator, that generates all dates in the given range using the given step.

- Use a `while` loop to iterate from `start` to `end`, using `yield` to return each date in the range, using the `Date` constructor.
- Use `Date.prototype.getDate()` and `Date.prototype.setDate()` to increment by `step` days after returning each subsequent value.
- Omit the third argument, `step`, to use a default value of `1`.

```js
const dateRangeGenerator = function* (start, end, step = 1) {
  let d = start;
  while (d < end) {
    yield new Date(d);
    d.setDate(d.getDate() + step);
  }
};
```

```js
[...dateRangeGenerator(new Date("2021-06-01"), new Date("2021-06-04"))];
// [ 2021-06-01, 2021-06-02, 2021-06-03 ]
```

---

## title: dayName

Gets the name of the weekday from a `Date` object.

- Use `Date.prototype.toLocaleDateString()` with the `{ weekday: 'long' }` option to retrieve the weekday.
- Use the optional second argument to get a language-specific name or omit it to use the default locale.

```js
const dayName = (date, locale) =>
  date.toLocaleDateString(locale, { weekday: "long" });
```

```js
dayName(new Date()); // 'Saturday'
dayName(new Date("09/23/2020"), "de-DE"); // 'Samstag'
```

---

## title: dayOfYear

Gets the day of the year (number in the range 1-366) from a `Date` object.

- Use `new Date()` and `Date.prototype.getFullYear()` to get the first day of the year as a `Date` object.
- Subtract the first day of the year from `date` and divide with the milliseconds in each day to get the result.
- Use `Math.floor()` to appropriately round the resulting day count to an integer.

```js
const dayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
```

```js
dayOfYear(new Date()); // 272
```

---

## title: daysAgo

Calculates the date of `n` days ago from today as a string representation.

- Use `new Date()` to get the current date, `Math.abs()` and `Date.prototype.getDate()` to update the date accordingly and set to the result using `Date.prototype.setDate()`.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const daysAgo = (n) => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split("T")[0];
};
```

```js
daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)
```

---

## title: daysFromNow

Calculates the date of `n` days from today as a string representation.

- Use `new Date()` to get the current date, `Math.abs()` and `Date.prototype.getDate()` to update the date accordingly and set to the result using `Date.prototype.setDate()`.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const daysFromNow = (n) => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split("T")[0];
};
```

```js
daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)
```

---

## title: daysInMonth

Gets the number of days in the given `month` of the specified `year`.

- Use the `new Date()` constructor to create a date from the given `year` and `month`.
- Set the days parameter to `0` to get the last day of the previous month, as months are zero-indexed.
- Use `Date.prototype.getDate()` to return the number of days in the given `month`.

```js
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
```

```js
daysInMonth(2020, 12)); // 31
daysInMonth(2024, 2)); // 29
```

---

## title: debounce

Creates a debounced function that delays invoking the provided function until at least `ms` milliseconds have elapsed since its last invocation.

- Each time the debounced function is invoked, clear the current pending timeout with `clearTimeout()`. Use `setTimeout()` to create a new timeout that delays invoking the function until at least `ms` milliseconds have elapsed.
- Use `Function.prototype.apply()` to apply the `this` context to the function and provide the necessary arguments.
- Omit the second argument, `ms`, to set the timeout at a default of `0` ms.

```js
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
```

```js
window.addEventListener(
  "resize",
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```

---

## title: debouncePromise

Creates a debounced function that returns a promise, but delays invoking the provided function until at least `ms` milliseconds have elapsed since the last time it was invoked.
All promises returned during this time will return the same data.

- Each time the debounced function is invoked, clear the current pending timeout with `clearTimeout()` and use `setTimeout()` to create a new timeout that delays invoking the function until at least `ms` milliseconds has elapsed.
- Use `Function.prototype.apply()` to apply the `this` context to the function and provide the necessary arguments.
- Create a new `Promise` and add its `resolve` and `reject` callbacks to the `pending` promises stack.
- When `setTimeout` is called, copy the current stack (as it can change between the provided function call and its resolution), clear it and call the provided function.
- When the provided function resolves/rejects, resolve/reject all promises in the stack (copied when the function was called) with the returned data.
- Omit the second argument, `ms`, to set the timeout at a default of `0` ms.

```js
const debouncePromise = (fn, ms = 0) => {
  let timeoutId;
  const pending = [];
  return (...args) =>
    new Promise((res, rej) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentPending = [...pending];
        pending.length = 0;
        Promise.resolve(fn.apply(this, args)).then(
          (data) => {
            currentPending.forEach(({ resolve }) => resolve(data));
          },
          (error) => {
            currentPending.forEach(({ reject }) => reject(error));
          }
        );
      }, ms);
      pending.push({ resolve: res, reject: rej });
    });
};
```

```js
const fn = (arg) =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000, ["resolved", arg]);
  });
const debounced = debouncePromise(fn, 200);
debounced("foo").then(console.log);
debounced("bar").then(console.log);
// Will log ['resolved', 'bar'] both times
```

---

## title: decapitalize

Decapitalizes the first letter of a string.

- Use array destructuring and `String.prototype.toLowerCase()` to decapitalize first letter, `...rest` to get array of characters after first letter and then `Array.prototype.join('')` to make it a string again.
- Omit the `upperRest` argument to keep the rest of the string intact, or set it to `true` to convert to uppercase.

```js
const decapitalize = ([first, ...rest], upperRest = false) =>
  first.toLowerCase() +
  (upperRest ? rest.join("").toUpperCase() : rest.join(""));
```

```js
decapitalize("FooBar"); // 'fooBar'
decapitalize("FooBar", true); // 'fOOBAR'
```

---

## title: deepClone

Creates a deep clone of an object.
Clones primitives, arrays and objects, excluding class instances.

- Use recursion.
- Check if the passed object is `null` and, if so, return `null`.
- Use `Object.assign()` and an empty object (`{}`) to create a shallow clone of the original.
- Use `Object.keys()` and `Array.prototype.forEach()` to determine which key-value pairs need to be deep cloned.
- If the object is an `Array`, set the `clone`'s `length` to that of the original and use `Array.from(clone)` to create a clone.

```js
const deepClone = (obj) => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};
```

```js
const a = { foo: "bar", obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```

---

## title: deepFlatten

Deep flattens an array.

- Use recursion.
- Use `Array.prototype.concat()` with an empty array (`[]`) and the spread operator (`...`) to flatten an array.
- Recursively flatten each element that is an array.

```js
const deepFlatten = (arr) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)));
```

```js
deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]
```

---

## title: deepFreeze

Deep freezes an object.

- Use `Object.keys()` to get all the properties of the passed object, `Array.prototype.forEach()` to iterate over them.
- Call `Object.freeze(obj)` recursively on all properties, applying `deepFreeze()` as necessary.
- Finally, use `Object.freeze()` to freeze the given object.

```js
const deepFreeze = (obj) => {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === "object") deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};
```

```js
"use strict";

const val = deepFreeze([1, [2, 3]]);

val[0] = 3; // not allowed
val[1][0] = 4; // not allowed as well
```

---

## title: deepGet

Gets the target value in a nested JSON object, based on the `keys` array.

- Compare the keys you want in the nested JSON object as an `Array`.
- Use `Array.prototype.reduce()` to get the values in the nested JSON object one by one.
- If the key exists in the object, return the target value, otherwise return `null`.

```js
const deepGet = (obj, keys) =>
  keys.reduce(
    (xs, x) => (xs && xs[x] !== null && xs[x] !== undefined ? xs[x] : null),
    obj
  );
```

```js
let index = 2;
const data = {
  foo: {
    foz: [1, 2, 3],
    bar: {
      baz: ["a", "b", "c"],
    },
  },
};
deepGet(data, ["foo", "foz", index]); // get 3
deepGet(data, ["foo", "bar", "baz", 8, "foz"]); // null
```

---

## title: deepMapKeys

Deep maps an object's keys.

- Creates an object with the same values as the provided object and keys generated by running the provided function for each key.
- Use `Object.keys(obj)` to iterate over the object's keys.
- Use `Array.prototype.reduce()` to create a new object with the same values and mapped keys using `fn`.

```js
const deepMapKeys = (obj, fn) =>
  Array.isArray(obj)
    ? obj.map((val) => deepMapKeys(val, fn))
    : typeof obj === "object"
    ? Object.keys(obj).reduce((acc, current) => {
        const key = fn(current);
        const val = obj[current];
        acc[key] =
          val !== null && typeof val === "object" ? deepMapKeys(val, fn) : val;
        return acc;
      }, {})
    : obj;
```

```js
const obj = {
  foo: "1",
  nested: {
    child: {
      withArray: [
        {
          grandChild: ["hello"],
        },
      ],
    },
  },
};
const upperKeysObj = deepMapKeys(obj, (key) => key.toUpperCase());
/*
{
  "FOO":"1",
  "NESTED":{
    "CHILD":{
      "WITHARRAY":[
        {
          "GRANDCHILD":[ 'hello' ]
        }
      ]
    }
  }
}
*/
```

---

## title: deepMerge

Deeply merges two objects, using a function to handle keys present in both.

- Use `Object.keys()` to get the keys of both objects, create a `Set` from them and use the spread operator (`...`) to create an array of all the unique keys.
- Use `Array.prototype.reduce()` to add each unique key to the object, using `fn` to combine the values of the two given objects.

```js
const deepMerge = (a, b, fn) =>
  [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce(
    (acc, key) => ({ ...acc, [key]: fn(key, a[key], b[key]) }),
    {}
  );
```

```js
deepMerge(
  { a: true, b: { c: [1, 2, 3] } },
  { a: false, b: { d: [1, 2, 3] } },
  (key, a, b) => (key === "a" ? a && b : Object.assign({}, a, b))
);
// { a: false, b: { c: [ 1, 2, 3 ], d: [ 1, 2, 3 ] } }
```

---

## title: defaults

Assigns default values for all properties in an object that are `undefined`.

- Use `Object.assign()` to create a new empty object and copy the original one to maintain key order.
- Use `Array.prototype.reverse()` and the spread operator (`...`) to combine the default values from left to right.
- Finally, use `obj` again to overwrite properties that originally had a value.

```js
const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);
```

```js
defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }
```

---

## title: defer

Defers invoking a function until the current call stack has cleared.

- Use `setTimeout()` with a timeout of `1` ms to add a new event to the event queue and allow the rendering engine to complete its work.
- Use the spread (`...`) operator to supply the function with an arbitrary number of arguments.

```js
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);
```

```js
// Example A:
defer(console.log, "a"), console.log("b"); // logs 'b' then 'a'

// Example B:
document.querySelector("#someElement").innerHTML = "Hello";
longRunningFunction();
// Browser will not update the HTML until this has finished
defer(longRunningFunction);
// Browser will update the HTML then run the function
```

---

## title: degreesToRads

Converts an angle from degrees to radians.

- Use `Math.PI` and the degree to radian formula to convert the angle from degrees to radians.

```js
const degreesToRads = (deg) => (deg * Math.PI) / 180.0;
```

```js
degreesToRads(90.0); // ~1.5708
```

---

## title: delay

Invokes the provided function after `ms` milliseconds.

- Use `setTimeout()` to delay execution of `fn`.
- Use the spread (`...`) operator to supply the function with an arbitrary number of arguments.

```js
const delay = (fn, ms, ...args) => setTimeout(fn, ms, ...args);
```

```js
delay(
  function (text) {
    console.log(text);
  },
  1000,
  "later"
); // Logs 'later' after one second.
```

---

## title: detectDeviceType

Detects whether the page is being viewed on a mobile device or a desktop.

- Use a regular expression to test the `navigator.userAgent` property to figure out if the device is a mobile device or a desktop.

```js
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";
```

```js
detectDeviceType(); // 'Mobile' or 'Desktop'
```

---

## title: detectLanguage

Detects the preferred language of the current user.

- Use `NavigationLanguage.language` or the first `NavigationLanguage.languages` if available, otherwise return `defaultLang`.
- Omit the second argument, `defaultLang`, to use `'en-US'` as the default language code.

```js
const detectLanguage = (defaultLang = "en-US") =>
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;
```

```js
detectLanguage(); // 'nl-NL'
```

---

## title: difference

Calculates the difference between two arrays, without filtering duplicate values.

- Create a `Set` from `b` to get the unique values in `b`.
- Use `Array.prototype.filter()` on `a` to only keep values not contained in `b`, using `Set.prototype.has()`.

```js
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter((x) => !s.has(x));
};
```

```js
difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]
```

---

## title: differenceBy

Returns the difference between two arrays, after applying the provided function to each array element of both.

- Create a `Set` by applying `fn` to each element in `b`.
- Use `Array.prototype.map()` to apply `fn` to each element in `a`.
- Use `Array.prototype.filter()` in combination with `fn` on `a` to only keep values not contained in `b`, using `Set.prototype.has()`.

```js
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.map(fn).filter((el) => !s.has(el));
};
```

```js
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], (v) => v.x); // [2]
```

---

## title: differenceWith

Filters out all values from an array for which the comparator function does not return `true`.

- Use `Array.prototype.filter()` and `Array.prototype.findIndex()` to find the appropriate values.
- Omit the last argument, `comp`, to use a default strict equality comparator.

```js
const differenceWith = (arr, val, comp = (a, b) => a === b) =>
  arr.filter((a) => val.findIndex((b) => comp(a, b)) === -1);
```

```js
differenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0],
  (a, b) => Math.round(a) === Math.round(b)
); // [1, 1.2]
differenceWith([1, 1.2, 1.3], [1, 1.3, 1.5]); // [1.2]
```

---

## title: dig

Gets the target value in a nested JSON object, based on the given key.

- Use the `in` operator to check if `target` exists in `obj`.
- If found, return the value of `obj[target]`.
- Otherwise use `Object.values(obj)` and `Array.prototype.reduce()` to recursively call `dig` on each nested object until the first matching key/value pair is found.

```js
const dig = (obj, target) =>
  target in obj
    ? obj[target]
    : Object.values(obj).reduce((acc, val) => {
        if (acc !== undefined) return acc;
        if (typeof val === "object") return dig(val, target);
      }, undefined);
```

```js
const data = {
  level1: {
    level2: {
      level3: "some data",
    },
  },
};
dig(data, "level3"); // 'some data'
dig(data, "level4"); // undefined
```

---

## title: digitize

Converts a number to an array of digits, removing its sign if necessary.

- Use `Math.abs()` to strip the number's sign.
- Convert the number to a string, using the spread operator (`...`) to build an array.
- Use `Array.prototype.map()` and `parseInt()` to transform each value to an integer.

```js
const digitize = (n) => [...`${Math.abs(n)}`].map((i) => parseInt(i));
```

```js
digitize(123); // [1, 2, 3]
digitize(-123); // [1, 2, 3]
```

---

## title: distance

Calculates the distance between two points.

- Use `Math.hypot()` to calculate the Euclidean distance between two points.

```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
```

```js
distance(1, 1, 2, 3); // ~2.2361
```

---

## title: divmod

Returns an array consisting of the quotient and remainder of the given numbers.

- Use `Math.floor()` to get the quotient of the division `x / y`.
- Use the modulo operator (`%`) to get the remainder of the division `x / y`.

```js
const divmod = (x, y) => [Math.floor(x / y), x % y];
```

```js
divmod(8, 3); // [2, 2]
divmod(3, 8); // [0, 3]
divmod(5, 5); // [1, 0]
```

---

## title: drop

Creates a new array with `n` elements removed from the left.

- Use `Array.prototype.slice()` to remove the specified number of elements from the left.
- Omit the last argument, `n`, to use a default value of `1`.

```js
const drop = (arr, n = 1) => arr.slice(n);
```

```js
drop([1, 2, 3]); // [2, 3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []
```

---

## title: dropRight

Creates a new array with `n` elements removed from the right.

- Use `Array.prototype.slice()` to remove the specified number of elements from the right.
- Omit the last argument, `n`, to use a default value of `1`.

```js
const dropRight = (arr, n = 1) => arr.slice(0, -n);
```

```js
dropRight([1, 2, 3]); // [1, 2]
dropRight([1, 2, 3], 2); // [1]
dropRight([1, 2, 3], 42); // []
```

---

## title: dropRightWhile

Removes elements from the end of an array until the passed function returns `true`.
Returns the remaining elements in the array.

- Loop through the array, using `Array.prototype.slice()` to drop the last element of the array until the value returned from `func` is `true`.
- Return the remaining elements.

```js
const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};
```

```js
dropRightWhile([1, 2, 3, 4], (n) => n < 3); // [1, 2]
```

---

## title: dropWhile

Removes elements in an array until the passed function returns `true`.
Returns the remaining elements in the array.

- Loop through the array, using `Array.prototype.slice()` to drop the first element of the array until the value returned from `func` is `true`.
- Return the remaining elements.

```js
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};
```

```js
dropWhile([1, 2, 3, 4], (n) => n >= 3); // [3, 4]
```

---

## title: either

Checks if at least one function returns `true` for a given set of arguments.

- Use the logical or (`||`) operator on the result of calling the two functions with the supplied `args`.

```js
const either =
  (f, g) =>
  (...args) =>
    f(...args) || g(...args);
```

```js
const isEven = (num) => num % 2 === 0;
const isPositive = (num) => num > 0;
const isPositiveOrEven = either(isPositive, isEven);
isPositiveOrEven(4); // true
isPositiveOrEven(3); // true
```

---

## title: elementContains

Checks if the `parent` element contains the `child` element.

- Check that `parent` is not the same element as `child`.
- Use `Node.contains()` to check if the `parent` element contains the `child` element.

```js
const elementContains = (parent, child) =>
  parent !== child && parent.contains(child);
```

```js
elementContains(
  document.querySelector("head"),
  document.querySelector("title")
);
// true
elementContains(document.querySelector("body"), document.querySelector("body"));
// false
```

---

## title: elementIsFocused

Checks if the given element is focused.

- Use `Document.activeElement` to determine if the given element is focused.

```js
const elementIsFocused = (el) => el === document.activeElement;
```

```js
elementIsFocused(el); // true if the element is focused
```

---

## title: elementIsVisibleInViewport

Checks if the element specified is visible in the viewport.

- Use `Element.getBoundingClientRect()` and the `Window.inner(Width|Height)` values to determine if a given element is visible in the viewport.
- Omit the second argument to determine if the element is entirely visible, or specify `true` to determine if it is partially visible.

```js
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
```

```js
// e.g. 100x100 viewport and a 10x10px element at position {top: -1, left: 0, bottom: 9, right: 10}
elementIsVisibleInViewport(el); // false - (not fully visible)
elementIsVisibleInViewport(el, true); // true - (partially visible)
```

---

## title: equals

Performs a deep comparison between two values to determine if they are equivalent.

- Check if the two values are identical.
- Check if both values are `Date` objects with the same time, using `Date.prototype.getTime()`.
- Check if both values are non-object values with an equivalent value (strict comparison).
- Check if only one value is `null` or `undefined` or if their prototypes differ.
- If none of the above conditions are met, use `Object.keys()` to check if both values have the same number of keys.
- Use `Array.prototype.every()` to check if every key in `a` exists in `b` and if they are equivalent by calling `equals()` recursively.

```js
const equals = (a, b) => {
  if (a === b) return true;

  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();

  if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
    return a === b;

  if (a.prototype !== b.prototype) return false;

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;

  return keys.every((k) => equals(a[k], b[k]));
};
```

```js
equals(
  { a: [2, { e: 3 }], b: [4], c: "foo" },
  { a: [2, { e: 3 }], b: [4], c: "foo" }
); // true
equals([1, 2, 3], { 0: 1, 1: 2, 2: 3 }); // true
```

---

## title: escapeHTML

Escapes a string for use in HTML.

- Use `String.prototype.replace()` with a regexp that matches the characters that need to be escaped.
- Use the callback function to replace each character instance with its associated escaped character using a dictionary object.

```js
const escapeHTML = (str) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[tag] || tag)
  );
```

```js
escapeHTML('<a href="#">Me & you</a>');
// '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
```

---

## title: escapeRegExp

Escapes a string to use in a regular expression.

- Use `String.prototype.replace()` to escape special characters.

```js
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
```

```js
escapeRegExp("(test)"); // \\(test\\)
```

---

## title: euclideanDistance

Calculates the distance between two points in any number of dimensions.

- Use `Object.keys()` and `Array.prototype.map()` to map each coordinate to its difference between the two points.
- Use `Math.hypot()` to calculate the Euclidean distance between the two points.

```js
const euclideanDistance = (a, b) =>
  Math.hypot(...Object.keys(a).map((k) => b[k] - a[k]));
```

```js
euclideanDistance([1, 1], [2, 3]); // ~2.2361
euclideanDistance([1, 1, 1], [2, 3, 2]); // ~2.4495
```

---

## title: everyNth

Returns every `nth` element in an array.

- Use `Array.prototype.filter()` to create a new array that contains every `nth` element of a given array.

```js
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
```

```js
everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]
```

---

## title: expandTabs

Convert tabs to spaces, where each tab corresponds to `count` spaces.

- Use `String.prototype.replace()` with a regular expression and `String.prototype.repeat()` to replace each tab character with `count` spaces.

```js
const expandTabs = (str, count) => str.replace(/\t/g, " ".repeat(count));
```

```js
expandTabs("\t\tlorem", 3); // '      lorem'
```

---

## title: extendHex

Extends a 3-digit color code to a 6-digit color code.

- Use `Array.prototype.map()`, `String.prototype.split()` and `Array.prototype.join()` to join the mapped array for converting a 3-digit RGB notated hexadecimal color-code to the 6-digit form.
- `Array.prototype.slice()` is used to remove `#` from string start since it's added once.

```js
const extendHex = (shortHex) =>
  "#" +
  shortHex
    .slice(shortHex.startsWith("#") ? 1 : 0)
    .split("")
    .map((x) => x + x)
    .join("");
```

```js
extendHex("#03f"); // '#0033ff'
extendHex("05a"); // '#0055aa'
```

---

## title: factorial

Calculates the factorial of a number.

- Use recursion.
- If `n` is less than or equal to `1`, return `1`.
- Otherwise, return the product of `n` and the factorial of `n - 1`.
- Throw a `TypeError` if `n` is a negative number.

```js
const factorial = (n) =>
  n < 0
    ? (() => {
        throw new TypeError("Negative numbers are not allowed!");
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);
```

```js
factorial(6); // 720
```

---

title: fahrenheitToCelsius
unlisted: true

---

Converts Fahrenheit to Celsius.

- Follow the conversion formula `C = (F - 32) * 5/9`.

```js
const fahrenheitToCelsius = (degrees) => ((degrees - 32) * 5) / 9;
```

```js
fahrenheitToCelsius(32); // 0
```

---

## title: fibonacci

Generates an array, containing the Fibonacci sequence, up until the nth term.

- Use `Array.from()` to create an empty array of the specific length, initializing the first two values (`0` and `1`).
- Use `Array.prototype.reduce()` and `Array.prototype.concat()` to add values into the array, using the sum of the last two values, except for the first two.

```js
const fibonacci = (n) =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );
```

```js
fibonacci(6); // [0, 1, 1, 2, 3, 5]
```

---

## title: filterNonUnique

Creates an array with the non-unique values filtered out.

- Use `new Set()` and the spread operator (`...`) to create an array of the unique values in `arr`.
- Use `Array.prototype.filter()` to create an array containing only the unique values.

```js
const filterNonUnique = (arr) =>
  [...new Set(arr)].filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));
```

```js
filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]
```

---

## title: filterNonUniqueBy

Creates an array with the non-unique values filtered out, based on a provided comparator function.

- Use `Array.prototype.filter()` and `Array.prototype.every()` to create an array containing only the unique values, based on the comparator function, `fn`.
- The comparator function takes four arguments: the values of the two elements being compared and their indexes.

```js
const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));
```

```js
filterNonUniqueBy(
  [
    { id: 0, value: "a" },
    { id: 1, value: "b" },
    { id: 2, value: "c" },
    { id: 1, value: "d" },
    { id: 0, value: "e" },
  ],
  (a, b) => a.id === b.id
); // [ { id: 2, value: 'c' } ]
```

---

## title: filterUnique

Creates an array with the unique values filtered out.

- Use `new Set()` and the spread operator (`...`) to create an array of the unique values in `arr`.
- Use `Array.prototype.filter()` to create an array containing only the non-unique values.

```js
const filterUnique = (arr) =>
  [...new Set(arr)].filter((i) => arr.indexOf(i) !== arr.lastIndexOf(i));
```

```js
filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]
```

---

## title: filterUniqueBy

Creates an array with the unique values filtered out, based on a provided comparator function.

- Use `Array.prototype.filter()` and `Array.prototype.every()` to create an array containing only the non-unique values, based on the comparator function, `fn`.
- The comparator function takes four arguments: the values of the two elements being compared and their indexes.

```js
const filterUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.some((x, j) => (i !== j) === fn(v, x, i, j)));
```

```js
filterUniqueBy(
  [
    { id: 0, value: "a" },
    { id: 1, value: "b" },
    { id: 2, value: "c" },
    { id: 3, value: "d" },
    { id: 0, value: "e" },
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'a' }, { id: 0, value: 'e' } ]
```

---

## title: findClosestAnchor

Finds the anchor node closest to the given `node`, if any.

- Use a `for` loop and `Node.parentNode` to traverse the node tree upwards from the given `node`.
- Use `Node.nodeName` and `String.prototype.toLowerCase()` to check if any given node is an anchor (`'a'`).
- If no matching node is found, return `null`.

```js
const findClosestAnchor = (node) => {
  for (let n = node; n.parentNode; n = n.parentNode)
    if (n.nodeName.toLowerCase() === "a") return n;
  return null;
};
```

```js
findClosestAnchor(document.querySelector("a > span")); // a
```

---

## title: findClosestMatchingNode

Finds the closest matching node starting at the given `node`.

- Use a `for` loop and `Node.parentNode` to traverse the node tree upwards from the given `node`.
- Use `Element.matches()` to check if any given element node matches the provided `selector`.
- If no matching node is found, return `null`.

```js
const findClosestMatchingNode = (node, selector) => {
  for (let n = node; n.parentNode; n = n.parentNode)
    if (n.matches && n.matches(selector)) return n;
  return null;
};
```

```js
findClosestMatchingNode(document.querySelector("span"), "body"); // body
```

---

## title: findFirstN

Finds the first `n` elements for which the provided function returns a truthy value.

- Use a `for..in` loop to execute the provided `matcher` for each element of `arr`.
- Use `Array.prototype.push()` to append elements to the results array and return them if its `length` is equal to `n`.

```js
const findFirstN = (arr, matcher, n = 1) => {
  let res = [];
  for (let i in arr) {
    const el = arr[i];
    const match = matcher(el, i, arr);
    if (match) res.push(el);
    if (res.length === n) return res;
  }
  return res;
};
```

```js
findFirstN([1, 2, 4, 6], (n) => n % 2 === 0, 2); // [2, 4]
findFirstN([1, 2, 4, 6], (n) => n % 2 === 0, 5); // [2, 4, 6]
```

---

## title: findKey

Finds the first key that satisfies the provided testing function.
Otherwise `undefined` is returned.

- Use `Object.keys(obj)` to get all the properties of the object, `Array.prototype.find()` to test each key-value pair using `fn`.
- The callback receives three arguments - the value, the key and the object.

```js
const findKey = (obj, fn) =>
  Object.keys(obj).find((key) => fn(obj[key], key, obj));
```

```js
findKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true },
  },
  (x) => x["active"]
); // 'barney'
```

---

## title: findKeys

Finds all the keys in the provided object that match the given value.

- Use `Object.keys(obj)` to get all the properties of the object.
- Use `Array.prototype.filter()` to test each key-value pair and return all keys that are equal to the given value.

```js
const findKeys = (obj, val) =>
  Object.keys(obj).filter((key) => obj[key] === val);
```

```js
const ages = {
  Leo: 20,
  Zoey: 21,
  Jane: 20,
};
findKeys(ages, 20); // [ 'Leo', 'Jane' ]
```

---

## title: findLast

Finds the last element for which the provided function returns a truthy value.

- Use `Array.prototype.filter()` to remove elements for which `fn` returns falsy values.
- Use `Array.prototype.pop()` to get the last element in the filtered array.

```js
const findLast = (arr, fn) => arr.filter(fn).pop();
```

```js
findLast([1, 2, 3, 4], (n) => n % 2 === 1); // 3
```

---

## title: findLastIndex

Finds the index of the last element for which the provided function returns a truthy value.

- Use `Array.prototype.map()` to map each element to an array with its index and value.
- Use `Array.prototype.filter()` to remove elements for which `fn` returns falsy values
- Use `Array.prototype.pop()` to get the last element in the filtered array.
- Return `-1` if there are no matching elements.

```js
const findLastIndex = (arr, fn) =>
  (arr
    .map((val, i) => [i, val])
    .filter(([i, val]) => fn(val, i, arr))
    .pop() || [-1])[0];
```

```js
findLastIndex([1, 2, 3, 4], (n) => n % 2 === 1); // 2 (index of the value 3)
findLastIndex([1, 2, 3, 4], (n) => n === 5); // -1 (default value when not found)
```

---

## title: findLastKey

Finds the last key that satisfies the provided testing function.
Otherwise `undefined` is returned.

- Use `Object.keys(obj)` to get all the properties of the object.
- Use `Array.prototype.reverse()` to reverse the order and `Array.prototype.find()` to test the provided function for each key-value pair.
- The callback receives three arguments - the value, the key and the object.

```js
const findLastKey = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .find((key) => fn(obj[key], key, obj));
```

```js
findLastKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true },
  },
  (x) => x["active"]
); // 'pebbles'
```

---

## title: findLastN

Finds the last `n` elements for which the provided function returns a truthy value.

- Use a `for` loop to execute the provided `matcher` for each element of `arr`.
- Use `Array.prototype.unshift()` to prepend elements to the results array and return them if its `length` is equal to `n`.

```js
const findLastN = (arr, matcher, n = 1) => {
  let res = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    const el = arr[i];
    const match = matcher(el, i, arr);
    if (match) res.unshift(el);
    if (res.length === n) return res;
  }
  return res;
};
```

```js
findLastN([1, 2, 4, 6], (n) => n % 2 === 0, 2); // [4, 6]
findLastN([1, 2, 4, 6], (n) => n % 2 === 0, 5); // [2, 4, 6]
```

---

## title: flatten

Flattens an array up to the specified depth.

- Use recursion, decrementing `depth` by `1` for each level of depth.
- Use `Array.prototype.reduce()` and `Array.prototype.concat()` to merge elements or arrays.
- Base case, for `depth` equal to `1` stops recursion.
- Omit the second argument, `depth`, to flatten only to a depth of `1` (single flatten).

```js
const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );
```

```js
flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]
```

---

## title: flattenObject

Flattens an object with the paths for keys.

- Use recursion.
- Use `Object.keys(obj)` combined with `Array.prototype.reduce()` to convert every leaf node to a flattened path node.
- If the value of a key is an object, the function calls itself with the appropriate `prefix` to create the path using `Object.assign()`.
- Otherwise, it adds the appropriate prefixed key-value pair to the accumulator object.
- You should always omit the second argument, `prefix`, unless you want every key to have a prefix.

```js
const flattenObject = (obj, prefix = "") =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : "";
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});
```

```js
flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }
```

---

## title: flip

Takes a function as an argument, then makes the first argument the last.

- Use argument destructuring and a closure with variadic arguments.
- Splice the first argument, using the spread operator (`...`), to make it the last before applying the rest.

```js
const flip =
  (fn) =>
  (first, ...rest) =>
    fn(...rest, first);
```

```js
let a = { name: "John Smith" };
let b = {};
const mergeFrom = flip(Object.assign);
let mergePerson = mergeFrom.bind(null, a);
mergePerson(b); // == b
b = {};
Object.assign(b, a); // == b
```

---

## title: forEachRight

Executes a provided function once for each array element, starting from the array's last element.

- Use `Array.prototype.slice()` to clone the given array and `Array.prototype.reverse()` to reverse it.
- Use `Array.prototype.forEach()` to iterate over the reversed array.

```js
const forEachRight = (arr, callback) => arr.slice().reverse().forEach(callback);
```

```js
forEachRight([1, 2, 3, 4], (val) => console.log(val)); // '4', '3', '2', '1'
```

---

## title: forOwn

Iterates over all own properties of an object, running a callback for each one.

- Use `Object.keys(obj)` to get all the properties of the object.
- Use `Array.prototype.forEach()` to run the provided function for each key-value pair.
- The callback receives three arguments - the value, the key and the object.

```js
const forOwn = (obj, fn) =>
  Object.keys(obj).forEach((key) => fn(obj[key], key, obj));
```

```js
forOwn({ foo: "bar", a: 1 }, (v) => console.log(v)); // 'bar', 1
```

---

## title: forOwnRight

Iterates over all own properties of an object in reverse, running a callback for each one.

- Use `Object.keys(obj)` to get all the properties of the object, `Array.prototype.reverse()` to reverse their order.
- Use `Array.prototype.forEach()` to run the provided function for each key-value pair.
- The callback receives three arguments - the value, the key and the object.

```js
const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach((key) => fn(obj[key], key, obj));
```

```js
forOwnRight({ foo: "bar", a: 1 }, (v) => console.log(v)); // 1, 'bar'
```

---

## title: formToObject

Encodes a set of form elements as an `object`.

- Use the `FormData` constructor to convert the HTML `form` to `FormData` and `Array.from()` to convert to an array.
- Collect the object from the array using `Array.prototype.reduce()`.

```js
const formToObject = (form) =>
  Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }),
    {}
  );
```

```js
formToObject(document.querySelector("#form"));
// { email: 'test@email.com', name: 'Test Name' }
```

---

## title: formatDuration

Returns the human-readable format of the given number of milliseconds.

- Divide `ms` with the appropriate values to obtain the appropriate values for `day`, `hour`, `minute`, `second` and `millisecond`.
- Use `Object.entries()` with `Array.prototype.filter()` to keep only non-zero values.
- Use `Array.prototype.map()` to create the string for each value, pluralizing appropriately.
- Use `String.prototype.join(', ')` to combine the values into a string.

```js
const formatDuration = (ms) => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
    .join(", ");
};
```

```js
formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574);
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
```

---

## title: formatNumber

Formats a number using the local number format order.

- Use `Number.prototype.toLocaleString()` to convert a number to using the local number format separators.

```js
const formatNumber = (num) => num.toLocaleString();
```

```js
formatNumber(123456); // '123,456' in `en-US`
formatNumber(15675436903); // '15.675.436.903' in `de-DE`
```

---

## title: formatSeconds

Returns the ISO format of the given number of seconds.

- Divide `s` with the appropriate values to obtain the appropriate values for `hour`, `minute` and `second`.
- Store the `sign` in a variable to prepend it to the result.
- Use `Array.prototype.map()` in combination with `Math.floor()` and `String.prototype.padStart()` to stringify and format each segment.
- Use `String.prototype.join(':')` to combine the values into a string.

```js
const formatSeconds = (s) => {
  const [hour, minute, second, sign] =
    s > 0
      ? [s / 3600, (s / 60) % 60, s % 60, ""]
      : [-s / 3600, (-s / 60) % 60, -s % 60, "-"];

  return (
    sign +
    [hour, minute, second]
      .map((v) => `${Math.floor(v)}`.padStart(2, "0"))
      .join(":")
  );
};
```

```js
formatSeconds(200); // '00:03:20'
formatSeconds(-200); // '-00:03:20'
formatSeconds(99999); // '27:46:39'
```

---

## title: frequencies

Creates an object with the unique values of an array as keys and their frequencies as the values.

- Use `Array.prototype.reduce()` to map unique values to an object's keys, adding to existing keys every time the same value is encountered.

```js
const frequencies = (arr) =>
  arr.reduce((a, v) => {
    a[v] = a[v] ? a[v] + 1 : 1;
    return a;
  }, {});
```

```js
frequencies(["a", "b", "a", "c", "a", "a", "b"]); // { a: 4, b: 2, c: 1 }
frequencies([..."ball"]); // { b: 1, a: 1, l: 2 }
```

---

## title: fromCamelCase

Converts a string from camelcase.

- Use `String.prototype.replace()` to break the string into words and add a `separator` between them.
- Omit the second argument to use a default `separator` of `_`.

```js
const fromCamelCase = (str, separator = "_") =>
  str
    .replace(/([a-z\d])([A-Z])/g, "$1" + separator + "$2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + separator + "$2")
    .toLowerCase();
```

```js
fromCamelCase("someDatabaseFieldName", " "); // 'some database field name'
fromCamelCase("someLabelThatNeedsToBeDecamelized", "-");
// 'some-label-that-needs-to-be-decamelized'
fromCamelCase("someJavascriptProperty", "_"); // 'some_javascript_property'
fromCamelCase("JSONToCSV", "."); // 'json.to.csv'
```

---

## title: fromTimestamp

Creates a `Date` object from a Unix timestamp.

- Convert the timestamp to milliseconds by multiplying with `1000`.
- Use `new Date()` to create a new `Date` object.

```js
const fromTimestamp = (timestamp) => new Date(timestamp * 1000);
```

```js
fromTimestamp(1602162242); // 2020-10-08T13:04:02.000Z
```

---

## title: frozenSet

Creates a frozen `Set` object.

- Use the `new Set()` constructor to create a new `Set` object from `iterable`.
- Set the `add`, `delete` and `clear` methods of the newly created object to `undefined`, so that they cannot be used, practically freezing the object.

```js
const frozenSet = (iterable) => {
  const s = new Set(iterable);
  s.add = undefined;
  s.delete = undefined;
  s.clear = undefined;
  return s;
};
```

```js
frozenSet([1, 2, 3, 1, 2]);
// Set { 1, 2, 3, add: undefined, delete: undefined, clear: undefined }
```

---

## title: fullscreen

Opens or closes an element in fullscreen mode.

- Use `Document.querySelector()` and `Element.requestFullscreen()` to open the given element in fullscreen.
- Use `Document.exitFullscreen()` to exit fullscreen mode.
- Omit the second argument, `el`, to use `body` as the default element.
- Omit the first element, `mode`, to open the element in fullscreen mode by default.

```js
const fullscreen = (mode = true, el = "body") =>
  mode
    ? document.querySelector(el).requestFullscreen()
    : document.exitFullscreen();
```

```js
fullscreen(); // Opens `body` in fullscreen mode
fullscreen(false); // Exits fullscreen mode
```

---

## title: functionName

Logs the name of a function.

- Use `console.debug()` and the `name` property of the passed function to log the function's name to the `debug` channel of the console.
- Return the given function `fn`.

```js
const functionName = (fn) => (console.debug(fn.name), fn);
```

```js
let m = functionName(Math.max)(5, 6);
// max (logged in debug channel of console)
// m = 6
```

---

## title: functions

Gets an array of function property names from own (and optionally inherited) enumerable properties of an object.

- Use `Object.keys(obj)` to iterate over the object's own properties.
- If `inherited` is `true`, use `Object.getPrototypeOf(obj)` to also get the object's inherited properties.
- Use `Array.prototype.filter()` to keep only those properties that are functions.
- Omit the second argument, `inherited`, to not include inherited properties by default.

```js
const functions = (obj, inherited = false) =>
  (inherited
    ? [...Object.keys(obj), ...Object.keys(Object.getPrototypeOf(obj))]
    : Object.keys(obj)
  ).filter((key) => typeof obj[key] === "function");
```

```js
function Foo() {
  this.a = () => 1;
  this.b = () => 2;
}
Foo.prototype.c = () => 3;
functions(new Foo()); // ['a', 'b']
functions(new Foo(), true); // ['a', 'b', 'c']
```

---

## title: gcd

Calculates the greatest common divisor between two or more numbers/arrays.

- The inner `_gcd` function uses recursion.
- Base case is when `y` equals `0`. In this case, return `x`.
- Otherwise, return the GCD of `y` and the remainder of the division `x/y`.

```js
const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};
```

```js
gcd(8, 36); // 4
gcd(...[12, 8, 32]); // 4
```

---

## title: generateItems

Generates an array with the given amount of items, using the given function.

- Use `Array.from()` to create an empty array of the specific length, calling `fn` with the index of each newly created element.
- The callback takes one argument - the index of each element.

```js
const generateItems = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));
```

```js
generateItems(10, Math.random);
// [0.21, 0.08, 0.40, 0.96, 0.96, 0.24, 0.19, 0.96, 0.42, 0.70]
```

---

## title: generatorToArray

Converts the output of a generator function to an array.

- Use the spread operator (`...`) to convert the output of the generator function to an array.

```js
const generatorToArray = (gen) => [...gen];
```

```js
const s = new Set([1, 2, 1, 3, 1, 4]);
generatorToArray(s.entries()); // [[ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 4 ]]
```

---

## title: geometricProgression

Initializes an array containing the numbers in the specified range where `start` and `end` are inclusive and the ratio between two terms is `step`.
Returns an error if `step` equals `1`.

- Use `Array.from()`, `Math.log()` and `Math.floor()` to create an array of the desired length, `Array.prototype.map()` to fill with the desired values in a range.
- Omit the second argument, `start`, to use a default value of `1`.
- Omit the third argument, `step`, to use a default value of `2`.

```js
const geometricProgression = (end, start = 1, step = 2) =>
  Array.from({
    length: Math.floor(Math.log(end / start) / Math.log(step)) + 1,
  }).map((_, i) => start * step ** i);
```

```js
geometricProgression(256); // [1, 2, 4, 8, 16, 32, 64, 128, 256]
geometricProgression(256, 3); // [3, 6, 12, 24, 48, 96, 192]
geometricProgression(256, 1, 4); // [1, 4, 16, 64, 256]
```

---

## title: get

Retrieves a set of properties indicated by the given selectors from an object.

- Use `Array.prototype.map()` for each selector, `String.prototype.replace()` to replace square brackets with dots.
- Use `String.prototype.split('.')` to split each selector.
- Use `Array.prototype.filter()` to remove empty values and `Array.prototype.reduce()` to get the value indicated by each selector.

```js
const get = (from, ...selectors) =>
  [...selectors].map((s) =>
    s
      .replace(/\[([^\[\]]*)\]/g, ".$1.")
      .split(".")
      .filter((t) => t !== "")
      .reduce((prev, cur) => prev && prev[cur], from)
  );
```

```js
const obj = {
  selector: { to: { val: "val to select" } },
  target: [1, 2, { a: "test" }],
};
get(obj, "selector.to.val", "target[0]", "target[2].a");
// ['val to select', 1, 'test']
```

---

## title: getAncestors

Returns all the ancestors of an element from the document root to the given element.

- Use `Node.parentNode` and a `while` loop to move up the ancestor tree of the element.
- Use `Array.prototype.unshift()` to add each new ancestor to the start of the array.

```js
const getAncestors = (el) => {
  let ancestors = [];
  while (el) {
    ancestors.unshift(el);
    el = el.parentNode;
  }
  return ancestors;
};
```

```js
getAncestors(document.querySelector("nav"));
// [document, html, body, header, nav]
```

---

## title: getBaseURL

Gets the current URL without any parameters or fragment identifiers.

- Use `String.prototype.replace()` with an appropriate regular expression to remove everything after either `'?'` or `'#'`, if found.

```js
const getBaseURL = (url) => url.replace(/[?#].*$/, "");
```

```js
getBaseURL("http://url.com/page?name=Adam&surname=Smith");
// 'http://url.com/page'
```

---

## title: getColonTimeFromDate

Returns a string of the form `HH:MM:SS` from a `Date` object.

- Use `Date.prototype.toTimeString()` and `String.prototype.slice()` to get the `HH:MM:SS` part of a given `Date` object.

```js
const getColonTimeFromDate = (date) => date.toTimeString().slice(0, 8);
```

```js
getColonTimeFromDate(new Date()); // '08:38:00'
```

---

## title: getDaysDiffBetweenDates

Calculates the difference (in days) between two dates.

- Subtract the two `Date` objects and divide by the number of milliseconds in a day to get the difference (in days) between them.

```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);
```

```js
getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")); // 9
```

---

## title: getElementsBiggerThanViewport

Returns an array of HTML elements whose width is larger than that of the viewport's.

- Use `HTMLElement.offsetWidth` to get the width of the `document`.
- Use `Array.prototype.filter()` on the result of `Document.querySelectorAll()` to check the width of all elements in the document.

```js
const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll("*")].filter(
    (el) => el.offsetWidth > docWidth
  );
};
```

```js
getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />
```

---

## title: getHoursDiffBetweenDates

Calculates the difference (in hours) between two dates.

- Subtract the two `Date` objects and divide by the number of milliseconds in an hour to get the difference (in hours) between them.

```js
const getHoursDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600);
```

```js
getHoursDiffBetweenDates(
  new Date("2021-04-24 10:25:00"),
  new Date("2021-04-25 10:25:00")
); // 24
```

---

## title: getImages

Fetches all images from within an element and puts them into an array.

- Use `Element.getElementsByTagName()` to get all `<img>` elements inside the provided element.
- Use `Array.prototype.map()` to map every `src` attribute of each `<img>` element.
- If `includeDuplicates` is `false`, create a new `Set` to eliminate duplicates and return it after spreading into an array.
- Omit the second argument, `includeDuplicates`, to discard duplicates by default.

```js
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName("img")].map((img) =>
    img.getAttribute("src")
  );
  return includeDuplicates ? images : [...new Set(images)];
};
```

```js
getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']
```

---

## title: getMeridiemSuffixOfInteger

Converts an integer to a suffixed string, adding `am` or `pm` based on its value.

- Use the modulo operator (`%`) and conditional checks to transform an integer to a stringified 12-hour format with meridiem suffix.

```js
const getMeridiemSuffixOfInteger = (num) =>
  num === 0 || num === 24
    ? 12 + "am"
    : num === 12
    ? 12 + "pm"
    : num < 12
    ? (num % 12) + "am"
    : (num % 12) + "pm";
```

```js
getMeridiemSuffixOfInteger(0); // '12am'
getMeridiemSuffixOfInteger(11); // '11am'
getMeridiemSuffixOfInteger(13); // '1pm'
getMeridiemSuffixOfInteger(25); // '1pm'
```

---

## title: getMinutesDiffBetweenDates

Calculates the difference (in minutes) between two dates.

- Subtract the two `Date` objects and divide by the number of milliseconds in a minute to get the difference (in minutes) between them.

```js
const getMinutesDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 60);
```

```js
getMinutesDiffBetweenDates(
  new Date("2021-04-24 01:00:15"),
  new Date("2021-04-24 02:00:15")
); // 60
```

---

## title: getMonthsDiffBetweenDates

Calculates the difference (in months) between two dates.

- Use `Date.prototype.getFullYear()` and `Date.prototype.getMonth()` to calculate the difference (in months) between two `Date` objects.

```js
const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );
```

```js
getMonthsDiffBetweenDates(new Date("2017-12-13"), new Date("2018-04-29")); // 4
```

---

## title: getParentsUntil

Finds all the ancestors of an element up until the element matched by the specified selector.

- Use `Node.parentNode` and a `while` loop to move up the ancestor tree of the element.
- Use `Array.prototype.unshift()` to add each new ancestor to the start of the array.
- Use `Element.matches()` to check if the current element matches the specified `selector`.

```js
const getParentsUntil = (el, selector) => {
  let parents = [],
    _el = el.parentNode;
  while (_el && typeof _el.matches === "function") {
    parents.unshift(_el);
    if (_el.matches(selector)) return parents;
    else _el = _el.parentNode;
  }
  return [];
};
```

```js
getParentsUntil(document.querySelector("#home-link"), "header");
// [header, nav, ul, li]
```

---

## title: getProtocol

Gets the protocol being used on the current page.

- Use `Window.location.protocol` to get the protocol (`http:` or `https:`) of the current page.

```js
const getProtocol = () => window.location.protocol;
```

```js
getProtocol(); // 'https:'
```

---

## title: getScrollPosition

Returns the scroll position of the current page.

- Use `Window.pageXOffset` and `Window.pageYOffset` if they are defined, otherwise `Element.scrollLeft` and `Element.scrollTop`.
- Omit the single argument, `el`, to use a default value of `window`.

```js
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});
```

```js
getScrollPosition(); // {x: 0, y: 200}
```

---

## title: getSecondsDiffBetweenDates

Calculates the difference (in seconds) between two dates.

- Subtract the two `Date` objects and divide by the number of milliseconds in a second to get the difference (in seconds) between them.

```js
const getSecondsDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / 1000;
```

```js
getSecondsDiffBetweenDates(
  new Date("2020-12-24 00:00:15"),
  new Date("2020-12-24 00:00:17")
); // 2
```

---

## title: getSelectedText

Gets the currently selected text.

- Use `Window.getSelection()` and `Selection.toString()` to get the currently selected text.

```js
const getSelectedText = () => window.getSelection().toString();
```

```js
getSelectedText(); // 'Lorem ipsum'
```

---

## title: getSiblings

Returns an array containing all the siblings of the given element.

- Use `Node.parentNode` and `Node.childNodes` to get a `NodeList` of all the elements contained in the element's parent.
- Use the spread operator (`...`) and `Array.prototype.filter()` to convert to an array and remove the given element from it.

```js
const getSiblings = (el) =>
  [...el.parentNode.childNodes].filter((node) => node !== el);
```

```js
getSiblings(document.querySelector("head")); // ['body']
```

---

## title: getStyle

Retrieves the value of a CSS rule for the specified element.

- Use `Window.getComputedStyle()` to get the value of the CSS rule for the specified element.

```js
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
```

```js
getStyle(document.querySelector("p"), "font-size"); // '16px'
```

---

## title: getTimestamp

Gets the Unix timestamp from a `Date` object.

- Use `Date.prototype.getTime()` to get the timestamp in milliseconds and divide by `1000` to get the timestamp in seconds.
- Use `Math.floor()` to appropriately round the resulting timestamp to an integer.
- Omit the argument, `date`, to use the current date.

```js
const getTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);
```

```js
getTimestamp(); // 1602162242
```

---

## title: getType

Returns the native type of a value.

- Return `'undefined'` or `'null'` if the value is `undefined` or `null`.
- Otherwise, use `Object.prototype.constructor.name` to get the name of the constructor.

```js
const getType = (v) =>
  v === undefined ? "undefined" : v === null ? "null" : v.constructor.name;
```

```js
getType(new Set([1, 2, 3])); // 'Set'
```

---

## title: getURLParameters

Creates an object containing the parameters of the current URL.

- Use `String.prototype.match()` with an appropriate regular expression to get all key-value pairs.
- Use `Array.prototype.reduce()` to map and combine them into a single object.
- Pass `location.search` as the argument to apply to the current `url`.

```js
const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );
```

```js
getURLParameters("google.com"); // {}
getURLParameters("http://url.com/page?name=Adam&surname=Smith");
// {name: 'Adam', surname: 'Smith'}
```

---

## title: getVerticalOffset

Finds the distance from a given element to the top of the document.

- Use a `while` loop and `HTMLElement.offsetParent` to move up the offset parents of the given element.
- Add `HTMLElement.offsetTop` for each element and return the result.

```js
const getVerticalOffset = (el) => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};
```

```js
getVerticalOffset(".my-element"); // 120
```

---

## title: groupBy

Groups the elements of an array based on the given function.

- Use `Array.prototype.map()` to map the values of the array to a function or property name.
- Use `Array.prototype.reduce()` to create an object, where the keys are produced from the mapped results.

```js
const groupBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});
```

```js
groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
groupBy(["one", "two", "three"], "length"); // {3: ['one', 'two'], 5: ['three']}
```

---

## title: hammingDistance

Calculates the Hamming distance between two values.

- Use the XOR operator (`^`) to find the bit difference between the two numbers.
- Convert to a binary string using `Number.prototype.toString(2)`.
- Count and return the number of `1`s in the string, using `String.prototype.match(/1/g)`.

```js
const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || "").length;
```

```js
hammingDistance(2, 3); // 1
```

---

## title: hasClass

Checks if the given element has the specified class.

- Use `Element.classList` and `DOMTokenList.contains()` to check if the element has the specified class.

```js
const hasClass = (el, className) => el.classList.contains(className);
```

```js
hasClass(document.querySelector("p.special"), "special"); // true
```

---

## title: hasDuplicates

Checks if there are duplicate values in a flat array.

- Use `Set()` to get the unique values in the array.
- Use `Set.prototype.size` and `Array.prototype.length` to check if the count of the unique values is the same as elements in the original array.

```js
const hasDuplicates = (arr) => new Set(arr).size !== arr.length;
```

```js
hasDuplicates([0, 1, 1, 2]); // true
hasDuplicates([0, 1, 2, 3]); // false
```

---

## title: hasFlags

Checks if the current process's arguments contain the specified flags.

- Use `Array.prototype.every()` and `Array.prototype.includes()` to check if `process.argv` contains all the specified flags.
- Use a regular expression to test if the specified flags are prefixed with `-` or `--` and prefix them accordingly.

```js
const hasFlags = (...flags) =>
  flags.every((flag) =>
    process.argv.includes(/^-{1,2}/.test(flag) ? flag : "--" + flag)
  );
```

```js
// node myScript.js -s --test --cool=true
hasFlags("-s"); // true
hasFlags("--test", "cool=true", "-s"); // true
hasFlags("special"); // false
```

---

## title: hasKey

Checks if the target value exists in a JSON object.

- Check if `keys` is non-empty and use `Array.prototype.every()` to sequentially check its keys to internal depth of the object, `obj`.
- Use `Object.prototype.hasOwnProperty()` to check if `obj` does not have the current key or is not an object, stop propagation and return `false`.
- Otherwise assign the key's value to `obj` to use on the next iteration.
- Return `false` beforehand if given key list is empty.

```js
const hasKey = (obj, keys) => {
  return (
    keys.length > 0 &&
    keys.every((key) => {
      if (typeof obj !== "object" || !obj.hasOwnProperty(key)) return false;
      obj = obj[key];
      return true;
    })
  );
};
```

```js
let obj = {
  a: 1,
  b: { c: 4 },
  "b.d": 5,
};
hasKey(obj, ["a"]); // true
hasKey(obj, ["b"]); // true
hasKey(obj, ["b", "c"]); // true
hasKey(obj, ["b.d"]); // true
hasKey(obj, ["d"]); // false
hasKey(obj, ["c"]); // false
hasKey(obj, ["b", "f"]); // false
```

---

## title: hasMany

Checks if an array has more than one value matching the given function.

- Use `Array.prototype.filter()` in combination with `fn` to find all matching array elements.
- Use `Array.prototype.length` to check if more than one element match `fn`.

```js
const hasMany = (arr, fn) => arr.filter(fn).length > 1;
```

```js
hasMany([1, 3], (x) => x % 2); // true
hasMany([1, 2], (x) => x % 2); // false
```

---

## title: hasOne

Checks if an array has only one value matching the given function.

- Use `Array.prototype.filter()` in combination with `fn` to find all matching array elements.
- Use `Array.prototype.length` to check if only one element matches `fn`.

```js
const hasOne = (arr, fn) => arr.filter(fn).length === 1;
```

```js
hasOne([1, 2], (x) => x % 2); // true
hasOne([1, 3], (x) => x % 2); // false
```

---

## title: hashBrowser

Creates a hash for a value using the [SHA-256](https://en.wikipedia.org/wiki/SHA-2) algorithm.
Returns a promise.

- Use the [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) API to create a hash for the given value.
- Create a new `TextEncoder` and use it to encode `val`. Pass its value to `SubtleCrypto.digest()` to generate a digest of the given data.
- Use `DataView.prototype.getUint32()` to read data from the resolved `ArrayBuffer`.
- Convert the data to it hexadecimal representation using `Number.prototype.toString(16)`. Add the data to an array using `Array.prototype.push()`.
- Finally, use `Array.prototype.join()` to combine values in the array of `hexes` into a string.

```js
const hashBrowser = (val) =>
  crypto.subtle
    .digest("SHA-256", new TextEncoder("utf-8").encode(val))
    .then((h) => {
      let hexes = [],
        view = new DataView(h);
      for (let i = 0; i < view.byteLength; i += 4)
        hexes.push(("00000000" + view.getUint32(i).toString(16)).slice(-8));
      return hexes.join("");
    });
```

```js
hashBrowser(
  JSON.stringify({ a: "a", b: [1, 2, 3, 4], foo: { c: "bar" } })
).then(console.log);
// '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'
```

---

## title: hashNode

Creates a hash for a value using the [SHA-256](https://en.wikipedia.org/wiki/SHA-2) algorithm.
Returns a promise.

- Use `crypto.createHash()` to create a `Hash` object with the appropriate algorithm.
- Use `hash.update()` to add the data from `val` to the `Hash`, `hash.digest()` to calculate the digest of the data.
- Use `setTimeout()` to prevent blocking on a long operation. Return a `Promise` to give it a familiar interface.

```js
const crypto = require("crypto");

const hashNode = (val) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(crypto.createHash("sha256").update(val).digest("hex")),
      0
    )
  );
```

```js
hashNode(JSON.stringify({ a: "a", b: [1, 2, 3, 4], foo: { c: "bar" } })).then(
  console.log
);
// '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'
```

---

## title: haveSameContents

Checks if two arrays contain the same elements regardless of order.

- Use a `for...of` loop over a `Set` created from the values of both arrays.
- Use `Array.prototype.filter()` to compare the amount of occurrences of each distinct value in both arrays.
- Return `false` if the counts do not match for any element, `true` otherwise.

```js
const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter((e) => e === v).length !== b.filter((e) => e === v).length)
      return false;
  return true;
};
```

```js
haveSameContents([1, 2, 4], [2, 4, 1]); // true
```

---

## title: head

Returns the head of an array.

- Check if `arr` is truthy and has a `length` property.
- Use `arr[0]` if possible to return the first element, otherwise return `undefined`.

```js
const head = (arr) => (arr && arr.length ? arr[0] : undefined);
```

```js
head([1, 2, 3]); // 1
head([]); // undefined
head(null); // undefined
head(undefined); // undefined
```

---

## title: heapsort

Sorts an array of numbers, using the heapsort algorithm.

- Use recursion.
- Use the spread operator (`...`) to clone the original array, `arr`.
- Use closures to declare a variable, `l`, and a function `heapify`.
- Use a `for` loop and `Math.floor()` in combination with `heapify` to create a max heap from the array.
- Use a `for` loop to repeatedly narrow down the considered range, using `heapify` and swapping values as necessary in order to sort the cloned array.

```js
const heapsort = (arr) => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};
```

```js
heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]
```

---

## title: hexToRGB

Converts a color code to an `rgb()` or `rgba()` string if alpha value is provided.

- Use bitwise right-shift operator and mask bits with `&` (and) operator to convert a hexadecimal color code (with or without prefixed with `#`) to a string with the RGB values.
- If it's 3-digit color code, first convert to 6-digit version.
- If an alpha value is provided alongside 6-digit hex, give `rgba()` string in return.

```js
const hexToRGB = (hex) => {
  let alpha = false,
    h = hex.slice(hex.startsWith("#") ? 1 : 0);
  if (h.length === 3) h = [...h].map((x) => x + x).join("");
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    "rgb" +
    (alpha ? "a" : "") +
    "(" +
    (h >>> (alpha ? 24 : 16)) +
    ", " +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ", " +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : "") +
    ")"
  );
};
```

```js
hexToRGB("#27ae60ff"); // 'rgba(39, 174, 96, 255)'
hexToRGB("27ae60"); // 'rgb(39, 174, 96)'
hexToRGB("#fff"); // 'rgb(255, 255, 255)'
```

---

## title: hide

Hides all the elements specified.

- Use the spread operator (`...`) and `Array.prototype.forEach()` to apply `display: none` to each element specified.

```js
const hide = (...el) => [...el].forEach((e) => (e.style.display = "none"));
```

```js
hide(...document.querySelectorAll("img")); // Hides all <img> elements on the page
```

---

## title: httpDelete

Makes a `DELETE` request to the passed URL.

- Use the `XMLHttpRequest` web API to make a `DELETE` request to the given `url`.
- Handle the `onload` event, by running the provided `callback` function.
- Handle the `onerror` event, by running the provided `err` function.
- Omit the third argument, `err` to log the request to the console's error stream by default.

```js
const httpDelete = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("DELETE", url, true);
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send();
};
```

```js
httpDelete("https://jsonplaceholder.typicode.com/posts/1", (request) => {
  console.log(request.responseText);
}); // Logs: {}
```

---

## title: httpGet

Makes a `GET` request to the passed URL.

- Use the `XMLHttpRequest` web API to make a `GET` request to the given `url`.
- Handle the `onload` event, by calling the given `callback` the `responseText`.
- Handle the `onerror` event, by running the provided `err` function.
- Omit the third argument, `err`, to log errors to the console's `error` stream by default.

```js
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};
```

```js
httpGet("https://jsonplaceholder.typicode.com/posts/1", console.log); /*
Logs: {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
*/
```

---

## title: httpPost

Makes a `POST` request to the passed URL.

- Use the `XMLHttpRequest` web API to make a `POST` request to the given `url`.
- Set the value of an `HTTP` request header with `setRequestHeader` method.
- Handle the `onload` event, by calling the given `callback` the `responseText`.
- Handle the `onerror` event, by running the provided `err` function.
- Omit the fourth argument, `err`, to log errors to the console's `error` stream by default.

```js
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};
```

```js
const newPost = {
  userId: 1,
  id: 1337,
  title: "Foo",
  body: "bar bar bar",
};
const data = JSON.stringify(newPost);
httpPost("https://jsonplaceholder.typicode.com/posts", data, console.log); /*
Logs: {
  "userId": 1,
  "id": 1337,
  "title": "Foo",
  "body": "bar bar bar"
}
*/
httpPost(
  "https://jsonplaceholder.typicode.com/posts",
  null, // does not send a body
  console.log
); /*
Logs: {
  "id": 101
}
*/
```

---

## title: httpPut

Makes a `PUT` request to the passed URL.

- Use `XMLHttpRequest` web api to make a `PUT` request to the given `url`.
- Set the value of an `HTTP` request header with `setRequestHeader` method.
- Handle the `onload` event, by running the provided `callback` function.
- Handle the `onerror` event, by running the provided `err` function.
- Omit the last argument, `err` to log the request to the console's error stream by default.

```js
const httpPut = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("PUT", url, true);
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send(data);
};
```

```js
const password = "fooBaz";
const data = JSON.stringify({
  id: 1,
  title: "foo",
  body: "bar",
  userId: 1,
});
httpPut("https://jsonplaceholder.typicode.com/posts/1", data, (request) => {
  console.log(request.responseText);
}); /*
Logs: {
  id: 1,
  title: 'foo',
  body: 'bar',
  userId: 1
}
*/
```

---

## title: httpsRedirect

Redirects the page to HTTPS if it's currently in HTTP.

- Use `location.protocol` to get the protocol currently being used.
- If it's not HTTPS, use `location.replace()` to replace the existing page with the HTTPS version of the page.
- Use `location.href` to get the full address, split it with `String.prototype.split()` and remove the protocol part of the URL.
- Note that pressing the back button doesn't take it back to the HTTP page as its replaced in the history.

```js
const httpsRedirect = () => {
  if (location.protocol !== "https:")
    location.replace("https://" + location.href.split("//")[1]);
};
```

```js
httpsRedirect();
// If you are on http://mydomain.com, you are redirected to https://mydomain.com
```

---

title: hz
unlisted: true

---

Measures the number of times a function is executed per second (`hz`/`hertz`).

- Use `performance.now()` to get the difference in milliseconds before and after the iteration loop to calculate the time elapsed executing the function `iterations` times.
- Return the number of cycles per second by converting milliseconds to seconds and dividing it by the time elapsed.
- Omit the second argument, `iterations`, to use the default of 100 iterations.

```js
const hz = (fn, iterations = 100) => {
  const before = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  return (1000 * iterations) / (performance.now() - before);
};
```

```js
const numbers = Array(10000)
  .fill()
  .map((_, i) => i);

const sumReduce = () => numbers.reduce((acc, n) => acc + n, 0);
const sumForLoop = () => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  return sum;
};

Math.round(hz(sumReduce)); // 572
Math.round(hz(sumForLoop)); // 4784
```

---

## title: inRange

Checks if the given number falls within the given range.

- Use arithmetic comparison to check if the given number is in the specified range.
- If the second argument, `end`, is not specified, the range is considered to be from `0` to `start`.

```js
const inRange = (n, start, end = null) => {
  if (end && start > end) [end, start] = [start, end];
  return end == null ? n >= 0 && n < start : n >= start && n < end;
};
```

```js
inRange(3, 2, 5); // true
inRange(3, 4); // true
inRange(2, 3, 5); // false
inRange(3, 2); // false
```

---

## title: includesAll

Checks if all the elements in `values` are included in `arr`.

- Use `Array.prototype.every()` and `Array.prototype.includes()` to check if all elements of `values` are included in `arr`.

```js
const includesAll = (arr, values) => values.every((v) => arr.includes(v));
```

```js
includesAll([1, 2, 3, 4], [1, 4]); // true
includesAll([1, 2, 3, 4], [1, 5]); // false
```

---

## title: includesAny

Checks if at least one element of `values` is included in `arr`.

- Use `Array.prototype.some()` and `Array.prototype.includes()` to check if at least one element of `values` is included in `arr`.

```js
const includesAny = (arr, values) => values.some((v) => arr.includes(v));
```

```js
includesAny([1, 2, 3, 4], [2, 9]); // true
includesAny([1, 2, 3, 4], [8, 9]); // false
```

---

## title: indentString

Indents each line in the provided string.

- Use `String.prototype.replace()` and a regular expression to add the character specified by `indent` `count` times at the start of each line.
- Omit the third argument, `indent`, to use a default indentation character of `' '`.

```js
const indentString = (str, count, indent = " ") =>
  str.replace(/^/gm, indent.repeat(count));
```

```js
indentString("Lorem\nIpsum", 2); // '  Lorem\n  Ipsum'
indentString("Lorem\nIpsum", 2, "_"); // '__Lorem\n__Ipsum'
```

---

## title: indexBy

Creates an object from an array, using a function to map each value to a key.

- Use `Array.prototype.reduce()` to create an object from `arr`.
- Apply `fn` to each value of `arr` to produce a key and add the key-value pair to the object.

```js
const indexBy = (arr, fn) =>
  arr.reduce((obj, v, i) => {
    obj[fn(v, i, arr)] = v;
    return obj;
  }, {});
```

```js
indexBy(
  [
    { id: 10, name: "apple" },
    { id: 20, name: "orange" },
  ],
  (x) => x.id
);
// { '10': { id: 10, name: 'apple' }, '20': { id: 20, name: 'orange' } }
```
