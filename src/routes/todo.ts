import { Router } from "express";

import * as todoController from "../controllers/todo";

const router = Router();

router.get("/todos", todoController.getTodos);
router.post("/todo", todoController.createTodo);

export default router;
