import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(express.static(`${__dirname}/public`));

app.listen(3002);
