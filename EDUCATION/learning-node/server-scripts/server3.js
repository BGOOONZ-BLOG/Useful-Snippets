const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("getting root...");
});

app.get("/profile", (req, res) => {
  res.send("getting profile...");
});

app.post("/profile", (req, res) => {
  console.log(req.body);
  const user = {
    name: "bolaji",
    age: 23,
  };
  res.send(user);
});

app.listen(3002);
