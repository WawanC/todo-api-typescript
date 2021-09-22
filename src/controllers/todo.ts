import { RequestHandler } from "express";

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({
    id: new Date().toISOString(),
    text: "First Todo",
  });
};

export const createTodo: RequestHandler = (req, res, next) => {
  const body = req.body as { text: string };

  res.status(200).json({
    id: new Date().toISOString(),
    text: body.text,
  });
};
