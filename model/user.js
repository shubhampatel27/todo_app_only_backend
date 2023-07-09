import mongoose from "mongoose";

const user = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: "__v" }
);

export const User = mongoose.model("User", user);
