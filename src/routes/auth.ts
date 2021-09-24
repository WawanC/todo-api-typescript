import { Router } from "express";
import { body } from "express-validator";

import User from "../models/user";
import * as authController from "../controllers/auth";

const router = Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter valid email")
      .custom(async (input, meta) => {
        const user = await User.findOne({ email: input });
        if (user) {
          return Promise.reject("E-mail already in use!");
        }
        return true;
      })
      .normalizeEmail(),
    body("username")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Username must be minimal 5 characters long!")
      .custom(async (input, meta) => {
        const user = await User.findOne({ username: input });
        if (user) {
          return Promise.reject("Username already in use!");
        }
        return true;
      }),
    body("password").trim().isLength({ min: 6 }),
  ],
  authController.signup
);
router.post("/login", authController.login);

export default router;
