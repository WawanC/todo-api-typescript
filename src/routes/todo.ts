import { Router } from "express";
import { body } from "express-validator";

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

export default router;
