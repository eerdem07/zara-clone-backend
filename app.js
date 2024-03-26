const express = require("express");
const app = express();
const morgan = require("morgan");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(morgan("dev"));

// ROUTES
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/", userRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "/",
  });
});

app.all("*", (req, res) => {
  res.status(404).json({
    message: "error",
    error: "the path youre trying to access doesnt exist.",
  });
});

module.exports = app;
