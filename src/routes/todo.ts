import { Router } from "express";
import { body, param } from "express-validator";

import isAuth from "../middlewares/is-auth";
import * as todoController from "../controllers/todo";

const router = Router();

router.get("/todos", isAuth, todoController.getTodos);
router.post(
  "/todo",
  isAuth,
  [
    body("text")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Todo text cannot be empty!"),
  ],
  todoController.createTodo
);
router.put(
  "/todo/:todoId",
  isAuth,
  [
    param("todoId")
      .trim()
      .isLength({
        min: 12,
      })
      .withMessage("Todo ID is invalid."),
    body().custom((input, { req }) => {
      if (req.body.text == null && req.body.isDone == null) {
        console.log(req.body.text);
        console.log(req.body.isDone);
        return Promise.reject("No Updated Data provided.");
      }
      return true;
    }),
  ],
  todoController.updateTodo
);
router.delete(
  "/todo/:todoId",
  isAuth,
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
