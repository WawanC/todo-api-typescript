import { Router } from "express";
import { body, param } from "express-validator";
import mongoose from "mongoose";

import * as todoController from "../controllers/todo";

const router = Router();

router.get("/todos", todoController.getTodos);
router.post(
  "/todo",
  [
    body("text")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Todo text cannot be empty!"),
  ],
  todoController.createTodo
);
router.delete(
  "/todo/:todoId",
  [
    param("todoId")
      .trim()
      .isLength({
        min: 12,
      })
      .withMessage("Todo ID is invalid."),
  ],
  todoController.deleteTodo
);

export default router;
