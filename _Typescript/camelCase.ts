export default function toCamelCase(string: string) {
  const result = string
    .toLowerCase()
    .trim()
    .split(/[ -_]/g)
    .map((word) => word.replace(word[0], word[0].toString().toUpperCase()))
    .join("");
  return result.replace(result[0], result[0].toLowerCase());
}
