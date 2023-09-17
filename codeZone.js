const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const prouctsRouter = require("./routes/products.route");
const userRouter = require("./routes/uesr.route");
const mongoose = require("mongoose");
require("dotenv").config();
const statusTxt = require("./utilites/statusTxt");
const cors = require("cors");
const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("conneted to database");
});
app.use(cors());
app.use(bodyParser.json());
app.use("/", prouctsRouter);
app.use("/", userRouter);

app.all("*", (req, res) => {
  return res
    .status(404)
    .json({ status: statusTxt.error, message: "Route not found" });
});

app.listen(process.env.PORT || 8060, () => {
  console.log("listening on port 8050");
});
