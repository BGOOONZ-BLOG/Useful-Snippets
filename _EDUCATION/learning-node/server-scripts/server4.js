import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.get("/:id", ({params}, res) => {
  // console.log(req.query)
  // req.body
  // console.log(req.header)
  console.log(params);
  res.status(404).send("Not Found");
});

app.listen(3002);
