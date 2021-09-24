import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { createError } from "../utils/errorCreator";

interface Token {
  userId: string;
}

const isAuth: RequestHandler = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    const error = createError("No Auth Token Provided", 500);
    return next(error);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret") as Token;
  } catch (error) {
    return next(error);
  }
  if (!decodedToken) {
    const error = createError("Auth Token not valid.", 500);
    return next(error);
  }

  req.userId = decodedToken.userId;
  next();
};

export default isAuth;
