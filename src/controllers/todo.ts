import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import Todo from "../models/todo";
import { createError, createAsyncError } from "../utils/errorCreator";

export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      message: "FETCH TODOS SUCCESS",
      todos: todos,
    });
  } catch (error) {
    createAsyncError(error, next);
  }
};

export const createTodo: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = createError("Validation Failed", 500, errors.array());
    return next(error);
  }

  const body = req.body as { text: string };

  const newTodo = new Todo({
    text: body.text,
    createdBy: "Test User",
  });

  try {
    const result = await newTodo.save();
    res.status(200).json({
      message: "CREATE TODO SUCCESS",
      todo: result,
    });
  } catch (error) {
    createAsyncError(error, next);
  }
};
