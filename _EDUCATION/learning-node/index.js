import c from "./scripts/script2.js";

const a = c.largeNumber;
const b = 8;

console.log(a + b);

setTimeout(() => {
  console.log(__dirname);
}, 3000);
