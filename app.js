const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AppError = require("./utils/AppError");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");

const errorController = require("./controllers/errorController");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

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

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/password", passwordRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `The path '${req.originalUrl}' does not exist on this server.`,
      404
    )
  );
});

app.use(errorController);

module.exports = app;
