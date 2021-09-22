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
    default: false,
  },
});

export default mongoose.model("Todo", todoSchema);
