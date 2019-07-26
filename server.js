const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 6600;

mongoose.connect(
  "mongodb://127.0.0.1:27017/express",
  { useNewUrlParser: true },
  err => {
    if (err) throw err;
    console.log("Successfully connected mongoDB");
  }
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server started and running on PORT ${PORT}`);
});
