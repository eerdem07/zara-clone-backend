const express = reuqire("express");
const app = express();
const morgan = require("morgan");

const productRouter = require("./routes/productRouter");

app.use(express.json());
app.use(morgan("dev"));

// ROUTES

app.use("/api/v1/product", productRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "error",
    error: "the path youre trying to access doesnt exist.",
  });
});

module.exports = app;
