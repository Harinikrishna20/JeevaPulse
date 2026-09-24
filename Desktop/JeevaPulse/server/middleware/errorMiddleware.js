const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  let message = err.message || "Something went wrong";

  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (err.code === 11000) {
    message = `Duplicate value entered for ${Object.keys(err.keyValue)[0]}`;
  }

  if (err.name === "CastError") {
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.name === "JsonWebTokenError") {
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    message = "Token expired";
  }

  if (statusCode === 401) {
    message = "Unauthorized access";
  }

  if (statusCode === 403) {
    message = "Forbidden";
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: {},
  });
};

module.exports = {
  notFound,
  errorHandler,
};
