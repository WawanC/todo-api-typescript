import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { createError, createAsyncError } from "../utils/errorCreator";

export const signup: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = createError("Validation Failed", 500, errors.array());
    return next(error);
  }

  const body = req.body as {
    username: string;
    password: string;
    email: string;
  };

  try {
    const hashedPw = await bcrypt.hash(body.password, 12);
    const newUser = new User({
      username: body.username,
      password: hashedPw,
      email: body.email,
    });
    const result = await newUser.save();
    res.status(200).json({
      message: "SIGN UP SUCCESS",
      result: {
        id: result._id,
      },
    });
  } catch (error) {
    createAsyncError(error, next);
  }
};
