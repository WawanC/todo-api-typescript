import mongoose from "mongoose";

interface Todo {
  text: string;
  isDone: boolean;
  createdBy: string;
}

const todoSchema = new mongoose.Schema<Todo>({
  text: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: String,
  },
});

export default mongoose.model<Todo>("Todo", todoSchema);
