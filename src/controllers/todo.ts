import { RequestHandler } from "express";

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({
    id: new Date().toISOString(),
    text: "First Todo",
  });
};
