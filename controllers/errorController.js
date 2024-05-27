module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(400).json({
      status: "fail",
      message: `${field} must be unique`,
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};
