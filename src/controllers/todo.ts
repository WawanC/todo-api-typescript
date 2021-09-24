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

export const updateTodo: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = createError("Validation Failed", 500, errors.array());
    return next(error);
  }

  const body = req.body as {
    text: string;
    isDone: boolean;
  };
  const params = req.params as {
    todoId: string;
  };

  try {
    const todo = await Todo.findById(params.todoId);
    if (!todo) {
      const error = createError("Todo Not Found", 404);
      return next(error);
    }

    if (body.text) {
      todo.text = body.text;
    }
    if (body.isDone) {
      todo.isDone = body.isDone;
    }

    const result = await todo.save();
    res.status(200).json({
      message: "UPDATE TODO SUCCESS",
      result: result,
    });
  } catch (error) {
    createAsyncError(error, next);
  }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = createError("Validation Failed", 500, errors.array());
    return next(error);
  }

  const params = req.params as {
    todoId: string;
  };

  try {
    const todo = await Todo.findById(params.todoId);
    if (!todo) {
      const error = createError("Todo Not Found", 404);
      return next(error);
    }
    const result = await Todo.findByIdAndDelete(params.todoId);
    res.status(200).json({
      message: "DELETE TODO SUCCESS",
      result: result,
    });
  } catch (error) {
    createAsyncError(error, next);
  }
};
