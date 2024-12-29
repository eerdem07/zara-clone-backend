const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");

const errorController = require("./controllers/errorController");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authController = require("./controllers/authController");

app.use(
  rateLimit({
    windowMs: 15 * 10 * 1000,
    limit: 200,
  })
);

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
app.use("/", (req, res, next) => {
  next();
});

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
