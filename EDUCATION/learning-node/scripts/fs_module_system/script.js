const fs = require("fs");

// READ FILE
fs.readFile("./hello.txt", (err, data) => {
  if (err) {
    console.log("errrrrrrr");
  }
  console.log("Async ->", data.toString());
});

const file = fs.readFileSync("./hello.txt");
console.log("Sync ->", file.toString());

// APPEND
fs.appendFile("./hello.txt", " This is cool!", (err) => {
  if (err) {
    console.log("errrrr!");
  }
});

// WRITE
fs.writeFile("bye.txt", "bye!!!!", (err) => {
  if (err) {
    console.log("errrr!");
  }
});

// DELETE
fs.unlink("./bye.txt", (err) => {
  if (err) {
    console.log("errrr!");
  }
  console.log("Successful");
});
