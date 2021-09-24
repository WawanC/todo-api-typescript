import mongoose from "mongoose";

interface User {
  username: string;
  password: string;
  email: string;
  todos: string[];
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    },
  ],
});

export default mongoose.model<User>("User", userSchema);
