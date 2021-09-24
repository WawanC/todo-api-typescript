import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const errorData = err.data || null;
  return res.status(status).json({
    error: err.message,
    data: errorData,
  });
};

export default errorHandler;
