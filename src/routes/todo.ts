import { Router } from "express";

import * as todoController from "../controllers/todo";

const router = Router();

router.get("/todos", todoController.getTodos);

export default router;
