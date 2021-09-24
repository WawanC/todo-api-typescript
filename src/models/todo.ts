import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
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

export default mongoose.model("Todo", todoSchema);
