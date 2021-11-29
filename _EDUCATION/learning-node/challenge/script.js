import fs from "fs";

function floor() {
  fs.readFile("./input.txt", (err, data) => {
    console.time("floor");
    const dir = data.toString();
    const dirArray = dir.split("");
    const res = dirArray.reduce((acc, curr) => {
      if (curr === "(") {
        return (acc += 1);
      } else if (curr === ")") {
        return (acc -= 1);
      }
    }, 0);
    console.timeEnd("floor");
    console.log("answer = ", res);
  });
}
floor();

function base() {
  fs.readFile("./input.txt", (err, data) => {
    console.time("base");
    const dir = data.toString();
    const dirArray = dir.split("");
    let acc = 0;
    let counter = 0;
    const res = dirArray.some((curr) => {
      if (curr === "(") {
        acc += 1;
      } else if (curr === ")") {
        acc -= 1;
      }
      counter++;
      return acc < 0;
    });
    console.timeEnd("base");
    console.log("answer =", counter);
  });
}
base();
