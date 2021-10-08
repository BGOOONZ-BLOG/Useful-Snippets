const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static(__dirname + "/public"));

app.listen(3002);
