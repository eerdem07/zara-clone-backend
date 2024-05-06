const express = require("express");
const app = express();
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");

const errorController = require("./controllers/errorController");

app.use(express.json());
app.use(morgan("dev"));

// ROUTES
app.use("/api/v1/", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/order", orderRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "error",
    error: "the path you're trying to access doesnt exist.",
  });
});

app.use(errorController);

module.exports = app;
