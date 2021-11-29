import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("getting root...");
});

app.get("/profile", (req, res) => {
  res.send("getting profile...");
});

app.post("/profile", (req, res) => {
  const user = {
    name: "bolaji",
    age: 23,
  };
  res.send(user);
});

// get, post, put, delete

app.listen(3002);
