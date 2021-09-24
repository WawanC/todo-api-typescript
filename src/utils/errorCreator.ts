import { NextFunction } from "express";
import { ValidationError } from "express-validator";

interface AsyncError {
  message: string | null;
  statusCode: number | null;
  data: Array<ValidationError> | null;
}

export const createError = (
  message: string | null,
  statusCode: number | null,
  data: Array<ValidationError> | null
): AsyncError => {
  const error = {
    message: message,
    statusCode: statusCode,
    data: data,
  };

  return error;
};

export const createAsyncError = (err: any, next: NextFunction) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  return next(err);
};
