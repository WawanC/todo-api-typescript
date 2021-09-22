import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

import corsHandler from "./utils/cors";
import todoRoutes from "./routes/todo";

const app = express();

app.use(express.json());
app.use(corsHandler);
app.use(todoRoutes);

const runApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to DB");
    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
};

runApp();
